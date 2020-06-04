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
          <el-input v-model="ruleForm.phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="服务项目">
          <el-checkbox-group v-model="service" @change="changeProject">
            <el-checkbox
              v-for="item in serviceOptions"
              :label="item.type"
              :key="item.type"
            >{{ item.type_name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="begin_time">
          <el-date-picker
            v-model="ruleForm.begin_time"
            :disabled="isEdit"
            :picker-options="startDatePicker"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="of_time">
          <el-date-picker
            v-model="ruleForm.of_time"
            :picker-options="endDatePicker"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="留言">
          <el-input type="textarea" v-model="ruleForm.leaving"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="ruleForm.state" placeholder="请选择">
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
import { mapGetters } from "vuex";
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
        leaving: "",
        state: "",
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
        state: [{ required: true, message: "请选择状态", trigger: "change" }],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }]
      },
      serviceOptions: [],
      orderStatusOptions: [
        {
          value: 0,
          label: "已完成"
        },
        {
          value: 1,
          label: "进行中"
        },
        {
          value: 2,
          label: "未完成"
        }
      ],
      isVisible: this.isShow,
      isEdit: false,
      service: [],
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate()
    };
  },
  props: {
    isShow: Boolean,
    dialogRow: Object
  },
  computed: {
    ...mapGetters(["systemType"])
  },
  mounted() {
    if (this.dialogRow.type) {
      this.service = this.dialogRow.type.split(",");
    }

    if (this.dialogRow.title === "添加订单详情") {
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    } else {
      this.isEdit = true;
      this.ruleForm = this.dialogRow;
    }
    this.getCaseType();
  },
  methods: {
    // 获取服务项目
    getCaseType() {
      const form = { opr: "list", pid: "pc", pageNum: 1, pageSize: 20 };
      getCaseType(form).then(res => {
        this.serviceOptions = res.data.map(i => i) || [];
        // this.service = res.data.map(i => i.type_name) || []; ..
        // this.service =  res.data.map(i => i.type) || [];
      });
    },
    // 发送表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const form = this.ruleForm;
          this.ruleForm.pid = this.systemType; // 获取系统类型
          delete form.title;
          if (this.dialogRow.title === "添加订单详情") {
            this.ruleForm.opr = "add";
            form.begin_time = Date.formatDate(form.begin_time);
            form.of_time = Date.formatDate(form.of_time);
            userOrderInfo(form).then(res => {
              this.$refs["ruleForm"].resetFields();
              this.closeDialog();
              this.message("新增订单成功");
              this.$emit("getOrderList");
            });
          } else {
            this.ruleForm.opr = "update";
            form.begin_time = Date.Conversiontime(form.begin_time);
            form.of_time = Date.Conversiontime(form.of_time);
            userOrderInfo(form).then(res => {
              this.$refs["ruleForm"].resetFields();
              this.closeDialog();
              this.message("修改订单成功");
              this.$emit("getOrderList");
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 改变服务项目
    changeProject(value) {
      console.log(value, "project");
      this.ruleForm.type = value.join(","); // 已选服务项目
    },
    // 关闭dialog
    closeDialog() {
      this.$emit("closeDialog");
    },
    // 处理开始日期
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.ruleForm.begin_time) {
            //如果开始时间不为空，则结束时间大于开始时间
            return (
              new Date(self.ruleForm.begin_time).getTime() > time.getTime()
            );
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    // 处理结束日期
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.ruleForm.of_time) {
            //如果结束时间不为空，则小于结束时间
            return new Date(self.ruleForm.of_time).getTime() < time.getTime();
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
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