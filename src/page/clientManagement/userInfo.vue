<template>
  <div class="user-info">
    <userInfoDialog
      v-if="updateUserInfoDialog.show"
      :isShow="updateUserInfoDialog.show"
      :dialogRow="updateUserInfoDialog.dialogRow"
      @getUserInfoList="getUserInfoList"
      @closeDialog="hideUserInfoDialog"
    ></userInfoDialog>

    <div class="add-user inline-block">
      <el-button
        type="primary"
        size="large"
        class="add-user-btn"
        @click="lookUserStatus(dialogTitle = '新增客户信息')"
      >添加客户</el-button>
    </div>

    <date-picker></date-picker>
    <search @searchUserList="searchUserList($event)"></search>

    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" align="center">
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
            <el-button
              icon="edit"
              size="mini"
              @click="lookUserStatus(scope.row,dialogTitle = '编辑客户信息');"
            >编辑</el-button>
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
import userInfoDialog from "./Dialog/userInfoDialog";
import datePicker from "./components/datePicker";
import search from "./components/search";
import Pagination from "@/components/pagination";

export default {
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
      ],
      tableHeight: 0,
      ruleForm: {
        name: "",
        tel: "",
        mailbox: "",
        leaveMessage: ""
      },
      paginationForm: {
        page: 1,
        limit: 20,
        name: ""
      },
      pageTotal: 2,
      updateUserInfoDialog: {
        show: false,
        dialogRow: {}
      }
    };
  },
  components: {
    userInfoDialog,
    datePicker,
    search,
    Pagination
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
    getDataList() {},

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
    // 显示客户信息dialog
    showUserInfoDialog() {
      this.updateUserInfoDialog.show = true;
    },
    // 隐藏客户信息dialog
    hideUserInfoDialog() {
      this.updateUserInfoDialog.show = false;
    },

    // 获取客户信息
    getUserInfoList() {},
    // 删除客户
    deleteUser(row) {
      this.alertMsgBox()
        .then(() => {
          this.message("删除客户成功");
        })
        .catch(err => {
          this.message("已取消", "info");
        });
    },
    // 客户信息
    lookUserStatus(row) {
      if (this.dialogTitle == "新增客户信息") {
        this.ruleForm.title = "新增客户信息";
        this.updateUserInfoDialog.dialogRow = { ...this.ruleForm };
      } else {
        row.title = "编辑客户信息";
        this.updateUserInfoDialog.dialogRow = { ...row };
      }
      this.showUserInfoDialog();
    },
    // 搜索客户列表
    searchUserList(searchVal) {
      console.log(searchVal,"我是搜索");
    }
  }
};
</script>

<style lang="less" scoped>
.user-info {
  padding: 20px;
  .add-user {
    .add-user-btn {
      margin-bottom: 15px;
    }
  }
  .table_container {
    padding: 10px;
    background: #fff;
    border-radius: 2px;
  }

}
</style>


