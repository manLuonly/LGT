<template>
  <div class="filter-vip inline-block">
    <span class="filter-type-text">是否会员</span>
    <el-select v-model="isVip" size="large" placeholder="请选择" @change="changeType">
      <el-option
        v-for="item in vipOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "filterVip",

  data() {
    return {
      isVip: -1,
      vipOptions: [
        {
          value: -1,
          label: "全部",
        },
        {
          value: 1,
          label: "是",
        },
        {
          value: 0,
          label: "否",
        },
      ],
    };
  },
  methods: {
    changeType(value) {
      this.$emit("selectIsVip", value);
    },
  },
};
</script>

<style lang='less' scoped>
.filter-vip {
  margin: 0 20px;
  .filter-type-text {
    margin-right: 10px;
  }
}
</style>