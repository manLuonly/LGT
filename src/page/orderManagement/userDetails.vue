<template>
  <div class="user-details">
    <user-details-dialog
      v-if="userDetails.isShow"
      :isShow="userDetails.isShow"
      :dialogRow="userDetails.dialogRow"
      @getCaseList="getDataList"
      @closeDialog="hideDialog"
    ></user-details-dialog>

    <el-button
      type="primary"
      size="large"
      class="add-case"
      @click="showDialog();setEmptyForm();"
    >添加客户</el-button>

    <date-picker @changeDate="changeDate($event)" style="margin-bottom:15px"></date-picker>
    <filter-vip @selectIsVip="selectIsVip($event)"></filter-vip>
    <search @searchUserList="searchUserList($event)"></search>

    <div class="table_container">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="table"
        :height="tableHeight"
        :default-sort="{prop: 'update_time', order: 'descending'}"
        style="width: 100%"
        align="center"
      >
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="wx_number" label="微信号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="vip" label="vip" align="center" :formatter="isVip"></el-table-column>
        <el-table-column prop="note" label="备注" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="update_time" sortable label="更新日期" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ Date.format(scope.row.update_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作" width="150">
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
  </div>
</template>

<script>
import { listPage, deleteUser } from "@/api/user";
import userDetailsDialog from "./Dialog/userDetailsDialog";
import filterVip from "./components/filterVip";

export default {
  name: "userDetails",

  data() {
    return {
      loading: true,
      table: [],
      tableHeight: 0,
      userDetails: {
        isShow: false,
        dialogRow: {},
      },
      paginationForm: {
        pageNum: 1,
        pageSize: 20,
        search_name: "",
        vip: -1,
        start_time: "",
        end_time: "",
      },
      pageTotal: 0,
      tableHeight: 0,
    };
  },
  components: {
    userDetailsDialog,
    filterVip,
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
          this.table = res.data || [];
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
    // 改变日期
    changeDate(date) {
      this.paginationForm.start_time = date ? Date.formatDate(date[0]) : "";
      this.paginationForm.end_time = date ? Date.formatDate(date[1]) : "";
      this.getDataList();
    },
    // 搜索列表
    searchUserList(searchVal) {
      this.paginationForm.pageNum = 1;
      this.paginationForm.search_name = searchVal;
      this.getDataList();
    },
    // 显示dialog
    showDialog() {
      this.userDetails.isShow = true;
    },
    // 隐藏dialog
    hideDialog() {
      this.userDetails.isShow = false;
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
    // 修改客户
    lookCaseListStatus(row) {
      this.userDetails.dialogRow = { ...row };
      this.showDialog();
      this.$store.commit("SET_ADDOREDIT", "edit");
    },
    // 删除客户
    deleteUser(row) {
      let id = row.id;
      this.alertMsgBox("")
        .then(() => {
          deleteUser(id).then((res) => {
            this.message(res.msg);
            this.getDataList();
          });
        })
        .catch((err) => {
          this.message("已取消", "info");
        });
    },
    // 选择是否会员
    selectIsVip(val) {
      this.paginationForm.vip = val;
      this.getDataList();
    },
  },
};
</script>

<style lang='less' scoped>
.user-details {
  padding: 20px;
  .table_container {
    padding: 10px;
    background: #fff;
    border-radius: 2px;
  }
}
</style>