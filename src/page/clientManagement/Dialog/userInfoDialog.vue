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
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="ruleForm.phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="wx" prop="wx">
          <el-input v-model="ruleForm.wx"></el-input>
        </el-form-item>
        <!-- <el-form-item label="邮箱" prop="mailbox">
          <el-input v-model="ruleForm.mailbox"></el-input>
        </el-form-item> -->
        <el-form-item label="vip" prop="vip">
          <el-select v-model="ruleForm.vip" placeholder="请选择">
            <el-option
              v-for="item in isVipOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="留言" prop="leaving">
          <el-input class="leave-message" type="textarea" v-model="ruleForm.leaving"></el-input>
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
import { userInfo } from "@/api/userInfo";

export default {
  name: "userInfoDialog",

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
    return {
      ruleForm: {
        name: "",
        phone: "",
        wx: "",
        // mailbox: "",
        vip: "",
        leaving: ""
      },
      rules: {
        name: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkTel, trigger: "blur" }
        ],
        vip: [
          { required: true, message: "请选择客户是否属于vip", trigger: "blur" }
        ]
      },
      isVipOptions: [
        {
          value: true,
          label: "是"
        },
        {
          value: false,
          label: "否"
        }
      ],
      isVisible: this.isShow
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
    if (this.dialogRow.title === "新增客户信息") {
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    } else {
      this.ruleForm = this.dialogRow;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const form = this.ruleForm;
          this.ruleForm.pid = this.systemType; // 获取系统类型
          delete form.title;

          if (this.dialogRow.title === "新增客户信息") {
            this.ruleForm.opr = "add";
            userInfo(form).then(res => {
              this.$refs["ruleForm"].resetFields();
              this.closeDialog();
              this.message("新增客户成功");
              this.$emit("getUserInfoList");
            });
          } else {
            this.ruleForm.opr = "update";
            userInfo(form).then(res => {
              this.$refs["ruleForm"].resetFields();
              this.closeDialog();
              this.message("编辑客户成功");
              this.$emit("getUserInfoList");
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
    }
  }
};
</script>

<style lang='less' scoped>
</style>