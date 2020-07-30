<template>
  <div class="table_container">
    <el-table
      v-loading.lock="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="table"
      :height="Number(tableHeight) "
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
      <el-table-column label="分类名称" align="center">
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
      <el-table-column prop="operation" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button icon="edit" size="mini" @click="restoreRecording(scope.row)">恢复</el-button>
          <el-button type="danger" icon="delete" size="mini" @click="deleteCase(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listAll, restorePc, deleteType } from "@/api/caseType";
export default {
  name: "uploadFile",

  data() {
    return {
      loading: true,
      table: [],
      tableHeight: "",
      paginationForm: {
        system_type: "pc",
        delete_status: 1,
      },
      pageTotal: 0,
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
      listAll(form)
        .then((res) => {
          this.table = res.data || [];
          this.pageTotal = res.count;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 恢复历史记录
    restoreRecording(row) {
      let id = row.id;
      this.alertMsgBox("此操作将恢复该数据,是否继续?")
        .then(() => {
          restorePc(id).then((res) => {
            this.message(res.msg);
            this.getDataList();
          });
        })
        .catch((err) => {
          this.message("已取消", "info");
        });
    },
    // 删除数据
    deleteCase(row) {
      let id = row.id;
      this.alertMsgBox("删除后无法恢复,是否继续?")
        .then(() => {
          deleteType(id).then((res) => {
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