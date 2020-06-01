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
      pageType: "userInfo",
      pageTypeOptions: [
        {
          value: "userInfo",
          label: "客户信息"
        },
        {
          value: "orderDetails",
          label: "订单详情"
        }
      ]
    };
  },

  methods: {
    changePageType() {
      this.$emit("selectPage", this.pageType);
    }
  }
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