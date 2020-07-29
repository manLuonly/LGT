<template>
  <div class="historyRecord">
    <page-type-cps @selectPage="selectPage($event)"></page-type-cps>

    <select-system v-show="pageType == 'reservation'" @selectSystem="selectSystem($event)"></select-system>

    <search @searchUserList="searchUserList($event)" ref="search"></search>

    <div class="table_container">
      <order-details v-if="pageType == 'orderDetails' "></order-details>
      <user-details v-if="pageType == 'userDetails' "></user-details>
      <upload-file v-if="pageType == 'uploadFile' "></upload-file>
    </div>
  </div>
</template>

<script>
import pageTypeCps from "./components/pageType";
import { historyRecord } from "@/api/historyRecord";
import orderDetails from "./table/orderDetails";
import userDetails from "./table/userDetails";
import uploadFile from "./table/uploadFile";

export default {
  name: "historyRecord",

  data() {
    return {
      tableData: [],
      tableHeight: 0,
      pageTotal: 0,
      paginationForm: {
        opr: "list",
        pid: "pc",
        pageNum: 1,
        pageSize: 20,
        searchName: "",
      },
      pageType: "userDetails",
    };
  },
  components: {
    pageTypeCps,
    orderDetails,
    userDetails,
    uploadFile,
  },
  computed: {},
  mounted() {},
  methods: {
    // 选择系统类型(pc/sm)
    selectSystem(val) {
      this.paginationForm.pageNum = 1;
      this.paginationForm.pid = val;
      this.getDataList();
    },
    // 选择页面类型
    selectPage(val) {
      this.pageType = val;
      this.getDataList();
    },
    // 获取搜索值
    searchUserList(searchVal) {
      this.paginationForm.pageNum = 1;
      this.paginationForm.searchName = searchVal;
      this.getDataList();
    },
  },
};
</script>

<style lang='less' scoped>
.table_container {
  margin-top: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 2px;
}

.historyRecord {
  padding: 20px;
  .system-type {
    margin-bottom: 15px;
    .system-type-text {
      margin-right: 10px;
    }
  }

  // 进行中
  .processing {
    color: blue;
    font-weight: bold;
  }
  // 已完成
  .completed {
    color: green;
    font-weight: bold;
  }
  // 未完成
  .undone {
    color: red;
    font-weight: bold;
  }
}
</style>