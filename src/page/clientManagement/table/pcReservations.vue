<template>
  <div class="table_container">
    <el-table
      v-loading.lock="table.loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="table.data.data"
      :height="table.tableHeight"
      :default-sort="{prop: 'begin_time', order: 'descending'}"
      style="width: 100%"
      align="center"
    >
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="service_type" label="服务类型" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.service_type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="leave_message"
        label="留言"
        align="center"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="source" label="来源" align="center" width="100"></el-table-column>
      <el-table-column prop="begin_time" sortable label="更新日期" align="center">
        <template slot-scope="scope">
          <span>{{ Date.format(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" icon="delete" size="mini" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :pageTotal="table.data.count"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>
    {{ watchTable }}
  </div>
</template>

<script>
import { deleteReservations } from "@/api/userInfo";

export default {
  name: "pcReservations",

  data() {
    return {};
  },
  props: {
    table: Object,
    default: () => {},
  },
  computed: {
    watchTable() {
      if (this.table.data.count > 0) {
        this.$emit("changeLoading", false);
      }
    },
  },
  methods: {
    // 上下分页
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    deleteUser(row) {
      let id = row.id;
      this.alertMsgBox()
        .then(() => {
          deleteReservations(id).then((res) => {
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

<style lang='scss' scoped>
</style>