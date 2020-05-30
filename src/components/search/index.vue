<template>
  <div class="search right inline-block">
    <el-input class="search-input inline-block" placeholder="请输入名称" size="large" v-model="searchVal" clearable></el-input>
    <div class="search-button inline-block">
      <el-button icon="el-icon-search" size="large" @click="searchUserList"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",

  data() {
    return {
      searchVal: "" // 搜索值
    };
  },

  methods: {
    searchUserList() {
      this.$emit("searchUserList", this.searchVal);
    }
  }
};
</script>

<style lang='less' scoped>
.search {
  .search-input {
    width: 217px;
  }
  .search-button {
    margin-left: -1px;
  }
}
</style>