<template>
  <div class="table_container">
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="table"
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
          <el-button icon="edit" size="mini" @click="restoreRecording(scope.row)">恢复</el-button>
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
</template>

<script>
import { historyRecord } from "@/api/historyRecord";
export default {
  name: "orderDetails",

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
    deleteOrder() {},
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
  },
};
</script>

<style lang='scss' scoped>
</style>