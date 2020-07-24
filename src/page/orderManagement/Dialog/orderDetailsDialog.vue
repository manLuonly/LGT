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
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="ruleForm.tel" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="ruleForm.wx_number"></el-input>
        </el-form-item>
        <!-- prop="email" -->
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="服务项目" prop="service_type">
          <el-select v-model="ruleForm.service_type" placeholder="请选择服务项目">
            <el-option
              v-for="item in serviceOptions"
              :key="item.type"
              :label="item.type_name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="ruleForm.state" placeholder="请选择">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="vip" prop="vip">
          <el-select v-model="ruleForm.vip" placeholder="请选择">
            <el-option
              v-for="item in vipOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="price">
          <el-input
            v-model.number="ruleForm.price"
            onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="ruleForm.leave_message"></el-input>
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
import { listAll } from "@/api/caseType";
import { add, edit } from "@/api/orderDetails";

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
      isVisible: this.isShow,
      ruleForm: {
        name: "",
        tel: "",
        wx_number: "",
        email: "",
        service_type: "",
        state: "",
        price: "",
      },
      form_rules: {
        name: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkTel, trigger: "blur" },
        ],
        email: [
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        service_type: [
          { required: true, message: "请选择服务项目", trigger: "change" },
        ],
        state: [{ required: true, message: "请选择状态", trigger: "change" }],
        price: [{ required: true, message: "请输入金额", trigger: "blur" }],
      },
      stateOptions: [
        {
          value: 0,
          label: "已完成",
        },
        {
          value: 1,
          label: "进行中",
        },
        {
          value: 2,
          label: "已取消",
        },
      ],
      vipOptions: [
        {
          value: 1,
          label: "是",
        },
        {
          value: 0,
          label: "否",
        },
      ],
      serviceOptions: [],
    };
  },
  props: {
    isShow: Boolean,
    dialogRow: Object,
  },
  computed: {
    ...mapGetters(["status"]),
  },
  mounted() {
    if (this.status === "add") {
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
      const form = { pageNum: 1, pageSize: 20, system_type: "pc" };
      listAll(form).then((res) => {
        this.serviceOptions = res.data.map((i) => i) || [];
      });
    },
    // 发送表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm;
          this.showLoading();

          if (this.status === "add") {
            add(form)
              .then((res) => {
                this.$refs["ruleForm"].resetFields();
                this.closeDialog();
                this.message("新增订单成功");
                this.$emit("getOrderList");
              })
              .finally(() => {
                this.hideLoading();
              });
          } else {
            edit(form)
              .then((res) => {
                this.$refs["ruleForm"].resetFields();
                this.closeDialog();
                this.message("修改订单成功");
                this.$emit("getOrderList");
              })
              .finally(() => {
                this.hideLoading();
              });
          }
        }
      });
    },
    // 关闭dialog
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>

<style lang='less' scoped>
</style>