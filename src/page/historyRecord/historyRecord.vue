<template>
  <div class="historyRecord">
    <div class="system-type inline-block">
      <span class="system-type-text">系统类型</span>
      <el-select v-model="systemType" size="large" placeholder="请选择分类">
        <el-option
          v-for="item in systemTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" align="center" v-show="systemType == '0' ">
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

      <el-table :data="tableData" style="width: 100%" v-show="systemType == '1' ">
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
    {{ show }}
  </div>
</template>

<script>
import Pagination from "@/components/pagination";

export default {
  name: "historyRecord",

  data() {
    return {
      tableData: [
        {
          name: "王小虎",
          tel: "13978810644",
          mailbox: "wx10086",
          vip: "0",
          leavingMessage: "很Nice"
        }
        // {
        //   userName: "王小虎",
        //   tel: "13978810644",
        //   serviceProject: "logo设计",
        //   startDate: "2016-05-02",
        //   endDate: "2016-05-02",
        //   orderStatus: "0",
        //   money: "500"
        // }
      ],
      pageTotal: 1,
      systemType: "0",
      systemTypeOptions: [
        {
          value: "0",
          label: "客户信息"
        },
        {
          value: "1",
          label: "订单详情"
        }
      ]
    };
  },
  components: {
    Pagination
  },
  computed: {
    show() {
      this.systemType && this.getDataList();
    }
  },
  mounted() {
    //   this.getDataList();
  },
  methods: {
    // 获取数据
    getDataList() {
      // 请求客户信息列表
      if (this.systemType == "0") {
        console.log("0");
      } else {
        // 请求订单详情列表
        console.log("1");
      }
    },
    // 上下分页
    handleCurrentChange(val) {
      this.paginationForm.page = val;
      this.getDataList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.paginationForm.limit = val;
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