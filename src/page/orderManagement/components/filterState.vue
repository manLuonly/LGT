<template>
  <div class="filter-vip inline-block">
    <span class="filter-type-text">状态</span>
    <el-select v-model="state" size="large" placeholder="请选择" @change="changeType">
      <el-option
        v-for="item in stateOptions"
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
      state: -1,
      stateOptions: [
        {
          value: -1,
          label: "全部",
        },
        {
          value: 0,
          label: "已完成",
        },
        {
          value: 1,
          label: "进行中",
        },
        {
          value: 2,
          label: "已取消",
        },
      ],
    };
  },
  methods: {
    changeType(value) {
      this.$emit("selectState", value);
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