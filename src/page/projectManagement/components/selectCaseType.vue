<template>
  <div class="select-case-type inline-block">
    <span class="system-type-text">案例类型</span>
    <el-select v-model="caseType" size="large" placeholder="请选择分类" @change="changeType">
      <el-option
        v-for="item in caseTypeOptions"
        :key="item.id"
        :label="item.type_name"
        :value="item.type"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getCaseType } from "@/api/caseType";

export default {
  name: "selectCaseType",

  data() {
    return {
      caseType: "app",
      caseTypeOptions: [],
      paginationForm: {
        pid: "pc",
        pageNum: 1,
        pageSize: 20
      }
    };
  },
  props: {
    caseList: Array
  },
  computed: {
    ...mapGetters(["systemType"])

  },
  watch: {
    // 父组件获取数据,通过props传递属于异步,子组件只能通过watch监听数据
    caseList: function() {
      console.log(this.caseList,'this.caseList');
      
      this.caseType = this.caseList[0].type_name;
      
      this.caseTypeOptions = this.caseList;
    }
  },
  methods: {
    changeType() {
      this.$emit("selectCaseType", this.caseType);
    }
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