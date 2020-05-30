<template>
  <div class="order-details">
    <pcorder-dialog
      v-if="updateOrderDialog.pcShow"
      :isShow="updateOrderDialog.pcShow"
      :dialogRow="updateOrderDialog.dialogRow"
      @getOrderList="getOrderList"
      @closeDialog="hideOrderDialog"
    ></pcorder-dialog>

    <smorder-dialog
      v-if="updateOrderDialog.smShow"
      :isShow="updateOrderDialog.smShow"
      :dialogRow="updateOrderDialog.dialogRow"
      @closeDialog="hideOrderDialog"
    ></smorder-dialog>

    <div class="add-order-details inline-block">
      <el-button
        type="primary"
        size="large"
        class="add-order-details-btn"
        @click="lookorderStatus(dialogTitle = '添加订单详情');"
      >添加订单详情</el-button>
    </div>

    <!-- <div class="total-money  text_center">
      <div class="left-text inline-block">
        <span>总额</span>
      </div>
      <div class="right-num inline-block">
        <span>{{ total }}</span>
      </div>
    </div>-->

    <select-system @selectSystem="selectSystem($event)"></select-system>
    <date-picker @changeDate="changeDate($event)"></date-picker>
    <search @searchUserList="searchUserList($event)" ref="search"></search>

    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="客户姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center" width="110"></el-table-column>
        <el-table-column prop="service" label="服务项目" align="center" width="150"></el-table-column>
        <el-table-column
          v-if="paginationForm.pid === 'pc' "
          prop="email"
          label="邮箱"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column label="开始时间" align="center" width="140">
          <template slot-scope="scope">
            <span>{{ Date.format(scope.row.begin_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center" width="140">
          <template slot-scope="scope">
            <span>{{ Date.format(scope.row.of_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="留言" align="center">
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
        <el-table-column prop="state" label="状态" align="center" :formatter="switchConvert">
          <!-- <template slot-scope="scope">
            <span :class="addClassStatus(scope.row.orderStatus)">{{ scope.row.orderStatus }}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="money" label="交易金额" align="center"></el-table-column>
        <el-table-column prop="operation" align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              icon="edit"
              size="mini"
              @click="lookorderStatus(scope.row,dialogTitle = '编辑订单详情')"
            >编辑</el-button>
            <el-button type="danger" icon="delete" size="mini" @click="deleteOrder(scope.row)">删除</el-button>
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
import pcorderDialog from "./Dialog/pcorderDialog";
import smorderDialog from "./Dialog/smorderDialog";
import { userOrderInfo } from "@/api/orderDetails";

export default {
  data() {
    return {
      tableData: [],
      pageTotal: 1,
      ruleForm: {
        name: "",
        phone: "",
        service: "",
        email: "",
        begin_time: "",
        of_time: "",
        leaving: "",
        state: "",
        money: ""
      },
      tableHeight: 0,
      paginationForm: {
        opr: "list",
        pid: "pc",
        pageNum: 1,
        pageSize: 20,
        startTime: "",
        endTime: "",
        searchName: ""
      },
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      dialogTitle: "",
      updateOrderDialog: {
        pcShow: false,
        smShow: false,
        dialogRow: {}
      },
      total: ""
    };
  },
  components: {
    pcorderDialog,
    smorderDialog
  },
  computed: {
    ...mapGetters(["systemType"])
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    setTableHeight() {
      this.$nextTick(() => {
        this.tableHeight = document.body.clientHeight - 300;
      });
    },
    // 获取列表数据
    getDataList() {
      const form = Object.assign({}, this.paginationForm);
      userOrderInfo(form).then(res => {
        this.total = res.total;
        this.tableData = res.data || [];
        this.pageTotal = res.count; // 总条数
      });
    },
    switchConvert(row) {
      if (row.state == 0) {
        return "已完成";
      } else if (row.state == 1) {
        return "进行中";
      } else {
        return "未完成";
      }
      return row.state;
    },
    // 根据状态添加class
    addClassStatus(val) {
      switch (val) {
        case "进行中":
          return "processing";
          break;
        case "已完成":
          return "completed";
          break;
        case "未完成":
          return "undone";
          break;
        default:
          return "processing";
          break;
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
    // 订单
    lookorderStatus(row) {
      if (this.dialogTitle == "添加订单详情") {
        this.ruleForm.title = "添加订单详情";
        this.updateOrderDialog.dialogRow = { ...this.ruleForm };
      } else {
        row.title = "编辑订单详情";
        this.updateOrderDialog.dialogRow = { ...row };
      }
      this.showOrderDialog();
    },
    // 获取订单列表
    getOrderList() {},
    // 删除订单详情
    deleteOrder() {
      this.alertMsgBox()
        .then(() => {
          this.message("删除订单成功");
        })
        .catch(err => {
          this.message("已取消", "info");
        });
    },
    // 隐藏订单详情dialog
    hideOrderDialog() {
      // this.updateOrderDialog.show = false;
      if (this.systemType == "pc") {
        this.updateOrderDialog.pcShow = false;
      } else {
        this.updateOrderDialog.smShow = false;
      }
    },
    // 展示订单详情dialog
    showOrderDialog() {
      if (this.systemType == "pc") {
        this.updateOrderDialog.pcShow = true;
      } else {
        this.updateOrderDialog.smShow = true;
      }
    },
    // 选择系统类型(pc/sm)
    selectSystem(val) {
      console.log(val, "我是系统类型");
      this.paginationForm.pid = val;
      this.getDataList();
    },
    // 改变日期
    changeDate(date) {
      console.log(date, "我是日期");
      this.paginationForm.startTime = date ? Date.formatDate(date[0]) : "";
      this.paginationForm.endTime = date ? Date.formatDate(date[1]) : "";
      this.getDataList();
    },
    // 搜索客户列表
    searchUserList(searchVal) {
      console.log(searchVal, "我是搜索");
      this.paginationForm.searchName = searchVal;
      this.getDataList();
      this.$refs.search.searchVal = "";
      this.paginationForm.searchName = "";
    }
  }
};
</script>

<style lang="less" scoped>
.table_container {
  padding: 10px;
  background: #fff;
  border-radius: 2px;
}

.order-details {
  padding: 20px;
  .add-order-details {
    padding-bottom: 15px;
  }
  .total-money {
    position: absolute;
    top: 0;
    right: 0;
    width: 126px;
    height: 40px;
    line-height: 40px;
    border: 1px solid rgb(229, 229, 229);
    border-radius: 5px;
    float: right;
    .left-text {
      width: 40%;
      background: #eee;
    }
    .right-num {
      width: 60%;
      background: #fff;
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


