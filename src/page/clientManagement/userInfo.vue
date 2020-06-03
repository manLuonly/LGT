<template>
  <div class="user-info">
    <user-info-dialog
      v-if="updateUserInfoDialog.show"
      :isShow="updateUserInfoDialog.show"
      :dialogRow="updateUserInfoDialog.dialogRow"
      @getUserInfoList="getDataList"
      @closeDialog="hideUserInfoDialog"
    ></user-info-dialog>

    <div class="add-user inline-block">
      <el-button
        type="primary"
        size="large"
        class="add-user-btn"
        @click="lookUserStatus(dialogTitle = '新增客户信息')"
      >添加客户</el-button>
    </div>

    <date-picker @changeDate="changeDate($event)"></date-picker>
    <search @searchUserList="searchUserList($event)"></search>

    <div class="table_container">
      <el-table
        :data="tableData"
        :height="tableHeight"
        :default-sort="{prop: 'begin_time', order: 'descending'}"
        style="width: 100%"
        align="center"
      >
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="wx" label="微信" align="center"></el-table-column>
        <el-table-column prop="vip" label="vip" align="center" :formatter="switchConvert"></el-table-column>
        <el-table-column prop="begin_time" sortable label="更新日期" align="center">
          <template slot-scope="scope">
            <span>{{ Date.format(scope.row.begin_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="留言" align="center" width="250">
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
import { userInfo } from "@/api/userInfo";

export default {
  data() {
    return {
      tableData: [],
      tableHeight: 0,
      ruleForm: {
        name: "",
        phone: "",
        wx: "",
        mailbox: "",
        vip: "",
        leave: ""
      },
      paginationForm: {
        opr: "list",
        pid: "pc",
        pageNum: 1,
        pageSize: 20,
        startTime: "",
        endTime: "",
        searchName: ""
      },
      pageTotal: 1,
      updateUserInfoDialog: {
        show: false,
        dialogRow: {}
      }
    };
  },
  components: {
    userInfoDialog
  },
  computed: {},
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
      const form = Object.assign({}, this.paginationForm);
      userInfo(form).then(res => { 
        this.tableData = res.data || [];
        this.pageTotal = res.count;
      });
    },

    switchConvert(row) {
      if (row.vip) {
        return "是";
      } else if (!row.vip) {
        return "否";
      } else {
        return "否";
      }
      return row.vip;
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
          row.opr = "delete";
          userInfo(row).then(res => {
            if (res.success === true) {
              this.message(res.msg);
              this.getDataList();
            } else {
              this.message(res.msg);
            }
          });
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
    // 选择系统类型(pc/sm)
    selectSystem(val) {
      console.log(val, "我是系统类型");
      this.paginationForm.pid = val;
      this.getDataList();
    },
    // 改变日期
    changeDate(date) {
      this.paginationForm.startTime = date ? Date.formatDate(date[0]) : "";
      this.paginationForm.endTime = date ? Date.formatDate(date[1]) : "";
      this.getDataList();
    },
    // 搜索客户列表
    searchUserList(searchVal) {
      console.log(searchVal, "我是搜索");
      this.paginationForm.searchName = searchVal;
      this.getDataList();
      // setTimeout(() => {
      //   this.$refs.search.searchVal = "";
      //   this.paginationForm.searchName = "";
      // }, 1000);
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


