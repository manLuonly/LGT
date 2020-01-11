<template>
  <div class="classificationList">
    <el-dialog title="添加案例" :visible.sync="addCaseDialog" @close="resetForm('form')" width="30%" center>
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          :label-width="dialog.formLabelWidth"
          style="margin:10px;width:auto;"
        >
          <el-form-item prop="username" label="启停">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>

          <el-form-item label="排序">
            <el-input-number
              v-model="form.caseSortNum"
              @change="handleCaseSortNumChange"
              :min="0"
              :max="99999"
              label="描述文字"
            ></el-input-number>
          </el-form-item>

          <el-form-item prop="classificationName" label="上级分类">
            <el-select v-model="form.classificationName" placeholder="请选择分类级别">
              <el-option
                v-for="item in caseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="jumpAddress" label="上级分类">
            <span
              v-for="(item,index) in ClassificationStatusItems"
              :key="index"
              @click="getClassificationStatus(index)"
              :class="{active:index===staticNumber}"
            >{{ item.name }}</span>
            <el-input v-model="form.jumpAddress" :disabled="isCanSelectAddress"></el-input>
          </el-form-item>

          <el-form-item prop="caseName" label="案例名称">
            <el-input v-model="form.caseName"></el-input>
          </el-form-item>

          <el-form-item prop="accoutCash" label="缩略图">
            <el-upload
              class="avatar-uploader"
              action="/caseupload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :auto-upload="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item prop="remarks" label="图文">
            <editor-bar v-model="form.remarks" :isClear="isClear"></editor-bar>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click='submitForm("form")'>确 定</el-button>
      </span>
    </el-dialog>
    <div>
      <div class="button-group">
        <el-button type="primary" class="addCase" @click="addCaseDialog = true">添加案例</el-button>
        <el-button @click="getList()">LOGO设置</el-button>
        <el-button @click="getList()">小程序开发</el-button>
        <el-button @click="getList()">APP开发</el-button>
        <el-button @click="getList()">包装设计</el-button>
        <el-button @click="getList()">画册设计</el-button>
        <el-button @click="getList()">网站开发</el-button>
        <el-button @click="getList()">品牌VI设计</el-button>
        <div class="search">
          <el-input class="search-input" placeholder="请输入名称" v-model="searchVal" clearable></el-input>
          <div class="search-button">
            <el-button icon="el-icon-search" size="medium"></el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="table_container">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" align="center">
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
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column v-if="idFlag" prop="address" label="分类名称" align="center"></el-table-column>
        <el-table-column label="跳转地址" align="center">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.jump_url" :disabled="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="更新时间" align="center" sortable width="170">
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
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
      <caseListDialog
        v-if="addFundDialog.show"
        :isShow="addFundDialog.show"
        :dialogRow="addFundDialog.dialogRow"
        @getFundList="getDataList"
        @closeDialog="hideAddFundDialog"
      ></caseListDialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deepCopy } from "@/utils/mUtils";
import editorBar from "./components/wangEditor";
import caseListDialog from "./components/caseListDialog";
import Pagination from "@/components/pagination";
import { getMoneyIncomePay, removeMoney, batchremoveMoney } from "@/api/money";
import { caseList } from "@/api/projectManagement";

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
          type: "画册设计",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          createTime: "2016-05-02",
          type: "海报设计",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          createTime: "2016-05-02",
          type: "网页设计",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          createTime: "2016-05-02",
          type: "APP设计",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          createTime: "2016-05-02",
          type: "小程序",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      form: {
        caseSortNum: 0,
        classificationName: "",
        jumpAddress: "www.baidu.com",
        caseName: "",
        remarks: ""
      },
      tableHeight: 0,
      loading: true,
      idFlag: false,
      isShow: false, // 是否显示资金modal,默认为false
      editid: "",
      rowIds: [],
      sortnum: 0,
      addFundDialog: {
        show: false,
        dialogRow: {}
      },
      PaginationData: {
        pageNum: 1,
        pageSize: 20,
        type: ""
      },
      pageTotal: 7,
      value: true,
      searchVal: "", // 搜索值
      addCaseDialog: false,
      form_rules: {
        classificationName: [
          { required: true, message: "分类名称不能为空", trigger: "blur" }
        ],
        jumpAddress: [
          { required: true, message: "跳转地址不能为空", trigger: "blur" }
        ],
        caseName: [
          { required: true, message: "案例名称不能为空", trigger: "blur" }
        ],
        remarks: [{ required: true, message: "图文不能为空", trigger: "blur" }]
      },
      imageUrl: "",
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      copyData: [],
      isClear: false,
      caseOptions: [
        {
          value: "LOGO设计",
          label: "LOGO设计"
        },
        {
          value: "小程序开发",
          label: "小程序开发"
        },
        {
          value: "APP开发",
          label: "APP开发"
        },
        {
          value: "包装设计",
          label: "包装设计"
        },
        {
          value: "画册设计",
          label: "画册设计"
        },
        {
          value: "网站开发",
          label: "网站开发"
        },
        {
          value: "品牌VI设计",
          label: "网站开发"
        }
      ],
      staticNumber: 0,
      ClassificationStatusItems: [
        {
          name: "默认"
        },
        {
          name: "自定义"
        }
      ],
      isCanSelectAddress: true
    };
  },
  components: {
    caseListDialog,
    Pagination,
    editorBar
  },
  computed: {
    ...mapGetters(["search"])
  },
  mounted() {
    // this.getDataList();
    this.loading = false;
    this.copyData = deepCopy(this.tableData);
  },
  methods: {
    setAddress(value) {},
    setTableHeight() {
      this.$nextTick(() => {
        this.tableHeight = document.body.clientHeight - 300;
      });
    },
    // 获取列表数据
    getDataList() {
      this.PaginationData.type = "all";
      const para = Object.assign({}, this.PaginationData);
      caseList(para).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
        }
      });
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
      this.getDataList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.incomePayData.limit = val;
      this.getDataList();
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
            this.getDataList();
          });
        })
        .catch(() => {});
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
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 筛选案例列表数据
    getList(val) {},
    // 案例排序
    handleCaseSortNumChange(val) {
      console.log("案例排序发生了变化" + val);
    },
    // 地址是否自定义
    getClassificationStatus(index) {
      this.staticNumber = index;
      if (index === 1) {
        this.isCanSelectAddress = false;
      } else {
        this.isCanSelectAddress = true;
      }
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

.classificationList {
  padding: 20px;
  .form {
    /deep/ .el-textarea {
      height: 200px;
    }
  }
  .button-group {
    /deep/ .el-button {
      height: 40px;
      margin-bottom: 15px;
    }
    .search {
      float: right;
      .search-input {
        display: inline-block;
        width: 217px;
        height: 40px;
        line-height: 40px;
        /deep/ .el-input__inner {
          height: 40px !important;
          line-height: 40px !important;
        }
      }
      .search-button {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        margin-left: -1px;
      }
    }
  }
  .active {
    border-radius: 3px;
    margin: 5px;
    color: #fff;
    background-color: rgb(102, 177, 255);
  }
}



.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


