<template>
  <div class="case-classification">
    <caseClassificationDialog
      v-if="updateCaseDialog.show"
      :isShow="updateCaseDialog.show"
      :dialogRow="updateCaseDialog.dialogRow"
      @getCaseList="getCaseList"
      @closeDialog="hideCaseDialog"
    ></caseClassificationDialog>

    <div class="system-type">
      <span class="system-type-text">系统类型</span>
      <el-select v-model="systemType" placeholder="请选择分类">
        <el-option
          v-for="item in systemTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <el-button type="primary" class="addCase" @click="lookCaseStatus(dialogTitle = '添加案例分类')">添加案例分类</el-button>

    <div class="table_container">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" align="center">
        <el-table-column align="center" label="启停" width="60">
          <template slot-scope="scope">
            <el-switch
              :disabled="true"
              v-model="startStop"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.caseSortNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.caseName }}</el-tag>
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
            <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
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
      <pagination
        :pageTotal="pageTotal"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination>
    </div>
  </div>
</template>

<script>
import caseClassificationDialog from "./Dialog/caseClassificationDialog";
import Pagination from "@/components/pagination";

export default {
  data() {
    return {
      tableData: [
        {
          caseSortNum: 0,
          caseName: "logo设计",
          jumpAddress: "www.baidu.com",
          updateTime: "2016-05-02"
        }
      ],
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
        page: 1,
        limit: 20,
        name: ""
      },
      pageTotal: 2,
      startStop: true,
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      dialogTitle: "",
      systemType: "0",
      systemTypeOptions: [
        {
          value: "0",
          label: "pc端"
        },
        {
          value: "1",
          label: "小程序"
        }
      ]
    };
  },
  components: {
    caseClassificationDialog,
    Pagination
  },
  computed: {},
  mounted() {
    // this.getDataList();
    this.loading = false;
  },
  methods: {
    setTableHeight() {
      this.$nextTick(() => {
        this.tableHeight = document.body.clientHeight - 300;
      });
    },
    // 获取列表数据
    getDataList() {},

    // 获取案例分类列表
    getCaseList() {},
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

  .system-type {
    margin-bottom: 30px;
    .system-type-text {
      margin-right: 20px;
    }
  }
  .addCase {
    height: 40px;
    margin-bottom: 15px;
  }

  .pagination {
    text-align: left;
    margin-top: 10px;
  }
}
</style>


