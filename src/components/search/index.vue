<template>
  <div class="search right inline-block">
    <el-input
      class="search-input inline-block"
      :placeholder="customizePlaceholder"
      size="large"
      v-model="searchVal"
      clearable
      @clear="searchUserList"
      @keyup.native="btKeyUp"
    ></el-input>
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
      searchVal: "", // 搜索值
    };
  },
  props: {
    customizePlaceholder: {
      default: "请输入姓名/电话",
    },
  },
  mounted() {},
  methods: {
    searchUserList() {
      this.$emit("searchUserList", this.searchVal);
    },
    btKeyUp(e) {
      e.target.value = e.target.value.replace(
        /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
        ""
      );
    },
  },
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