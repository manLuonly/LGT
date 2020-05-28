<template>
  <div class="select-case-type inline-block">
    <span class="system-type-text">案例类型</span>
    <el-select v-model="caseType" size="large" placeholder="请选择分类" @change="changeType">
      <el-option
        v-for="item in caseTypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    {{ getList }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { caseType } from "@/api/projectManagement";

export default {
  name: "selectCaseType",

  data() {
    return {
      caseType: "",
      caseTypeOptions: []
    };
  },
  computed: {
    ...mapGetters(["systemType"]),
    getList() {
        this.systemType && this.getCaseList();
    }
  },
  mounted() {
    this.getCaseList();
  },
  methods: {
    getCaseList() {
        if (this.systemType == "0") {
          caseType().then(res => {
            if (res.code === 0) {
              this.caseTypeOptions = res.data;
            }
          });
          console.log("pc");
        } else {
          console.log("小程序");
        }
    },
    // changeType() {
    //   this.$emit("selectCaseType", this.caseType);
    // }
  }
};
</script>

<style lang='less' scoped>
.select-case-type {
  .system-type-text {
    margin-right: 10px;
  }
}
</style>