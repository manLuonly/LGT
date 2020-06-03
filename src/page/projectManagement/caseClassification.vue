<template>
  <div class="case-classification">
    <caseClassificationDialog
      v-if="updateCaseDialog.show"
      :isShow="updateCaseDialog.show"
      :dialogRow="updateCaseDialog.dialogRow"
      @getCaseList="getDataList"
      @closeDialog="hideCaseDialog"
    ></caseClassificationDialog>

    <el-button
      type="primary"
      size="large"
      class="addCase"
      @click="lookCaseStatus(dialogTitle = '添加案例分类')"
    >添加案例分类</el-button>

    <select-system @selectSystem="selectSystem($event)"></select-system>

    <div class="table_container">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        height="720"
        align="center"
      >
        <el-table-column align="center" label="启停" width="60">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeSwitch(scope.row)"
              disabled
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.type_name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="jumpAddress" label="跳转地址" align="center">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.jumpAddress" :disabled="true"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center" sortable>
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ Date.format(scope.row.update_time)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              icon="edit"
              size="mini"
              @click="lookCaseStatus(scope.row,dialogTitle = '编辑案例分类');"
            >编辑</el-button>
            <el-button type="danger" icon="delete" size="mini" @click="deleteCase(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <pagination
        :pageTotal="pageTotal"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination> -->
    </div>
  </div>
</template>

<script>
import selectSystem from "@/components/selectSystem";
import caseClassificationDialog from "./Dialog/caseClassificationDialog";
import Pagination from "@/components/pagination";
import { getCaseType, del } from "@/api/caseType";

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
      isShow: false,
      sortnum: 0,
      updateCaseDialog: {
        show: false,
        dialogRow: {}
      },
      paginationForm: {
        opr: "list",
        pid: "pc",
        pageNum: 1,
        pageSize: 20
      },
      pageTotal: 2,
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      dialogTitle: ""
    };
  },
  components: {
    caseClassificationDialog,
    selectSystem,
    Pagination
  },
  computed: {},
  mounted() {
    this.getDataList();
    this.loading = false;
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
      getCaseType(form).then(res => {
        this.tableData = res.data || [];
      });
    },
    // 显示案例分类dialog
    showCseDialog() {
      this.updateCaseDialog.show = true;
    },
    // 隐藏案例分类dialog
    hideCaseDialog() {
      this.updateCaseDialog.show = false;
    },
    // 上下分页
    handleCurrentChange(val) {
      this.paginationForm.page = val;
      this.getDataList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.paginationForm.limit = val;
      this.getDataList();
    },
    // 编辑操作方法
    lookCaseStatus(row) {
      if (this.dialogTitle == "添加案例分类") {
        this.ruleForm.title = "添加案例分类";
        this.updateCaseDialog.dialogRow = { ...this.ruleForm };
      } else {
        row.title = "编辑案例分类";
        this.updateCaseDialog.dialogRow = { ...row };
      }
      this.showCseDialog();
    },
    // 删除数据
    deleteCase(row) {
      this.alertMsgBox("此操作将删除该数据,是否继续?")
        .then(() => {
          row.opr = "delete";
          getCaseType(row).then(res => {
              if (res.success === true) {
                  this.message(res.msg);
                  this.getDataList();
              } else {
                  this.message(res.msg);
              }
            })
        })
        .catch(err => {
          this.message("已取消", "info");
        });
    },
    // 改变 Switch状态
    changeSwitch(val) {},
    // 选择系统类型
    selectSystem(type) {
      this.paginationForm.pid = type;
      this.getDataList();
    }
  }
};
</script>

<style lang="less" scoped>
.case-classification {
  padding: 20px;
  .table_container {
    padding: 10px;
    background: #fff;
    border-radius: 2px;
  }

  .addCase {
    margin-bottom: 15px;
  }
}
</style>


