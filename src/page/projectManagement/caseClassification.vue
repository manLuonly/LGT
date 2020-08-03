<template>
  <div class="case-classification">
    <!-- pc-dialog -->
    <pc-case-classification-dialog
      v-if="updateCaseDialog.pcShow"
      :isShow="updateCaseDialog.pcShow"
      :dialogRow="updateCaseDialog.dialogRow"
      @getCaseList="getDataList"
      @closeDialog="hideCaseDialog"
    ></pc-case-classification-dialog>

    <!-- 小程序dialog -->
    <sm-case-classification-dialog
      v-if="updateCaseDialog.smShow"
      :isShow="updateCaseDialog.smShow"
      :dialogRow="updateCaseDialog.dialogRow"
      @getCaseList="getDataList"
      @closeDialog="hideCaseDialog"
    ></sm-case-classification-dialog>

    <el-button
      type="primary"
      size="large"
      class="addCase"
      @click="showCaseDialog();setEmptyForm()"
    >添加案例分类</el-button>

    <select-system @selectSystem="selectSystem($event)"></select-system>

    <!-- pc表格 -->
    <pc-case-classification-table
      v-show="systemType == 'pc'"
      :table="caseTable"
      @changeLoading="changeLoading"
      @showCaseDialog="showCaseDialog"
      @getCaseList="getDataList"
    ></pc-case-classification-table>

    <!-- 小程序表格 -->
    <sm-case-classification-table
      v-show="systemType == 'mini'"
      :table="caseTable"
      @changeLoading="changeLoading"
      @showCaseDialog="showCaseDialog"
      @getCaseList="getDataList"
    ></sm-case-classification-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import selectSystem from "@/components/selectSystem";
import pcCaseClassificationDialog from "./Dialog/pcCaseClassificationDialog";
import pcCaseClassificationTable from "./table/pcCaseClassificationTable";
import smCaseClassificationDialog from "./Dialog/smCaseClassificationDialog";
import smCaseClassificationTable from "./table/smCaseClassificationTable";
import Pagination from "@/components/pagination";
import { listAll } from "@/api/caseType";

export default {
  data() {
    return {
      isShow: false,
      updateCaseDialog: {
        pcShow: false,
        smShow: false,
        dialogRow: {},
      },
      caseTable: {
        loading: true,
        table: [],
        tableHeight: 0,
      },
      paginationForm: {
        system_type: "pc",
        delete_status: 0,
      },
      pageTotal: 0,
      dialog: {
        width: "400px",
        formLabelWidth: "120px",
      },
    };
  },
  components: {
    pcCaseClassificationDialog,
    pcCaseClassificationTable,
    smCaseClassificationDialog,
    smCaseClassificationTable,
    selectSystem,
    Pagination,
  },
  computed: {
    ...mapGetters(["systemType"]),
  },
  mounted() {
    this.getDataList();
    this.setTableHeight();
  },
  methods: {
    setTableHeight() {
      this.$nextTick(() => {
        this.caseTable.tableHeight = document.body.clientHeight - 250;
      });
    },
    // 获取列表数据
    getDataList() {
      const form = this.paginationForm;
      this.changeLoading(true);
      listAll(form)
        .then((res) => {
          res.data.filter((i) => {
            i.icon_img = getStore("ip") + i.icon_img;
            i.cover_img = getStore("ip") + i.cover_img;
          });
          this.caseTable.table = res.data || [];
        })
        .finally(() => {
          this.changeLoading(false);
        });
    },
    // 显示案例分类dialog
    showCaseDialog(row) {
      this.updateCaseDialog.dialogRow = { ...row };
      if (this.systemType == "pc") {
        this.updateCaseDialog.pcShow = true;
      } else {
        this.updateCaseDialog.smShow = true;
      }
    },
    // 隐藏案例分类dialog
    hideCaseDialog() {
      if (this.systemType == "pc") {
        this.updateCaseDialog.pcShow = false;
      } else {
        this.updateCaseDialog.smShow = false;
      }
    },
    // 选择系统类型
    selectSystem(type) {
      this.paginationForm.pageNum = 1;
      this.paginationForm.system_type = type;
      this.getDataList();
    },
    // 改变loadding状态
    changeLoading(loading) {
      this.caseTable.loading = loading;
    },
    // 设置状态,清空表单
    setEmptyForm() {
      this.$store.commit("SET_ADDOREDIT", "add");
    },
  },
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


