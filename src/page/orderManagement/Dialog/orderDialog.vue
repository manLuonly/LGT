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
        :rules="form_rules"
        ref="ruleForm"
        label-width="100px"
        class="order-ruleForm"
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
          <el-input v-model.number="ruleForm.money" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "orderDialog",
  data() {
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
      form_rules: {
        userName: [
          { required: true, message: "请输入客户姓名", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkTel, trigger: "blur" }
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
        orderStatus: [
          { required: true, message: "请选择状态", trigger: "change" }
        ],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }]
      },
      orderStatus: "",
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
    if (this.dialogRow.type === "添加订单详情") {
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    } else {
      this.ruleForm = this.dialogRow;
    }
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
    // 关闭dialog
    closeDialog() {
      this.$emit("closeDialog");
    }
  }
};
</script>

<style lang='less' scoped>
</style>