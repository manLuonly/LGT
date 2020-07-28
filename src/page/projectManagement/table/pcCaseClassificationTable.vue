<template>
  <div class="table_container">
    <el-table
      v-loading.lock="table.loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="table.table"
      :height="table.tableHeight"
      :default-sort="{prop: 'update_time', order: 'descending'}"
      style="width: 100%"
      align="center"
    >
      <el-table-column align="center" label="启停" width="60">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            disabled
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.type_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="分类名称" align="center" >
        <template slot-scope="scope">
          <el-tag>{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="list_total_num" label="案例总条数" align="center"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" align="center" sortable>
        <template slot-scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ Date.format(scope.row.update_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作">
        <template slot-scope="scope">
          <el-button icon="edit" size="mini" @click="lookCaseStatus(scope.row);">编辑</el-button>
          <el-button type="danger" icon="delete" size="mini" @click="deleteCase(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    {{ watchTable }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteType } from "@/api/caseType";

export default {
  data() {
    return {};
  },
  props: {
    table: Object,
    default: () => {},
  },
  computed: {
    ...mapGetters(["systemType"]),
    watchTable() {
      if (this.table.table.length > 0) {
        this.$emit("changeLoading", false);
      }
    }
  },
  mounted() {},
  methods: {
    // 编辑操作方法
    lookCaseStatus(row) {
      this.$emit("showCaseDialog", row);
      this.$store.commit("SET_ADDOREDIT", "edit");
    },
    // 删除数据
    deleteCase(row) {
      let id = row.id;
      this.alertMsgBox()
        .then(() => {
          deleteType(id).then((res) => {
              this.message(res.msg);
              this.$emit("getCaseList");
          });
        })
        .catch((err) => {
          this.message("已取消", "info");
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
