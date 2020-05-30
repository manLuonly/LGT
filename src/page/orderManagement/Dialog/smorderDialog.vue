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
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model.number="ruleForm.phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="服务项目" prop="service">
          <el-select v-model="ruleForm.service" placeholder="请选择服务项目">
            <el-option v-for="item in serviceOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
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
  name: "smorderDialog",

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
        name: "",
        phone: "",
        service: ""
      },
      form_rules: {
        name: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkTel, trigger: "blur" }
        ],
        service: [
          { required: true, message: "请选择服务项目", trigger: "change" }
        ]
      },
      serviceOptions: [],
      isVisible: this.isShow
    };
  },
  props: {
    isShow: Boolean,
    dialogRow: Object
  },
  mounted() {
    if (this.dialogRow.title === "添加订单详情") {
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    } else {
      this.ruleForm = this.dialogRow;
    }
  },
  methods: {
    // 获取服务项目
    getCaseType() {
      const form = { opr: "list", pid: "pc", pageNum: 1, pageSize: 20 };
      getCaseType(form).then(res => {
        this.serviceOptions = res.data.map(i => i.type) || [];
      });
    },
    // 发送表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const form = this.ruleForm;
          this.ruleForm.pid = this.systemType; // 获取系统类型
          delete form.title;
          // add
          if (this.dialogRow.title === "添加订单详情") {
            userOrderInfo(form).then(res => {
              this.$refs["ruleForm"].resetFields();
              this.closeDialog();
              this.message("新增订单成功");
            });
          } else {
            //   edit
            userOrderInfo(form).then(res => {
              this.$refs["ruleForm"].resetFields();
              this.closeDialog();
              this.message("修改订单成功");
            });
          }
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