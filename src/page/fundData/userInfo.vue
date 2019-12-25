<template>
  <div class="fillcontain">
    <el-table :data="tableData" height="450" border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="联系电话" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="邮箱/微信" width="180" align="center"></el-table-column>
      <el-table-column prop="date" label="公司名称" width="180" align="center"></el-table-column>
      <el-table-column prop="address" label="留言" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            :content="scope.row.address"
          >
            <span slot="reference">{{ scope.row.address }}</span>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :pageTotal="tableData.length"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>
  </div>
</template>

<script>
import echarts from "echarts";
import Pagination from "@/components/pagination";

export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      pageFormInfo: {
        page: 1,
        limit: 50
      },
      pageTotal: 0
    };
  },
  components: {
    Pagination
  },
  methods: {
    setTableHeight() {
      this.$nextTick(() => {
        this.tableHeight = document.body.clientHeight - 300;
      });
    },
    // 获取列表数据
    getDataList() {},
    // 上下分页
    handleCurrentChange(val) {
      this.pageFormInfo.page = val;
      this.getDataList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.pageFormInfo.limit = val;
      this.getDataList();
    }
  }
};
</script>

<style lang="less" scoped>
#typePosition,
#typePosition2 {
  position: relative;
  width: 96%;
  height: 530px;
  padding: 10px;
  border-radius: 10px;
}
.pagination {
  text-align: left;
  margin-top: 10px;
}
</style>


