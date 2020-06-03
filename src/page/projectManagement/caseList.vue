<template>
  <div class="classificationList">
    <caseListDialog
      v-if="updateCaseListDialog.show"
      :isShow="updateCaseListDialog.show"
      :dialogRow="updateCaseListDialog.dialogRow"
      @getCaseList="getDataList"
      @closeDialog="hideUpdateCaseListDialog"
    ></caseListDialog>

    <el-button
      type="primary"
      size="large"
      class="add-case"
      @click="lookCaseListStatus(dialogTitle = '添加案例列表')"
    >添加案例</el-button>

    <select-system @selectSystem="selectSystem($event)"></select-system>
    <selectCaseType :caseList="caseList" @selectCaseType="selectCaseType($event)"></selectCaseType>
    <search @searchUserList="searchUserList($event)" ref="search"></search>

    <div class="table_container">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" align="center">
        <el-table-column align="center" label="启停" width="60">
          <template slot-scope="scope">
            <el-switch
              disabled
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
            <span style="margin-left: 10px">{{ Date.format(scope.row.update_time) }}</span>
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
import { caseList } from "@/api/projectManagement";
import { getCaseType } from "@/api/caseType";

export default {
  data() {
    return {
      tableData: [],
      ruleForm: {
        type_name: "",
        update_time: "",
        type: "",
        enable: true,
        suffix: "",
        directory: "",
        url: ""
      },
      tableHeight: 0,
      loading: true,
      idFlag: false,
      isShow: false,
      updateCaseListDialog: {
        show: false,
        dialogRow: {}
      },
      caseList: [],
      paginationForm: {
        opr: "list",
        pid: "pc",
        pageNum: 1,
        pageSize: 20,
        type: "app",
        searchName: ""
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
      dialogTitle: ""
    };
  },
  components: {
    caseListDialog,
    selectSystem,
    selectCaseType
  },
  computed: {},
  created() {},
  mounted() {
    this.getDataList();
    this.getCaseTypeList();
    this.setTableHeight();
    this.loading = false;
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
      const form = this.paginationForm;
      caseList(form).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
          this.pageTotal = res.count;
        }
      });
    },
    getCaseTypeList(pid) {
      const caseForm = {
        pid: pid ? pid : 'pc',
        pageNum: 1,
        pageSize: 20
      };
      getCaseType(caseForm).then(res => {
        if (res.code === 0) {
          this.caseList = res.data;
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
      console.log(val, "switch");
    },
    // 选择系统类型(pc/sm)
    selectSystem(val) {
      this.paginationForm.pid = val;
      // delete this.paginationForm.type;
      // delete this.paginationForm.searchName;
      this.getDataList();
      this.getCaseTypeList(val)
    },
    // 选择案例类型
    selectCaseType(val) {
      this.paginationForm.type = val;
      this.getDataList();
      this.loading = false;
      this.copyData = deepCopy(this.tableData);
    },
    // 获取搜索值
    searchUserList(searchVal) {
      console.log(searchVal, "我是搜索");
      this.paginationForm.searchName = searchVal;
      this.getDataList();
      setTimeout(() => {
        this.$refs.search.searchVal = "";
        this.paginationForm.searchName = "";
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.classificationList {
  padding: 20px;

  .table_container {
    padding: 10px;
    background: #fff;
    border-radius: 2px;
  }
  .add-case {
    margin-bottom: 15px;
  }

  .active {
    border-radius: 3px;
    margin: 5px;
    color: #fff;
    background-color: rgb(102, 177, 255);
  }
}
</style>


