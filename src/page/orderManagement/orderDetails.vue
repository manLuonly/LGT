<template>
  <div class="order-details">
    <div class="add-order-details">
      <el-button type="primary" size="medium" @click="addOderDetailsDialog = true">添加订单详情</el-button>
    </div>

    <el-dialog
      title="添加订单详情"
      :visible.sync="addOderDetailsDialog"
      :before-close="handleClose"
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
        <el-form-item label="服务项目" prop="serviceProject">
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
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button @click="resetForm('ruleForm')">重 置</el-button>
      </span>
    </el-dialog>

    <el-table :data="tableData" height="410" border style="width: 100%">
      <el-table-column prop="name" label="客户姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="project" label="服务项目" width="180" align="center"></el-table-column>
      <el-table-column prop="starTime" label="开始时间" width="180" align="center"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="180" align="center"></el-table-column>
      <el-table-column prop="transactionMoney" label="交易金额" width="180" align="center"></el-table-column>
      <el-table-column prop="leaveMessage" label="留言" align="center"></el-table-column>
    </el-table>
    <pagination
      :pageTotal="tableData.length"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>
  </div>
</template>

<script>
import echarts from "echarts";
import Pagination from "@/components/pagination";

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
        },
        {
          name: "王小虎",
          project: "logo设计",
          starTime: "2016-05-02",
          endTime: "2016-05-02",
          transactionMoney: "500",
          leaveMessage: "已按时完成"
        },
        {
          name: "王小虎",
          project: "logo设计",
          starTime: "2016-05-02",
          endTime: "2016-05-02",
          transactionMoney: "500",
          leaveMessage: "已按时完成"
        },
        {
          name: "王小虎",
          project: "logo设计",
          starTime: "2016-05-02",
          endTime: "2016-05-02",
          transactionMoney: "500",
          leaveMessage: "已按时完成"
        },
        {
          name: "王小虎",
          project: "logo设计",
          starTime: "2016-05-02",
          endTime: "2016-05-02",
          transactionMoney: "500",
          leaveMessage: "已按时完成"
        },
        {
          name: "王小虎",
          project: "logo设计",
          starTime: "2016-05-02",
          endTime: "2016-05-02",
          transactionMoney: "500",
          leaveMessage: "已按时完成"
        },
        {
          name: "王小虎",
          project: "logo设计",
          starTime: "2016-05-02",
          endTime: "2016-05-02",
          transactionMoney: "500",
          leaveMessage: "已按时完成"
        },
        {
          name: "王小虎",
          project: "logo设计",
          starTime: "2016-05-02",
          endTime: "2016-05-02",
          transactionMoney: "500",
          leaveMessage: "已按时完成"
        },
        {
          name: "王小虎",
          project: "logo设计",
          starTime: "2016-05-02",
          endTime: "2016-05-02",
          transactionMoney: "500",
          leaveMessage: "已按时完成"
        },
        {
          name: "王小虎",
          project: "logo设计",
          starTime: "2016-05-02",
          endTime: "2016-05-02",
          transactionMoney: "500",
          leaveMessage: "已按时完成"
        },
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
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      pageFormInfo: {
        page: 1,
        limit: 50
      },
      pageTotal: 0,
      addOderDetailsDialog: false
    };
  },
  components: {
    Pagination
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
      this.pageFormInfo.page = val;
      this.getDataList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.pageFormInfo.limit = val;
      this.getDataList();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
#typePosition,
#typePosition2 {
  position: relative;
  width: 96%;
  height: 530px;
  padding: 10px;
  border-radius: 10px;
}
.pagination {
  text-align: left;
  margin-top: 10px;
}

.order-details {
  .add-order-details {
    padding: 10px;
  }
}
</style>


