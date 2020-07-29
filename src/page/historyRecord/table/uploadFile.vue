<template>
  <div class="table_container">
    <el-table
      :data="table"
      :height="tableHeight"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :default-sort="{prop: 'create_time', order: 'descending'}"
      style="width: 100%"
      align="center"
    >
      <el-table-column prop="id" label="id" align="center" width="100"></el-table-column>
      <el-table-column prop="name" label="文件名" align="center"></el-table-column>
      <el-table-column prop="url" label="文件链接" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="文件类型" align="center" :formatter="fileType" width="100"></el-table-column>
      <el-table-column prop="file_size" label="文件大小" align="center" width="100"></el-table-column>
      <el-table-column prop="file_type" label="文件格式" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.file_type.toUpperCase() }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" sortable label="更新日期" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ Date.format(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button icon="edit" size="mini" @click="restoreRecording(scope.row)">恢复</el-button>
          <el-button type="danger" icon="delete" size="mini" @click="deleteCase(scope.row)">删除</el-button>
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
import { historyRecord } from "@/api/historyRecord";
export default {
  name: "uploadFile",

  data() {
    return {
      loading: true,
      table: [],
      tableHeight: "",
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
      historyRecord({})
        .then((res) => {
          this.table = res.data || [];
          this.pageTotal = res.count || 1; // 总条数
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
      row.opr = "restore";
      row.filterType = this.pageType == "userInfo" ? 0 : 1;
      this.alertMsgBox("此操作将恢复该数据,是否继续?")
        .then(() => {
          historyRecord(row).then((res) => {
            this.message(res.msg);
            if (res.success) {
              this.getDataList();
            }
          });
        })
        .catch((err) => {
          this.message("已取消", "info");
        });
    },
    //
    deleteCase() {},
  },
};
</script>

<style lang='scss' scoped>
</style>