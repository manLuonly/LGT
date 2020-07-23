<template>
  <div class="userDetails">
    <el-table
      v-loading="loading"
      :data="table"
      :height="tableHeight"
      :default-sort="{prop: 'begin_time', order: 'descending'}"
      style="width: 100%"
      align="center"
    >
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="tel" label="微信号" align="center"></el-table-column>
      <el-table-column
        prop="leave_message"
        label="备注"
        align="center"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="begin_time" sortable label="更新日期" align="center">
        <template slot-scope="scope">
          <span>{{ Date.format(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作">
        <template slot-scope="scope">
          <el-button icon="edit" size="mini" @click="lookCaseListStatus(scope.row)">编辑</el-button>
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
export default {
  name: "userDetails",

  data() {
    return {
      loading: true,
      table: [],
      tableHeight: 0,
      pageTotal: 0,
    };
  },

  methods: {
    getDataList() {},
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
    lookCaseListStatus() {},
    deleteUser() {},
  },
};
</script>

<style lang='scss' scoped>
</style>