<template>
  <div class="classificationList">
    <el-dialog title="提示" :visible.sync="addCaseDialog" :before-close="handleClose">
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          :label-width="dialog.formLabelWidth"
          style="margin:10px;width:auto;"
        >
          <el-form-item prop="username" label="启停:">
            <el-switch v-model="value"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>

          <el-form-item prop="classificationName" label="分类名称:">
            <el-input type="text" v-model="form.classificationName"></el-input>
          </el-form-item>

          <el-form-item prop="jumpAddress" label="跳转地址:">
            <el-input v-model="form.jumpAddress"></el-input>
          </el-form-item>

          <el-form-item prop="caseName" label="案例名称:">
            <el-input v-model="form.caseName"></el-input>
          </el-form-item>

          <el-form-item prop="accoutCash" label="缩略图:">
            <el-upload
              class="avatar-uploader"
              action="/caseupload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :auto-upload='false'
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item prop="remarks" label="图文:">
            <!-- <el-input type="textarea" v-model="form.remarks"></el-input> -->
            <editor-bar v-model="form.remarks" :isClear="isClear"></editor-bar>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button type="primary" @click='onSubmit("form")'>提 交</el-button>
            <el-button @click="addCaseDialog = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <div>
      <div class="button-group">
        <el-button type="primary" class="addCase" @click="addCaseDialog = true">添加案例</el-button>
        <div class="search">
          <el-input class="search-input" placeholder="请输入名称" v-model="searchVal" clearable></el-input>
          <div class="search-button">
            <el-button icon="el-icon-search" size="medium"></el-button>
          </div>
        </div>
      </div>
      <div class="tag">
        <el-tag
          class="tagCase"
          size="medium"
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleCloseServiceProject(tag)"
          @click="getType(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ New Tag</el-button>
      </div>
    </div>
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
            <!-- <span>{{ table_index(scope.$index) }}</span> -->
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
        <el-table-column  label="跳转地址" align="center">
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
      <!-- <addFundDialog
        v-if="addFundDialog.show"
        :isShow="addFundDialog.show"
        :dialogRow="addFundDialog.dialogRow"
        @getFundList="getDataList"
        @closeDialog="hideAddFundDialog"
      ></addFundDialog> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deepCopy } from "@/utils/mUtils";
import editorBar from "./components/wangEditor";
// import AddFundDialog from "./components/addFundDialog";
import Pagination from "@/components/pagination";
import { getMoneyIncomePay, removeMoney, batchremoveMoney } from "@/api/money";
import { caseList } from "@/api/projectManagement";



export default {
  data() {
    return {
      tableData: [
        // {
        //   createTime: "2016-05-02",
        //   type: "logo设计",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   createTime: "2016-05-02",
        //   type: "画册设计",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   createTime: "2016-05-02",
        //   type: "海报设计",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   createTime: "2016-05-02",
        //   type: "网页设计",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   createTime: "2016-05-02",
        //   type: "APP设计",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
        // {
        //   createTime: "2016-05-02",
        //   type: "小程序",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // }
      ],
      dynamicTags: [
        "全部",
        "logo设计",
        "画册设计",
        "海报设计",
        "网页设计",
        "APP设计",
        "小程序"
      ],
      inputVisible: false,
      inputValue: "",
      form: {
        classificationName: "",
        jumpAddress: "",
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
        type: "",
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
        remarks: [{ required: true, message: "备注不能为空", trigger: "blur" }]
      },
      imageUrl: "",
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      copyData: [],
       isClear: false
    };
  },
  components: {
    // AddFundDialog,
    Pagination,
    editorBar
  },
  computed: {
    ...mapGetters(["search"])
  },
  mounted() {
    this.getDataList();
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
      this.PaginationData.type = 'all';
      const para = Object.assign({}, this.PaginationData);
      caseList(para).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
        }
      })
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
    // 添加序号
    table_index(index) {
      return (
        (this.PaginationData.pageNum - 1) * this.PaginationData.pageSize + index + 1
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
    // 获取数据类型
    getType(val) {
      const filterData = [];
      this.copyData.filter(item => {
        if (val == "全部") {
          this.tableData = this.copyData;
        } else {
          if (item.type == val) {
            filterData.push(item);
            this.tableData = filterData;
          }
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleCloseServiceProject(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    onSubmit(form) {
      console.log(form,'form')
    },
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

.classificationList {
  padding: 20px;
  .form {
    /deep/ .el-textarea {
      height: 200px;
    }
  } 
  .button-group {
    // display: inline-block;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    .addCase {
      height: 40px;
      margin-bottom: 15px;
    }
    .search {
      // display: inline-block;
      // float: right;
      .search-input {
        display: inline-block;
        width: 217px;
        height: 40px;
        line-height: 40px;
        /deep/ .el-input__inner {
          height: 36px !important;
          line-height: 36px !important;
        }
      }
      .search-button {
        display: inline-block;
        height: 40px;
        line-height: 40px;
      }
    }
  }
.tag {
  padding-bottom: 15px;
    .tagCase {
      cursor: pointer;
    }
  }
}



.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}


.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
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


