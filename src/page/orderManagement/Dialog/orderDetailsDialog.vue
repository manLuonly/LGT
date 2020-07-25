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
          <el-select
            v-model="ruleForm.name"
            v-clearSpecial:[ruleForm.name]="{set:setValue, setName:'name'}"
            clearable
            filterable
            placeholder="请选择或输入姓名"
            @change="currentVal"
          >
            <el-option v-for="item in userOptions" :key="item.tel" :label="item.name" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-select
            v-model="ruleForm.tel"
            v-clearSpecial:[ruleForm.tel]="{set:setValue, setName:'tel'}"
            clearable
            filterable
            placeholder="请选择或输入电话"
            @change="currentVal"
          >
            <el-option v-for="item in userOptions" :key="item.tel" :label="item.tel" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="微信号">
          <el-select
            v-model="ruleForm.wx_number"
            v-clearSpecial:[ruleForm.wx_number]="{set:setValue, setName:'wx_number'}"
            clearable
            filterable
            placeholder="请选择微信号"
            @change="currentVal"
          >
            <el-option
              v-for="item in userOptions"
              :key="item.tel"
              :label="item.wx_number"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="服务项目" prop="service_type">
          <el-select v-model="ruleForm.service_type" placeholder="请选择服务项目">
            <el-option
              v-for="item in serviceOptions"
              :key="item.type_name"
              :label="item.type_name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="ruleForm.state" placeholder="请选择">
            <el-option
              v-for="item in stateOptions"
              :key="item.label"
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
            v-clearSpecial:[ruleForm.price]="{set:setValue, setName:'price'}"
            onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
          ></el-input>
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
import { listAll } from "@/api/caseType";
import { add, edit, userListAll } from "@/api/orderDetails";

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
        vip: "",
        price: "",
        note: "",
      },
      form_rules: {
        name: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkTel, trigger: "blur" },
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
      userOptions: [],
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
    this.getUserList();
    this.getCaseType();
  },
  methods: {
    // 获取用户列表
    getUserList() {
      let name = this.ruleForm.name ? this.ruleForm.name : " ";
      userListAll(name).then((res) => {
        this.userOptions = res.data || [];
      });
    },
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
    // 表单赋值
    currentVal(item) {
      console.log(item, "item");
      // this.ruleForm = item;
      this.ruleForm = {
        name: item.name,
        tel: item.tel,
        wx_number: item.wx_number,
        email: item.email,
        service_type: "",
        state: "",
        vip: item.vip,
        price: "",
        note: item.note,
      };
    },
    setValue(name, val) {
      console.log(val, "val");
      this.ruleForm[name] = val;
    },
  },
};
</script>

<style lang='less' scoped>
</style>