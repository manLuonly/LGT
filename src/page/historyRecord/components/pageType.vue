<template>
  <div class="page-type inline-block">
    <span class="page-type-text">页面类型</span>
    <el-select v-model="pageType" size="large" placeholder="请选择分类" @change="changePageType">
      <el-option
        v-for="item in pageTypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "pageType",

  data() {
    return {
      pageType: "caseClassification",
      pageTypeOptions: [
        {
          value: "caseClassification",
          label: "案例分类",
        },
        {
          value: "caseList",
          label: "案例列表",
        },
        {
          value: "reservation",
          label: "预约管理",
        },
        {
          value: "orderDetails",
          label: "订单录入",
        },
        {
          value: "userDetails",
          label: "客户录入",
        },
        // {
        //   value: "uploadFile",
        //   label: "上传文件",
        // },
      ],
    };
  },

  methods: {
    changePageType() {
      this.$emit("selectPage", this.pageType);
    },
  },
};
</script>

<style lang='less' scoped>
.page-type {
  margin: 0 20px;
  .page-type-text {
    margin-right: 10px;
  }
}
</style>