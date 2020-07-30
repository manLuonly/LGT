<template>
  <div class="table_container">
    <el-table
      v-loading.lock="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="table"
      :height="Number(tableHeight)"
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
      <el-table-column prop="source" label="来源" align="center"></el-table-column>
      <el-table-column prop="begin_time" sortable label="更新日期" align="center">
        <template slot-scope="scope">
          <span>{{ Date.format(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button icon="edit" size="mini" @click="restoreRecording(scope.row)">恢复</el-button>
          <el-button type="danger" icon="delete" size="mini" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :pageTotal="pageTotal"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>
  </div>
</template>

<script>
import { listPage, restore, deleteReservations } from "@/api/userInfo";
export default {
  name: "uploadFile",

  data() {
    return {
      loading: true,
      table: [],
      tableHeight: "",
      paginationForm: {
        pageNum: 1,
        pageSize: 20,
        source: "mini",
        search_name: "",
        start_time: "",
        end_time: "",
        delete_status: 1,
      },
      pageTotal: 1,
    };
  },

  mounted() {
    this.getDataList();
    this.setTableHeight();
  },
  methods: {
    setTableHeight() {
      this.$nextTick(() => {
        this.tableHeight = document.body.clientHeight - 250;
      });
    },
    getDataList() {
      let form = this.paginationForm;
      listPage(form)
        .then((res) => {
          this.table = res.data || [];
          this.pageTotal = res.count;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 上下分页
    handleCurrentChange(val) {
      this.paginationForm.pageNum = val;
      this.getDataList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.paginationForm.pageSize = val;
      this.getDataList();
    },
    // 恢复历史记录
    restoreRecording(row) {
      let id = row.id;
      this.alertMsgBox("此操作将恢复该数据,是否继续?")
        .then(() => {
          restore(id).then((res) => {
            this.message(res.msg);
            this.getDataList();
          });
        })
        .catch((err) => {
          this.message("已取消", "info");
        });
    },
    // 删除数据
    deleteUser(row) {
      let id = row.id;
      this.alertMsgBox("删除后无法恢复,是否继续?")
        .then(() => {
          deleteReservations(id).then((res) => {
            this.message(res.msg);
            this.getDataList();
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