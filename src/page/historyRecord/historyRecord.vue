<template>
  <div class="historyRecord">
    <page-type-cps @selectPage="selectPage($event)"></page-type-cps>

    <select-system v-show="pageType !== 'userInfo'" @selectSystem="selectSystem($event)"></select-system>

    <search @searchUserList="searchUserList($event)" ref="search"></search>

    <div class="table_container">
      <el-table
        :data="tableData"
        :height="tableHeight"
        style="width: 100%"
        align="center"
        v-if="pageType == 'userInfo' "
      >
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="wx" label="邮箱/微信" align="center"></el-table-column>
        <el-table-column prop="vip" label="vip" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.vip ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="leaving" label="留言" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              width="200"
              trigger="hover"
              :content="scope.row.leaving"
            >
              <span slot="reference">{{ scope.row.leaving }}</span>
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

      <el-table :data="tableData" style="width: 100%" v-if="pageType == 'orderDetails' ">
        <el-table-column prop="name" label="客户姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="service" label="服务项目" align="center"></el-table-column>
        <el-table-column prop="begin_time" label="开始时间" align="center"></el-table-column>
        <el-table-column prop="of_time" label="结束时间" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center"></el-table-column>
        <el-table-column prop="money" label="交易金额" align="center">
          <template slot-scope="scope">
            <span>￥{{ scope.row.money}}</span>
          </template>
        </el-table-column>
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
import { historyRecord } from "@/api/historyRecord";

export default {
  name: "historyRecord",

  data() {
    return {
      tableData: [],
      tableHeight: 0,
      pageTotal: 0,
      paginationForm: {
        opr: "list",
        pid: "pc",
        pageNum: 1,
        pageSize: 20,
        searchName: "",
      },
      pageType: "userInfo",
    };
  },
  components: {
    pageTypeCps,
  },
  computed: {
    ...mapGetters(["systemType"]),
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
    // 获取数据
    getDataList() {
      // 请求客户信息列表
      historyRecord({
        ...this.paginationForm,
        filterType: this.pageType == "userInfo" ? 0 : 1,
      }).then((res) => {
        this.tableData = res && res.data;
        this.pageTotal = res.count; // 总条数
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
    // 删除历史记录
    deleteRecording(row) {
      row.opr = "delete";
      row.filterType = this.pageType == "userInfo" ? 0 : 1;
      this.alertMsgBox("此操作将永久删除该数据,是否继续?")
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
    // 选择系统类型(pc/sm)
    selectSystem(val) {
      this.paginationForm.pageNum = 1;
      this.paginationForm.pid = val;
      this.getDataList();
    },
    // 选择页面类型
    selectPage(val) {
      this.pageType = val;
      this.getDataList();
    },
    // 获取搜索值
    searchUserList(searchVal) {
      this.paginationForm.pageNum = 1;
      this.paginationForm.searchName = searchVal;
      this.getDataList();
    },
  },
};
</script>

<style lang='less' scoped>
.table_container {
  margin-top: 10px;
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

  // 进行中
  .processing {
    color: blue;
    font-weight: bold;
  }
  // 已完成
  .completed {
    color: green;
    font-weight: bold;
  }
  // 未完成
  .undone {
    color: red;
    font-weight: bold;
  }
}
</style>