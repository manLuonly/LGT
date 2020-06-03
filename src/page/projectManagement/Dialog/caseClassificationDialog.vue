<template>
  <el-dialog
    :visible.sync="isVisible"
    :title="dialogRow.title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    @close="closeDialog"
    center
  >
    <div class="form">
      <el-form
        ref="form"
        :model="ruleForm"
        :rules="form_rules"
        :label-width="dialog.formLabelWidth"
        style="margin:10px;width:auto;"
      >
        <el-form-item label="启停">
          <el-switch v-model="ruleForm.enable" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>

        <el-form-item prop="type_name" label="分类名称">
          <el-input v-model="ruleForm.type_name"></el-input>
        </el-form-item>

        <el-form-item prop="type" label="分类">
          <el-input v-model="ruleForm.type"></el-input>
        </el-form-item>

        <!-- 
        <el-form-item prop="jumpAddress" label="上级分类">
          <span
            v-for="(item,index) in ClassificationStatusItems"
            :key="index"
            @click="getClassificationStatus(index)"
            :class="{active:index===staticNumber}"
          >{{ item.name }}</span>
          <el-input v-model="ruleForm.jumpAddress" :disabled="isCanSelectAddress"></el-input>
        </el-form-item>-->
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { getCaseType } from "@/api/caseType";

export default {
  name: "addFundDialogs",
  data() {
    return {
      isVisible: this.isShow,
      ruleForm: {
        enable: true,
        type: "",
        type_name: ''
        // jumpAddress: "www.baidu.com"
      },
      test: true,
      form_rules: {
        type: [{ required: true, message: "分类不能为空", trigger: "blur" }],
        type_name: [{ required: true, message: "分类名称不能为空", trigger: "blur" }]
      },
      //详情弹框信息
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      staticNumber: 0,
      ClassificationStatusItems: [
        {
          name: "默认"
        },
        {
          name: "自定义"
        }
      ],
      isCanSelectAddress: true
    };
  },
  props: {
    isShow: Boolean,
    dialogRow: Object
  },
  computed: {
    ...mapGetters(["systemType"])
  },
  created() {},
  mounted() {
    if (this.dialogRow.title === "添加案例分类") {
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    } else {
      this.ruleForm = this.dialogRow;
    }
  },
  methods: {
    // 关闭dialog
    closeDialog() {
      this.$emit("closeDialog");
    },
    //表单提交
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
   

          this.ruleForm.pid = this.systemType;
          const form = this.ruleForm;
          console.log(form, "form");

          if (this.dialogRow.title === "添加案例分类") {
            this.ruleForm.opr = "add";
            getCaseType(form).then(res => {
              this.$message({
                message: "新增案例分类成功",
                type: "success"
              });
              this.$refs["form"].resetFields();
              this.isVisible = false;
              this.$emit("getCaseList");
            });
          } else {
            this.ruleForm.opr = "update";
            getCaseType(form).then(res => {
              this.$message({
                message: "编辑案例分类成功",
                type: "success"
              });
              this.$refs["form"].resetFields();
              this.isVisible = false;
              this.$emit("getCaseList");
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCaseSortNumChange(val) {
      console.log("案例排序发生了变化" + val);
    },
    // 地址是否自定义
    getClassificationStatus(index) {
      this.staticNumber = index;
      if (index === 1) {
        this.isCanSelectAddress = false;
      } else {
        this.isCanSelectAddress = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  .active {
    border-radius: 3px;
    margin: 5px;
    color: #fff;
    background-color: rgb(102, 177, 255);
  }
}
</style>
