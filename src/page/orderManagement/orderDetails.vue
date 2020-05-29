<template>
  <div class="order-details">
    <order-Dialog
      v-if="updateOrderDialog.show"
      :isShow="updateOrderDialog.show"
      :dialogRow="updateOrderDialog.dialogRow"
      @getOrderList="getOrderList"
      @closeDialog="hideOrderDialog"
    ></order-Dialog>

    <div class="add-order-details inline-block">
      <el-button
        type="primary"
        size="large"
        class="add-order-details-btn"
        @click="lookorderStatus(dialogTitle = '添加订单详情');"
      >添加订单详情</el-button>
    </div>

    <div class="total-money inline-block text_center">
      <div class="left-text inline-block">
        <span>总额</span>
      </div>
      <div class="right-num inline-block">
        <span>{{ total }}</span>
      </div>
    </div>

    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="客户姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="service" label="服务项目" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="begin_time" label="开始时间" align="center"></el-table-column>
        <el-table-column prop="of_time" label="结束时间" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span :class="addClassStatus(scope.row.orderStatus)">{{ scope.row.orderStatus }}</span>
          </template>
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
import Pagination from "@/components/pagination";
import orderDialog from "./Dialog/orderDialog";
import { userOrderInfo } from "@/api/orderDetails";

export default {
  data() {
    return {
      tableData: [],
      pageTotal: 2,
      ruleForm: {
        name: "",
        phone: "",
        service: "",
        email: "",
        begin_time: "",
        of_time: "",
        orderStatus: "",
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
        show: false,
        dialogRow: {}
      },
      total: ""
    };
  },
  components: {
    Pagination,
    orderDialog
  },
  computed: {},
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
        this.pageTotal = res.count; // 条数
        this.tableData.map(item => {
          switch (item.orderStatus) {
            case "0":
              item.orderStatus = "已完成";
              break;
            case "1":
              item.orderStatus = "进行中";
              break;
            case "2":
              item.orderStatus = "未完成";
              break;
            default:
              item.orderStatus = "进行中";
              break;
          }
        });
      });
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
      this.updateOrderDialog.show = false;
    },
    // 展示订单详情dialog
    showOrderDialog() {
      this.updateOrderDialog.show = true;
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
    width: 126px;
    height: 40px;
    margin: 0 50px;
    line-height: 40px;
    border: 1px solid rgb(229, 229, 229);
    border-radius: 5px;
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


