<template>
  <div class="fillcontain">
    <!-- <search-item
      @showDialog="showAddFundDialog"
      @searchList="getMoneyList"
      @onBatchDelMoney="onBatchDelMoney"
    ></search-item>-->
    <el-dialog title="提示" :visible.sync="addCaseDialog" :before-close="handleClose">
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          :label-width="dialog.formLabelWidth"
          style="margin:10px;width:auto;"
        >
          <el-form-item label="启停:">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>

          <el-form-item prop="classificationName" label="分类名称:">
            <el-input type="text" v-model="form.classificationName"></el-input>
          </el-form-item>

          <el-form-item prop="jumpAddress" label="跳转地址:">
            <el-input v-model="form.jumpAddress"></el-input>
          </el-form-item>

          <el-form-item prop="updateTime" label="更新时间:">
            <el-input v-model="form.updateTime"></el-input>
          </el-form-item>

          <el-form-item prop="accoutCash" label="缩略图:">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item prop="remarks" label="图文:">
            <el-input type="textarea" v-model="form.remarks"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button type="primary" @click='onSubmit("form")'>提 交</el-button>
            <el-button @click="addCaseDialog = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-button type="primary" class="addCase" @click="addCase">添加案例分类</el-button>
    <div class="table_container">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        align="center"
      >
        <el-table-column v-if="idFlag" prop="id" label="id" align="center" width="180"></el-table-column>
        <el-table-column align="center" label="启停" width="60">
          <template slot-scope="scope">
            <el-switch
              :disabled="true"
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ table_index(scope.$index) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="idFlag" prop="address" label="分类名称" align="center"></el-table-column>
        <el-table-column prop="address" label="跳转地址" align="center">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.address" :disabled="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="更新时间" align="center" sortable width="170">
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button icon="edit" size="mini" @click="onEditMoney(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="mini"
              @click="onDeleteMoney(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :pageTotal="pageTotal"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination>
      <addFundDialog
        v-if="addFundDialog.show"
        :isShow="addFundDialog.show"
        :dialogRow="addFundDialog.dialogRow"
        @getFundList="getMoneyList"
        @closeDialog="hideAddFundDialog"
      ></addFundDialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as mutils from "@/utils/mUtils";
// import SearchItem from "./components/searchItem";
import AddFundDialog from "./components/addFundDialog";
import Pagination from "@/components/pagination";
import { getMoneyIncomePay, removeMoney, batchremoveMoney } from "@/api/money";

export default {
  data() {
    return {
      tableData: [
        {
          createTime: "2016-05-02",
          type: "logo设计",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          createTime: "2016-05-02",
          type: "APP设计",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      form: {
        classificationName: "",
        jumpAddress: "",
        updateTime: "",
        remarks: ""
      },
      tableHeight: 0,
      loading: true,
      idFlag: false,
      isShow: false, // 是否显示资金modal,默认为false
      editid: "",
      rowIds: [],
      sortnum: 0,
      format_type_list: {
        0: "提现",
        1: "提现手续费",
        2: "提现锁定",
        3: "理财服务退出",
        4: "购买宜定盈",
        5: "充值",
        6: "优惠券",
        7: "充值礼券",
        8: "转账"
      },
      addFundDialog: {
        show: false,
        dialogRow: {}
      },
      incomePayData: {
        page: 1,
        limit: 20,
        name: ""
      },
      pageTotal: 2,
      value: true,
      addCaseDialog: false,
      form_rules: {
        classificationName: [
          { required: true, message: "分类名称不能为空", trigger: "blur" }
        ],
        jumpAddress: [
          { required: true, message: "跳转地址不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        remarks: [{ required: true, message: "备注不能为空", trigger: "blur" }]
      },
      imageUrl: "",
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      }
    };
  },
  components: {
    // SearchItem,
    AddFundDialog,
    Pagination
  },
  computed: {
    ...mapGetters(["search"])
  },
  mounted() {
    // this.getMoneyList();
    this.loading = false;
  },
  methods: {
    setAddress(value) {},
    setTableHeight() {
      this.$nextTick(() => {
        this.tableHeight = document.body.clientHeight - 300;
      });
    },
    // 获取资金列表数据
    getMoneyList() {
      // const para = Object.assign({}, this.incomePayData, this.search);
      // getMoneyIncomePay(para).then(res => {
      //   this.loading = false;
      //   this.pageTotal = res.data.total;
      //   this.tableData = res.data.moneyList;
      // });
    },
    // 显示资金弹框
    showAddFundDialog(val) {
      this.$store.commit("SET_DIALOG_TITLE", val);
      this.addFundDialog.show = true;
    },
    hideAddFundDialog() {
      this.addFundDialog.show = false;
    },
    // 上下分页
    handleCurrentChange(val) {
      this.incomePayData.page = val;
      this.getMoneyList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.incomePayData.limit = val;
      this.getMoneyList();
    },
    // 编辑操作方法
    onEditMoney(row) {
      this.addFundDialog.dialogRow = { ...row };
      this.showAddFundDialog();
    },
    // 删除数据
    onDeleteMoney(row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          const para = { id: row.id };
          removeMoney(para).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getMoneyList();
          });
        })
        .catch(() => {});
    },
    // 添加序号
    table_index(index) {
      return (
        (this.incomePayData.page - 1) * this.incomePayData.limit + index + 1
      );
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 改变 Switch状态
    changeSwitch(val) {
      console.log(val);
    },
    // 添加案例
    addCase() {
      this.addCaseDialog = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit(form) {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    }
  }
};
</script>

<style lang="less" scoped>
.table_container {
  padding: 10px;
  background: #fff;
  border-radius: 2px;
}
.el-dialog--small {
  width: 600px !important;
}
.pagination {
  text-align: left;
  margin-top: 10px;
}
.addCase {
  height: 40px;
  margin-bottom: 15px;
}
</style>


