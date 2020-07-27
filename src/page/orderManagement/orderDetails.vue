<template>
  <div class="order-details">
    <order-details-dialog
      v-if="orderDetails.isShow"
      :isShow="orderDetails.isShow"
      :dialogRow="orderDetails.dialogRow"
      @getOrderList="getDataList"
      @closeDialog="hideDialog"
    ></order-details-dialog>

    <div class="add-order-details inline-block">
      <el-button
        type="primary"
        size="large"
        class="add-order-details-btn"
        @click="showDialog();setEmptyForm();"
      >添加订单</el-button>
    </div>

    <date-picker @changeDate="changeDate($event)"></date-picker>
    <filter-state @selectState="selectState($event)"></filter-state>
    <search :customizePlaceholder="customizePlaceholder" @searchUserList="searchUserList($event)"></search>

    <div class="total-money text_center inline-block">
      <div class="left-text inline-block">
        <span>总额</span>
      </div>
      <div class="right-num inline-block">
        <span>￥{{ total }}</span>
      </div>
    </div>

    <div class="table_container">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
        :height="tableHeight"
        :default-sort="{prop: 'price', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="wx_number" label="微信号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="service_type" label="服务项目" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="note" label="备注" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="vip" label="vip" align="center" :formatter="isVip"></el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="currentState(scope.row)"
              v-html="currentStatus(scope.row)"
            >{{ scope.row.state }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="交易金额" align="center" sortable>
          <template slot-scope="scope">
            <span>￥{{ scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ Date.format(scope.row.update_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button icon="edit" size="mini" @click="lookorderStatus(scope.row)">编辑</el-button>
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
import orderDetailsDialog from "./Dialog/orderDetailsDialog";
import filterState from "./components/filterState";
import { listPage, deleteOrder } from "@/api/orderDetails";

export default {
  data() {
    return {
      tableData: [],
      orderDetails: {
        isShow: false,
        dialogRow: {},
      },
      paginationForm: {
        pageNum: 1,
        pageSize: 20,
        search_name: "",
        state: -1,
        vip: "",
        start_time: "",
        end_time: "",
      },
      loading: true,
      tableHeight: 0,
      pageTotal: 0,
      total: 0, // 总额
      customizePlaceholder: "请输入姓名/微信号",
    };
  },
  components: {
    orderDetailsDialog,
    filterState,
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
    // 获取列表数据
    getDataList() {
      const form = this.paginationForm;
      listPage(form)
        .then((res) => {
          this.total = res.total;
          this.tableData = res.data || [];
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
    // 订单
    lookorderStatus(row) {
      this.showDialog(row);
      this.$store.commit("SET_ADDOREDIT", "edit");
    },
    // 删除订单详情
    deleteOrder(row) {
      let id = row.id;
      this.alertMsgBox()
        .then(() => {
          deleteOrder(id).then((res) => {
            this.message(res.msg);
            this.getDataList();
          });
        })
        .catch((err) => {
          this.message("已取消", "info");
        });
    },
    // 展示订单详情dialog
    showDialog(row) {
      this.orderDetails.dialogRow = { ...row };
      this.orderDetails.isShow = true;
    },
    // 隐藏订单详情dialog
    hideDialog() {
      this.orderDetails.isShow = false;
    },
    // 改变日期
    changeDate(date) {
      this.paginationForm.start_time = date ? Date.formatDate(date[0]) : "";
      this.paginationForm.end_time = date ? Date.formatDate(date[1]) : "";
      this.getDataList();
    },
    // 选择状态
    selectState(val) {
      this.paginationForm.state = val;
      this.getDataList();
    },
    // 搜索客户列表
    searchUserList(searchVal) {
      this.paginationForm.pageNum = 1;
      this.paginationForm.search_name = searchVal;
      this.getDataList();
    },
    // 设置状态,清空表单
    setEmptyForm() {
      this.$store.commit("SET_ADDOREDIT", "add");
    },
    // 是否vip格式转换
    isVip(row) {
      let vip = row.vip;
      if (vip === 0) {
        return "否";
      } else if (vip === 1) {
        return "是";
      } else {
        return "否";
      }
    },
    // 当前状态
    currentStatus(row) {
      let state = row.state;
      if (state === 0) {
        return "已完成";
      } else if (state === 1) {
        return "进行中";
      } else if (state === 2) {
        return "已取消";
      } else {
        return "未知";
      }
    },
    //修改颜色
    currentState(row) {
      let state = row.state;
      if (state === 0) {
        return "success";
      } else if (state === 1) {
        return "";
      } else if (state === 2) {
        return "danger";
      } else {
        return "未知";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.order-details {
  padding: 20px;
  .table_container {
    padding: 10px;
    background: #fff;
    border-radius: 2px;
    /deep/ .el-popover__reference {
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .add-order-details {
    padding-bottom: 15px;
  }
  .total-money {
    width: 126px;
    height: 40px;
    margin: 0 20px;
    line-height: 40px;
    border: 1px solid rgb(229, 229, 229);
    border-radius: 5px;
    .left-text {
      width: 40%;
      color: #fff;
      background: rgb(64, 158, 255);
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


