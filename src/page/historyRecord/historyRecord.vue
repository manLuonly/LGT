<template>
  <div class="historyRecord">
    <select-system @selectSystem="selectSystem($event)"></select-system>

    <page-type-cps @selectPage="selectPage($event)"></page-type-cps>

    <search @searchUserList="searchUserList($event)" ref="search"></search>

    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" align="center" v-show="pageType == 'userInfo' ">
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="mailbox" label="邮箱/微信" align="center"></el-table-column>
        <el-table-column prop="vip" label="vip" align="center"></el-table-column>
        <el-table-column prop="leavingMessage" label="留言" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              width="200"
              trigger="hover"
              :content="scope.row.leavingMessage"
            >
              <span slot="reference">{{ scope.row.leavingMessage }}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作">
          <template slot-scope="scope">
            <el-button icon="edit" size="mini" @click="restoreRecording(scope.row)">恢复</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="mini"
              @click="deleteRecording(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="tableData" style="width: 100%" v-show="pageType == 'orderDetails' ">
        <el-table-column prop="userName" label="客户姓名" align="center"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="serviceProject" label="服务项目" align="center"></el-table-column>
        <el-table-column prop="startDate" label="开始时间" align="center"></el-table-column>
        <el-table-column prop="endDate" label="结束时间" align="center"></el-table-column>
        <el-table-column prop="orderStatus" label="状态" align="center"></el-table-column>
        <el-table-column prop="money" label="交易金额" align="center"></el-table-column>
        <el-table-column prop="operation" align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button icon="edit" size="mini" @click="restoreRecording(scope.row)">恢复</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="mini"
              @click="deleteRecording(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :pageTotal="pageTotal"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageTypeCps from "./components/pageType";

export default {
  name: "historyRecord",

  data() {
    return {
      tableData: [],
      pageTotal: 1,
      paginationForm: {
        opr: "list",
        pid: "pc",
        pageNum: 1,
        pageSize: 20,
        searchName: ""
      },
      pageType: "userInfo"
    };
  },
  components: {
    pageTypeCps
  },
  computed: {
    ...mapGetters(["systemType"]),
  },
  mounted() {
    //   this.getDataList();

  },
  methods: {
    // 获取数据
    getDataList() {
      // 请求客户信息列表
      if (this.systemType == "userInfo") {
        console.log("userInfo");
      } else {
        // 请求订单详情列表
        console.log("order");
      }
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
      console.log(row, "row");
      this.alertMsgBox("此操作将恢复该数据,是否继续?")
        .then(() => {
          this.message("恢复成功");
        })
        .catch(err => {
          this.message("已取消", "info");
        });
    },
    // 删除历史记录
    deleteRecording(row) {
      console.log(row, "row");
      this.alertMsgBox("此操作将永久删除该数据,是否继续?")
        .then(() => {
          this.message("删除成功");
        })
        .catch(err => {
          this.message("已取消", "info");
        });
    },
    // 选择系统类型(pc/sm)
    selectSystem(val) {
      this.paginationForm.pid = val;
      this.getDataList();
    },
    // 选择页面类型
    selectPage(val) {
      console.log(val,'val');
      this.pageType = val;
      this.getDataList();
    },
    // 获取搜索值
    searchUserList(searchVal) {
      console.log(searchVal, "我是搜索");
      this.paginationForm.searchName = searchVal;
      this.getDataList();
      setTimeout(() => {
        this.$refs.search.searchVal = "";
        this.paginationForm.searchName = "";
      }, 1000);
    }
  }
};
</script>

<style lang='less' scoped>
.table_container {
  padding: 10px;
  background: #fff;
  border-radius: 2px;
}

.historyRecord {
  padding: 20px;
  .system-type {
    margin-bottom: 15px;
    .system-type-text {
      margin-right: 10px;
    }
  }
}
</style>