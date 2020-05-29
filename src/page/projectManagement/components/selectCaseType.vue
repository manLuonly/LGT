<template>
  <div class="select-case-type inline-block">
    <span class="system-type-text">案例类型</span>
    <el-select v-model="caseType" size="large" placeholder="请选择分类"  @change="changeType">
      <el-option
        v-for="item in caseTypeOptions"
        :key="item.id"
        :label="item.type_name"
        :value="item.type"
      ></el-option>
    </el-select>
    {{ getList }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getCaseType } from "@/api/caseType";

export default {
  name: "selectCaseType",

  data() {
    return {
        caseType: "",
        caseTypeOptions: [],
        paginationForm: {
        pid: 'pc',
        pageNum: 1,
        pageSize: 20
      }
    };
  },
  computed: {
    ...mapGetters(["systemType"]),
    getList() {
        this.systemType && this.getCaseList();
    }
  },
  created () {
    this.getCaseList();
  },
  methods: {
    getCaseList() {
      this.paginationForm.pid = this.caseType == "0" ? 'pc' : 'sm';
      const para = Object.assign({}, this.paginationForm);
      getCaseType(para).then(res => {
        if (res.code === 0) {
          this.caseTypeOptions = res.data;
          this.caseType = res.data[0] && res.data[0].type;
          this.changeType();
        }
      });
    },
    changeType () {
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