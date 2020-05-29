<template>
  <div class="classificationList">
    <caseListDialog
      v-if="updateCaseListDialog.show"
      :isShow="updateCaseListDialog.show"
      :dialogRow="updateCaseListDialog.dialogRow"
      @getFundList="getDataList"
      @closeDialog="hideUpdateCaseListDialog"
    ></caseListDialog>

    <div>
      <div class="button-group">
        <el-button
          type="primary"
          size="large"
          class="addCase"
          @click="lookCaseListStatus(dialogTitle = '添加案例列表')"
        >添加案例</el-button>
        <!-- <el-button
          v-for="(item) in buttonGroup"
          :key="item.type_name"
          @click="getList(item.type)"
        >{{ item.type_name }}</el-button>-->

        <select-system></select-system>
        <selectCaseType @selectCaseType="selectCaseType($event)"></selectCaseType>

        <div class="search">
          <el-input
            class="search-input"
            size="large"
            placeholder="请输入名称"
            v-model="searchVal"
            clearable
          ></el-input>
          <div class="search-button">
            <el-button icon="el-icon-search" size="large" @click="searchCaseList"></el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="table_container">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" align="center">
        <el-table-column align="center" label="启停" width="60">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center" width="80" prop="id"></el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type_name" label="名称" align="center"></el-table-column>
        <el-table-column v-if="idFlag" prop="address" label="分类名称" align="center"></el-table-column>
        <el-table-column label="跳转地址" align="center">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.jumpAddress" :disabled="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center" sortable width="170">
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ Date.$format(scope.row.update_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              icon="edit"
              size="mini"
              @click="lookCaseListStatus(scope.row,dialogTitle = '编辑案例列表')"
            >编辑</el-button>
            <el-button type="danger" icon="delete" size="mini" @click="deleteCaeList(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :pageTotal="pageTotal"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination>
    </div>
  </div>
</template>

<script>
import { deepCopy } from "@/utils/mUtils";
import caseListDialog from "./Dialog/caseListDialog";
import selectSystem from "@/components/selectSystem";
import selectCaseType from "./components/selectCaseType";
import Pagination from "@/components/pagination";
import { caseList } from "@/api/projectManagement";

export default {
  data() {
    return {
      tableData: [],
      ruleForm: {
        caseSortNum: 0,
        caseName: "",
        jumpAddress: "www.baidu.com",
        updateTime: "2016-05-02"
      },
      tableHeight: 0,
      loading: true,
      idFlag: false,
      isShow: false,
      updateCaseListDialog: {
        show: false,
        dialogRow: {}
      },
      paginationForm: {
        opr: 'list',
        pid: 'pc',
        pageNum: 1,
        pageSize: 20,
        type: ''
      },
      pageTotal: 7,
      startStop: true,
      searchVal: "", // 搜索值
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      copyData: [],
      isCanSelectAddress: true,
      // buttonGroup: [],
      dialogTitle: ""
    };
  },
  components: {
    caseListDialog,
    selectSystem,
    selectCaseType,
    Pagination
  },
  computed: {},
  mounted() {
    //this.getDataList();
    //this.loading = false;
    //this.copyData = deepCopy(this.tableData);
  },
  methods: {
    setTableHeight() {
      this.$nextTick(() => {
        this.tableHeight = document.body.clientHeight - 300;
      });
    },
    // 获取列表数据
    getDataList() {
      const para = Object.assign({}, this.paginationForm);
      caseList(para).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
        }
      });
    },
    // 上下分页
    handleCurrentChange(val) {
      this.paginationForm.pageNum = val;
      this.getDataList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.paginationForm.pageSize = val;
      this.getDataList();
    },
    // 显示案例列表弹框
    showUpdateCaseListDialog() {
      this.updateCaseListDialog.show = true;
    },
    hideUpdateCaseListDialog() {
      this.updateCaseListDialog.show = false;
    },
    // 编辑操作方法
    lookCaseListStatus(row) {
      if (this.dialogTitle == "添加案例列表") {
        this.ruleForm.title = "添加案例列表";
        this.updateCaseListDialog.dialogRow = { ...this.ruleForm };
      } else {
        row.title = "修改案例列表";
        this.updateCaseListDialog.dialogRow = { ...row };
      }
      this.showUpdateCaseListDialog();
    },

    // 删除数据
    deleteCaeList(row) {
      this.alertMsgBox()
        .then(() => {
          this.message("删除案例成功");
        })
        .catch(err => {
          this.message("已取消", "info");
        });
    },
    // 改变 Switch状态
    changeSwitch(val) {
      console.log(val);
    },
    // 筛选案例列表数据
    getList(val) {
      let form = { pageNum: 1, pageSize: 20, type: val, name: "" };
      caseList(form).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
        }
      });
    },
    // 搜索案例列表数据
    searchCaseList() {
      let form = { pageNum: 1, pageSize: 20, type: "", name: this.searchVal };
      caseList(form).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
        }
      });
    },
    selectCaseType (val) {
      this.paginationForm.type = val;
      this.getDataList();
      this.loading = false;
      this.copyData = deepCopy(this.tableData);
    }
    // selectSystem (val) {
     
    // }
  }
};
</script>

<style lang="less" scoped>
.classificationList {
  padding: 20px;
  // .form {
  //   /deep/ .el-textarea {
  //     height: 200px;
  //   }
  // }

  .table_container {
    padding: 10px;
    background: #fff;
    border-radius: 2px;
  }

  .button-group {
    /deep/ .el-button {
      margin-bottom: 15px;
    }
    .search {
      float: right;
      .search-input {
        display: inline-block;
        width: 217px;
      }
      .search-button {
        display: inline-block;
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
</style>


