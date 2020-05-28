<template>
  <div class="system-type inline-block">
    <span class="system-type-text">系统类型</span>
    <el-select v-model="systemType" size="large" placeholder="请选择分类" @change="changeType">
      <el-option
        v-for="item in systemTypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "selectSystem",

  data() {
    return {
      systemType: "0",
      systemTypeOptions: [
        {
          value: "0",
          label: "pc端"
        },
        {
          value: "1",
          label: "小程序"
        }
      ]
    };
  },
  mounted() {
    this.$store.commit("SET_SYSTEMTYPE", 0);
  },
  methods: {
    changeType() {
      this.$store.commit("SET_SYSTEMTYPE", this.systemType);
      this.$emit('selectSystem',this.systemType)
    }
  }
};
</script>

<style lang='less' scoped>
.system-type {
  margin: 0 50px;
  .system-type-text {
    margin-right: 10px;
  }
}
</style>