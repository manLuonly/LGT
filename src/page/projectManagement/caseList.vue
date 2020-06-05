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
      @click="lookCaseListStatus(dialogTitle = '添加案例列表')"
    >添加案例</el-button>

    <select-system @selectSystem="selectSystem($event)"></select-system>
    <select-case-type :caseList="caseList" @selectCaseType="selectCaseType($event)"></select-case-type>
    <search @searchUserList="searchUserList($event)" ref="search"></search>

    <div class="table_container">
      <el-table
        v-loading="loading"
        :data="tableData"
        :height="tableHeight"
        :default-sort="{prop: 'update_time', order: 'descending'}"
        style="width: 100%"
        align="center"
      >
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
        <!-- <el-table-column label="跳转地址" align="center">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.jumpAddress" :disabled="true"></el-input>
          </template>
        </el-table-column>-->
        <el-table-column prop="update_time" sortable label="更新时间" align="center" width="170">
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
import { mapGetters } from "vuex";
import pcCaseListDialog from "./Dialog/pcCaseListDialog";
import smCaseListDialog from "./Dialog/smCaseListDialog";
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
        pcShow: false,
        smShow: false,
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
      pageTotal: 0,
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
    pcCaseListDialog,
    smCaseListDialog,
    selectSystem,
    selectCaseType
  },
  computed: {
    ...mapGetters(["systemType"])
  },
  created() {},
  mounted() {
    this.getCaseTypeList();
    this.setTableHeight();
    this.loading = false;
    setTimeout(() => {
      this.getDataList();
    }, 500);
  },
  methods: {
    setTableHeight() {
      this.$nextTick(() => {
        this.tableHeight = document.body.clientHeight - 250;
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
        pid: pid ? pid : "pc",
        pageNum: 1,
        pageSize: 20
      };
      getCaseType(caseForm).then(res => {
        if (res.code === 0) {
          this.paginationForm.type = res.data[0].type;
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
    // 编辑操作方法
    lookCaseListStatus(row) {
      if (this.dialogTitle == "添加案例列表") {
        if (this.systemType == "pc") {
          this.ruleForm.title = "添加网站案例";
        } else {
          this.ruleForm.title = "添加小程序案例";
        }
        this.updateCaseListDialog.dialogRow = { ...this.ruleForm };
      } else {
        row.title = "修改案例列表";
        this.updateCaseListDialog.dialogRow = { ...row };
      }
      this.showUpdateCaseListDialog();
    },
    // 删除数据
    deleteCaeList(row) {
      const form = this.paginationForm;
      this.paginationForm.id = row.id;
      this.paginationForm.opr = "delete";

      this.alertMsgBox()
        .then(() => {
          caseList(form).then(res => {
            this.message("删除案例成功");
            this.paginationForm.opr = "list";
            this.getDataList();
          });
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
      this.getCaseTypeList(val);
      setTimeout(() => {
        this.getDataList();
      }, 500);
    },
    // 选择案例类型
    selectCaseType(val) {
      this.paginationForm.type = val;
      this.getDataList();
      this.loading = false;
    },
    // 获取搜索值
    searchUserList(searchVal) {
      console.log(searchVal, "我是搜索");
      this.paginationForm.searchName = searchVal;
      this.getDataList();
      // setTimeout(() => {
      //   this.$refs.search.searchVal = "";
      //   this.paginationForm.searchName = "";
      // }, 1000);
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


