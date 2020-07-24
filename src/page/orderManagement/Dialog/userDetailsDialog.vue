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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="ruleForm.tel" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="ruleForm.wx_number"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.email"></el-input>
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
        <el-form-item label="备注">
          <el-input type="textarea" v-model="ruleForm.note"></el-input>
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
import { add, edit } from "@/api/user";

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
        vip: "",
        note: "",
      },
      form_rules: {
        name: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkTel, trigger: "blur" },
        ],
        vip: [{ required: true, message: "请选择是否vip", trigger: "blur" }],
        update_time: [
          { required: true, message: "请选择开始日期", trigger: "blur" },
        ],
      },
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
    };
  },
  props: {
    isShow: Boolean,
    dialogRow: Object,
    default: () => {},
  },
  computed: {
    ...mapGetters(["systemType", "status"]),
  },
  mounted() {
    if (this.status === "add") {
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
                this.$emit("getCaseList");
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
                this.$emit("getCaseList");
              })
              .finally(() => {
                this.hideLoading();
              });
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
    },
  },
};
</script>

<style lang='less' scoped>
.order-ruleForm {
  /deep/ .el-select {
    width: 220px;
  }
}
</style>