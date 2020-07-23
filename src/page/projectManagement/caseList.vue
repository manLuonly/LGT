<template>
  <div class="classificationList">
    <pc-case-list-dialog
      v-if="updateCaseListDialog.pcShow"
      :isShow="updateCaseListDialog.pcShow"
      :dialogRow="updateCaseListDialog.dialogRow"
      @getCaseList="getDataList"
      @closeDialog="hideUpdateCaseListDialog"
    ></pc-case-list-dialog>

    <sm-case-list-dialog
      v-if="updateCaseListDialog.smShow"
      :isShow="updateCaseListDialog.smShow"
      :dialogRow="updateCaseListDialog.dialogRow"
      @getCaseList="getDataList"
      @closeDialog="hideUpdateCaseListDialog"
    ></sm-case-list-dialog>

    <el-button
      type="primary"
      size="large"
      class="add-case"
      @click="showCaseDialog();setEmptyForm();"
    >添加案例</el-button>

    <select-system @selectSystem="selectSystem($event)"></select-system>
    <select-case-type :caseList="caseList" @selectCaseType="selectCaseType($event)"></select-case-type>
    <search @searchUserList="searchUserList($event)" ref="search"></search>

    <pc-case-list-table
      v-if="systemType == 'pc'"
      :table="caseTable"
      @changeLoading="changeLoading"
      @showCaseDialog="showCaseDialog"
      @getCaseList="getDataList"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pc-case-list-table>

    <smCaseListTable
      v-if="systemType == 'mini'"
      :table="caseTable"
      @changeLoading="changeLoading"
      @showCaseDialog="showCaseDialog"
      @getCaseList="getDataList"
    ></smCaseListTable>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pcCaseListDialog from "./Dialog/pcCaseListDialog";
import pcCaseListTable from "./table/pcCaseListTable";
import smCaseListDialog from "./Dialog/smCaseListDialog";
import smCaseListTable from "./table/smCaseListTable";
import selectSystem from "@/components/selectSystem";
import selectCaseType from "./components/selectCaseType";
import { listPage } from "@/api/projectManagement";
import { listAll } from "@/api/caseType";

export default {
  data() {
    return {
      isShow: false,
      updateCaseListDialog: {
        pcShow: false,
        smShow: false,
        dialogRow: {}
      },
      caseTable: {
        loading: true,
        data: {},
        tableHeight: 0
      },
      caseList: [],
      paginationForm: {
        pageNum: 1,
        pageSize: 20,
        system_type: "pc",
        type: "",
        search_name: ""
      },
      searchVal: "", // 搜索值
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      dialogTitle: ""
    };
  },
  components: {
    pcCaseListDialog,
    pcCaseListTable,
    smCaseListDialog,
    smCaseListTable,
    selectSystem,
    selectCaseType
  },
  computed: {
    ...mapGetters(["systemType", "caseType"])
  },
  mounted() {
    this.getCaseTypeList("pc");
    setTimeout(() => {
      this.getDataList();
    }, 1000);
    this.setTableHeight();
  },
  methods: {
    setTableHeight() {
      this.$nextTick(() => {
        this.caseTable.tableHeight = document.body.clientHeight - 250;
      });
    },
    // 获取案例列表
    getCaseTypeList(val) {
      let type = { system_type: val };
      listAll(type).then(res => {
        this.caseList = res.data;
        this.paginationForm.type = res.data[0].type; // 第一条案例类型,根据类型获取数据
      });
    },
    // 获取列表数据
    getDataList() {
      const form = this.paginationForm;
      listPage(form).then(res => {
        this.caseTable.data = res || {};
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
    // 显示案例分类dialog
    showCaseDialog(row) {
      this.updateCaseListDialog.dialogRow = { ...row };
      if (this.systemType == "pc") {
        this.updateCaseListDialog.pcShow = true;
      } else {
        this.updateCaseListDialog.smShow = true;
      }
    },
    // 隐藏案例列表弹框
    hideUpdateCaseListDialog() {
      if (this.systemType == "pc") {
        this.updateCaseListDialog.pcShow = false;
      } else {
        this.updateCaseListDialog.smShow = false;
      }
    },
    // 选择系统类型(pc/sm)
    selectSystem(val) {
      this.getCaseTypeList(val);
      setTimeout(() => {
        this.selectCaseType(this.caseList[0].type); // 第一条案例类型
      }, 1500);
      this.paginationForm.system_type = this.systemType ; // 修改系统类型
    },
    // 选择案例类型
    selectCaseType(val) {
      this.paginationForm.type = val;
      this.getDataList();
    },
    // 获取搜索值
    searchUserList(searchVal) {
      this.paginationForm.search_name = searchVal;
      this.getDataList();
    },
    // 改变loadding状态
    changeLoading(loading) {
      this.caseTable.loading = loading;
    },
    // 设置状态,清空表单
    setEmptyForm() {
      this.$store.commit("SET_ADDOREDIT", "add");
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


