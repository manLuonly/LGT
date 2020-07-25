<template>
  <div class="user-info">
    <select-system @selectSystem="selectSystem($event)"></select-system>
    <date-picker @changeDate="changeDate($event)" style="margin-bottom:15px"></date-picker>
    <search :customizePlaceholder="customizePlaceholder" @searchUserList="searchUserList($event)"></search>

    <pc-reservations
      v-if="systemType == 'pc'"
      :table="caseTable"
      @changeLoading="changeLoading"
      @getCaseList="getDataList"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pc-reservations>
    <sm-reservations
      v-if="systemType == 'mini'"
      :table="caseTable"
      @changeLoading="changeLoading"
      @getCaseList="getDataList"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></sm-reservations>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pcReservations from "./table/pcReservations";
import smReservations from "./table/smReservations";
import { listPage } from "@/api/userInfo";

export default {
  data() {
    return {
      caseTable: {
        loading: true,
        data: {},
        tableHeight: 0,
      },
      paginationForm: {
        pageNum: 1,
        pageSize: 20,
        source: "pc",
        search_name: "",
        start_time: "",
        end_time: "",
      },
      pageTotal: 1,
      customizePlaceholder: "请输入姓名/电话"
    };
  },
  components: {
    pcReservations,
    smReservations,
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
      listPage(form).then((res) => {
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
    // 选择系统类型(pc/sm)
    selectSystem(val) {
      this.paginationForm.source = val;
      this.getDataList();
    },
    // 改变日期
    changeDate(date) {
      this.paginationForm.start_time = date ? Date.formatDate(date[0]) : "";
      this.paginationForm.end_time = date ? Date.formatDate(date[1]) : "";
      this.getDataList();
    },
    // 搜索客户列表
    searchUserList(searchVal) {
      this.paginationForm.search_name = searchVal;
      this.getDataList();
    },
    // 改变loadding状态
    changeLoading(loading) {
      this.caseTable.loading = loading;
    },
  },
};
</script>

<style lang="less" scoped>
.user-info {
  padding: 20px;
  .table_container {
    padding: 10px;
    background: #fff;
    border-radius: 2px;
  }
}
</style>


