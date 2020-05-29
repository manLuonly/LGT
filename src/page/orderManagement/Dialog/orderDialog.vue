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
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="服务项目" prop="service">
          <el-select v-model="ruleForm.service" placeholder="请选择服务项目">
            <el-option v-for="item in serviceOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="begin_time">
          <el-date-picker v-model="ruleForm.begin_time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="of_time">
          <el-date-picker v-model="ruleForm.of_time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="状态" prop="orderStatus">
          <el-select v-model="ruleForm.orderStatus" placeholder="请选择">
            <el-option
              v-for="item in orderStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input
            v-model.number="ruleForm.money"
            onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
          ></el-input>
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
import { getCaseType } from "@/api/caseType";
import { userOrderInfo } from "@/api/orderDetails";

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
        name: "",
        phone: "",
        service: "",
        email: "",
        begin_time: "",
        of_time: "",
        orderStatus: "",
        money: ""
      },
      form_rules: {
        name: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkTel, trigger: "blur" }
        ],
        service: [
          { required: true, message: "请选择服务项目", trigger: "change" }
        ],
        begin_time: [
          { required: true, message: "请选择开始日期", trigger: "blur" }
        ],
        of_time: [
          { required: true, message: "请选择结束日期", trigger: "blur" }
        ],
        orderStatus: [
          { required: true, message: "请选择状态", trigger: "change" }
        ],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }]
      },
      serviceOptions: [],
      orderStatusOptions: [
        {
          value: "0",
          label: "已完成"
        },
        {
          value: "1",
          label: "进行中"
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
    if (this.dialogRow.title === "添加订单详情") {
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    } else {
      this.ruleForm = this.dialogRow;
    }
    this.getCaseType();
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
          
          
          this.ruleForm.begin_time = Date.formatDate(this.ruleForm.begin_time); // 开始时间
          this.ruleForm.of_time = Date.formatDate(this.ruleForm.of_time); // 结束时间
          const para = Object.assign({}, this.ruleForm);
          // add
          if (this.dialogRow.title === "添加订单详情") {
            console.log('add');
            const form = {
              opr: "add",
              pid: "pc",
              pageNum: 1,
              pageSize: 20,
              startTime: "",
              endTime: "",
              searchName: ""
            };
            userOrderInfo(form).then(res => {
              this.$refs["ruleForm"].resetFields();
              this.closeDialog();
              this.message("新增订单成功");
            });
          } else {
            console.log('edit');
            
            // edit
            console.log(this.ruleForm);
            
            this.ruleForm.begin_time = Date.formatDate(
              this.ruleForm.begin_time
            ); // 开始时间
            this.ruleForm.of_time = Date.formatDate(this.ruleForm.of_time); // 结束时间

            const form = this.ruleForm;
            console.log(form,'00');
            

            // userOrderInfo(form).then(res => {
            //   this.$refs["ruleForm"].resetFields();
            //   this.closeDialog();
            //   this.message("新增订单成功");
            // });
          }
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
.order-ruleForm {
  /deep/ .el-select {
    width: 220px;
  }
}
</style>