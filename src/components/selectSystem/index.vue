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
      systemType: "pc",
      systemTypeOptions: [
        {
          value: "pc",
          label: "pc端"
        },
        {
          value: "sm",
          label: "小程序"
        }
      ]
    };
  },
  mounted() {
    this.$store.commit("SET_SYSTEMTYPE", 'pc');
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
  margin: 0 20px;
  .system-type-text {
    margin-right: 10px;
  }
}
</style>