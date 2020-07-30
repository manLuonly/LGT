<template>
  <div class="historyRecord">
    <page-type-cps @selectPage="selectPage($event)"></page-type-cps>

    <select-system v-if="isShow" @selectSystem="selectSystem($event)"></select-system>

    <!--   v-if="isShowSearch" -->
    <!-- <search :customizePlaceholder="customizePlaceholder" @searchUserList="searchUserList($event)"></search> -->

    <div>
      <pc-case-classification
        v-if="pageType == 'caseClassification' && paginationForm.system_type == 'pc'"
      ></pc-case-classification>
      <sm-case-classification
        v-if="pageType == 'caseClassification' && paginationForm.system_type == 'mini'"
      ></sm-case-classification>

      <pc-case-list
        v-if="pageType == 'caseList' && paginationForm.system_type == 'pc'"
        :searchVal="searchVal"
        ref="pcCaseList"
      ></pc-case-list>
      <sm-case-list v-if="pageType == 'caseList' && paginationForm.system_type == 'mini'"></sm-case-list>

      <pc-reservation v-if="pageType == 'reservation' && paginationForm.system_type == 'pc'"></pc-reservation>
      <sm-reservation v-if="pageType == 'reservation' && paginationForm.system_type == 'mini'"></sm-reservation>

      <order-details v-if="pageType == 'orderDetails'"></order-details>
      <user-details v-if="pageType == 'userDetails'"></user-details>
    </div>
  </div>
</template>

<script>
import pageTypeCps from "./components/pageType";
import { historyRecord } from "@/api/historyRecord";
import pcCaseClassification from "./table/caseClassification/pc-caseClassification";
import smCaseClassification from "./table/caseClassification/sm-caseClassification";
import pcCaseList from "./table/caseList/pc-caseList";
import smCaseList from "./table/caseList/sm-caseList";
import pcReservation from "./table/reservation/pc-reservation";
import smReservation from "./table/reservation/sm-reservation";
import orderDetails from "./table/orderDetails";
import userDetails from "./table/userDetails";

export default {
  name: "historyRecord",

  data() {
    return {
      paginationForm: {
        pageNum: 1,
        pageSize: 20,
        system_type: "pc",
        search_name: "",
        delete_status: 1,
      },
      searchVal: "",
      pageType: "caseClassification",
      customizePlaceholder: "随便输点什么吧",
    };
  },
  components: {
    pageTypeCps,
    pcCaseClassification,
    smCaseClassification,
    pcCaseList,
    smCaseList,
    pcReservation,
    smReservation,
    orderDetails,
    userDetails,
  },
  computed: {
    isShow() {
      if (this.pageType == "reservation") {
        // 预约管理
        return true;
      } else if (this.pageType == "caseClassification") {
        // 案例分类
        return true;
      } else if (this.pageType == "caseList") {
        // 案例列表
        return true;
      } else if (this.pageType == "orderDetails") {
        // 订单录入
        return false;
      } else if (this.pageType == "userDetails") {
        // 客户录入
        return false;
      }
    },
    //
    isShowSearch() {
      console.log(
        this.paginationForm.search_name,
        " this.paginationForm.search_name "
      );
      return true;
    },
  },
  mounted() {},
  methods: {
    // 选择系统类型(pc/sm)
    selectSystem(val) {
      this.paginationForm.pageNum = 1;
      this.paginationForm.system_type = val;
    },
    // 选择页面类型
    selectPage(val) {
      this.pageType = val;
      if (val == "reservation") {
        this.customizePlaceholder = "请输入姓名/电话";
      } else if (val == "caseClassification") {
        this.customizePlaceholder = "";
      } else if (val == "caseList") {
        this.customizePlaceholder = "请输入名字";
      } else if (val == "orderDetails") {
        this.customizePlaceholder = "请输入姓名/微信号";
      } else if (val == "userDetails") {
        this.customizePlaceholder = "请输入姓名/电话";
      }
    },
    // 获取搜索值
    searchUserList(searchVal) {
      console.log(this.$refs.pcCaseList.getDataList());
      this.paginationForm.pageNum = 1;
      this.paginationForm.search_name = searchVal;
      this.searchVal = searchVal;
    },
  },
};
</script>

<style lang='less' scoped>
.historyRecord {
  padding: 20px;
  .table_container {
    margin-top: 10px;
    padding: 10px;
    background: #fff;
    border-radius: 2px;
  }
}
</style>