<template>
  <div class="order-details">
    <el-dialog
      title="添加订单详情"
      :visible.sync="addOderDetailsDialog"
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="客户姓名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <!-- prop="serviceProject" -->
        <el-form-item label="服务项目" >
          <el-select v-model="ruleForm.serviceProject" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="startDate">
          <el-date-picker v-model="ruleForm.startDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="endDate">
          <el-date-picker v-model="ruleForm.endDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input v-model.number="ruleForm.money"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="ruleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button @click="resetForm('ruleForm')">重 置</el-button>
      </span>
    </el-dialog>
    <div class="add-order-details">
    <el-button type="primary" size="medium" class="add-order-details-btn" @click="addOderDetailsDialog = true">添加订单详情</el-button>
    </div>
    <div class="table_container">
      <el-table :data="tableData"  border style="width: 100%">
        <el-table-column prop="name" label="客户姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="project" label="服务项目" width="180" align="center"></el-table-column>
        <el-table-column prop="starTime" label="开始时间" width="180" align="center"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="180" align="center"></el-table-column>
        <el-table-column prop="transactionMoney" label="交易金额" width="180" align="center"></el-table-column>
        <el-table-column prop="leaveMessage" label="备注" align="center"></el-table-column>
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
    return {
      tableData: [
        {
          name: "王小虎",
          project: "logo设计",
          starTime: "2016-05-02",
          endTime: "2016-05-02",
          transactionMoney: "500",
          leaveMessage: "已按时完成"
        }
      ],
      ruleForm: {
        userName: "",
        serviceProject: "",
        startDate: "",
        endDate: "",
        money: "",
        remark: ""
      },
      tableHeight: 0,
      incomePayData: {
        page: 1,
        limit: 20,
        name: ""
      },
      pageTotal: 2,
      addCaseDialog: false,
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      addOderDetailsDialog: false,
      rules: {
        userName: [
          { required: true, message: "请输入客户姓名", trigger: "blur" }
        ],
        serviceProject: [
          { required: true, message: "请选择服务项目", trigger: "change" }
        ],
        startDate: [
          { required: true, message: "请选择开始日期", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "请选择结束日期", trigger: "blur" }
        ],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }]
      }
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
      this.incomePayData.page = val;
      this.getDataList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.incomePayData.limit = val;
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
.addCase {
  height: 40px;
  margin-bottom: 15px;
}

.order-details {
  padding: 20px;
  .add-order-details {
    // padding: 10px;
      padding-bottom: 15px;
      .add-order-details-btn {
        height: 40px;
      }
  }
  .demo-ruleForm {
    /deep/ .el-select {
      width: 100%;
    }
    /deep/ .el-input {
      width: 100%;
    }
  }
}
</style>


