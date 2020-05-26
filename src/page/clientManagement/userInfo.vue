<template>
  <div class="user-info">
    <div class="add-user">
      <el-button type="primary" size="small" class="add-user-btn" @click="addUserDialog = true">添加客户</el-button>
    </div>
    <el-dialog title="添加客户" :visible.sync="addUserDialog" @close="resetForm('ruleForm')" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model.number="ruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mailbox">
          <el-input v-model="ruleForm.mailbox"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="ruleForm.companyName"></el-input>
        </el-form-item>
        <el-form-item label="留言" prop="leaveMessage">
          <el-input class="leave-message" type="textarea" v-model="ruleForm.leaveMessage"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">重 置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
      </span>
    </el-dialog>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" align="center">
        <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="tel" label="联系电话" width="180" align="center"></el-table-column>
        <el-table-column prop="mailbox" label="邮箱/微信" width="180" align="center"></el-table-column>
        <el-table-column prop="companyName" label="公司名称" width="180" align="center"></el-table-column>
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
import * as mutils from "@/utils/mUtils";
import Pagination from "@/components/pagination";
import { getMoneyIncomePay, removeMoney, batchremoveMoney } from "@/api/money";

export default {
  data() {
    // 手机号验证
    var checkTel = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    var checkMailbox = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        const email = reg.test(value);
        if (!email) {
          callback(new Error("邮箱格式如:admin@163.com"));
        } else {
          callback();
        }
      }
    };
    return {
      tableData: [
        {
          name: "王小虎",
          tel: "13978810644",
          mailbox: "wx10086",
          companyName: "OPPO深圳分公司",
          leavingMessage: "很Nice"
        }
      ],
      tableHeight: 0,
      ruleForm: {
        name: "",
        tel: "",
        mailbox: "",
        companyName: "",
        leaveMessage: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        tel: [{ required: true, validator: checkTel, trigger: "blur" }],
        mailbox: [
          { required: true, message: "请填写邮箱", trigger: "blur" },
          { validator: checkMailbox, trigger: "blur" }
        ]
      },
      form: {
        page: 1,
        limit: 20,
        name: ""
      },
      pageTotal: 2,
      addUserDialog: false
    };
  },
  components: {
    Pagination
  },
  computed: {},
  mounted() {
    this.getDataList();
  },
  methods: {
    setAddress(value) {},
    setTableHeight() {
      this.$nextTick(() => {
        this.tableHeight = document.body.clientHeight - 300;
      });
    },
    // 获取列表数据
    getDataList() {},
    hideAddFundDialog() {
      this.addFundDialog.show = false;
    },
    // 上下分页
    handleCurrentChange(val) {
      this.form.page = val;
      this.getDataList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.form.limit = val;
      this.getDataList();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.user-info {
  padding: 20px;
  .add-user {
    .add-user-btn {
      height: 40px;
      margin-bottom: 15px;
    }
  }
  .table_container {
    padding: 10px;
    background: #fff;
    border-radius: 2px;
  }
  .el-dialog--small {
    width: 600px !important;
  }
  .pagination {
    text-align: left;
    margin-top: 10px;
  }
}
</style>


