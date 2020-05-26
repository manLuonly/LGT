<template>
  <div>
    <el-dialog
      :visible.sync="isVisible"
      :title="dialogRow.title"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      @close="closeDialog"
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
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model.number="ruleForm.tel"></el-input>
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
        <el-form-item label="状态" prop="orderStatus">
          <el-select v-model="orderStatus" placeholder="请选择">
            <el-option
              v-for="item in orderStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input v-model.number="ruleForm.money"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button @click="resetForm('ruleForm')">重 置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",

  data() {
    return {
      ruleForm: {
        userName: "",
        tel: "",
        serviceProject: "",
        startDate: "",
        endDate: "",
        orderStatus: "",
        money: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入客户姓名", trigger: "blur" }
        ],
        tel: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        serviceProject: [
          { required: true, message: "请选择服务项目", trigger: "change" }
        ],
        startDate: [
          { required: true, message: "请选择开始日期", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "请选择结束日期", trigger: "blur" }
        ],
        orderStatus: [
          { required: true, message: "请选择状态", trigger: "change" }
        ],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }]
      },
      orderStatus: "进行中",
      orderStatusOptions: [
        {
          value: "0",
          label: "进行中"
        },
        {
          value: "1",
          label: "已完成"
        },
        {
          value: "2",
          label: "未完成"
        }
      ],
      isVisible: this.isShow
    };
  },
  props: {
    isShow: Boolean,
    dialogRow: Object
  },
  mounted() {
    // if (this.dialogRow.title = '添加订单详情') {

    // } else {

    //   }
    this.ruleForm = this.dialogRow;
  },
  methods: {
    // 发送表单
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
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closeDialog() {
      this.$emit("closeDialog");
    }
  }
};
</script>

<style lang='less' scoped>
</style>