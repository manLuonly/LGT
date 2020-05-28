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
        <el-form-item prop="username" label="启停">
          <el-switch v-model="startStop" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>

        <el-form-item label="排序">
          <el-input-number
            v-model="ruleForm.caseSortNum"
            @change="handleCaseSortNumChange"
            :min="0"
            :max="99999"
            label="描述文字"
          ></el-input-number>
        </el-form-item>

        <el-form-item prop="caseName" label="分类名称">
          <el-input v-model="ruleForm.caseName"></el-input>
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
import { addMoney, updateMoney } from "@/api/money";

export default {
  name: "addFundDialogs",
  data() {
    return {
      isVisible: this.isShow,
      ruleForm: {
        caseSortNum: 0,
        caseName: "",
        jumpAddress: "www.baidu.com"
      },
      form_rules: {
        caseName: [{ required: true, message: "分类不能为空", trigger: "blur" }]
      },
      startStop: true,
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
  components: {},
  computed: {},
  created() {},
  mounted() {
    if (this.dialogRow.type === "添加案例分类") {
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
          //表单数据验证完成之后，提交数据;
          let formData = this[form];
          const para = Object.assign({}, formData);
          console.log(para);
          // edit
          if (this.addFundDialog.type === "edit") {
            updateMoney(para).then(res => {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.$refs["form"].resetFields();
              this.isVisible = false;
              this.$emit("getFundList");
            });
          } else {
            // add
            addMoney(para).then(res => {
              this.$message({
                message: "新增成功",
                type: "success"
              });
              this.$refs["form"].resetFields();
              this.isVisible = false;
              this.$emit("getFundList");
            });
          }
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
