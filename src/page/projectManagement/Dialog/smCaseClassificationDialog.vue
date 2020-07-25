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
          <el-input
            v-model="ruleForm.type_name"
            maxlength="20"
            show-word-limit
            clearable
            v-clearSpecial:[ruleForm.type_name]="{set:setValue, setName:'type_name'}"
          ></el-input>
        </el-form-item>

        <el-form-item prop="type" label="分类">
          <el-input
            v-model="ruleForm.type"
            maxlength="20"
            show-word-limit
            clearable
            v-clearSpecial:[ruleForm.type]="{set:setValue, setName:'type'}"
          ></el-input>
        </el-form-item>

        <el-form-item label="图标">
          <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="successIcon"
            :before-upload="beforeUpload"
            accept="image/jpg, image/jpeg, image/png"
            :limit="1"
          >
            <img v-if="ruleForm.icon_img" :src="ruleForm.icon_img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="封面图">
          <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="successImg"
            :before-upload="beforeUpload"
            :limit="1"
          >
            <img v-if="ruleForm.cover_img" :src="ruleForm.cover_img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="描述">
          <el-input placeholder="请输入内容" v-model="description1"></el-input>
          <el-input placeholder="请输入内容" v-model="description2"></el-input>
        </el-form-item>
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
import { addH5Type, editH5Type } from "@/api/caseType";

export default {
  name: "addFundDialogs",
  data() {
    return {
      isVisible: this.isShow,
      ruleForm: {
        type_name: "",
        type: "",
        cover_img: "",
        details: "",
        price: 0,
        icon_img: "",
        enable: true,
      },
      test: true,
      form_rules: {
        type: [{ required: true, message: "分类不能为空", trigger: "blur" }],
        type_name: [
          { required: true, message: "分类名称不能为空", trigger: "blur" },
        ],
      },
      //详情弹框信息
      dialog: {
        width: "400px",
        formLabelWidth: "120px",
      },
      description1: "",
      description2: "",
      action: "https://imgkr.com/api/v2/files/upload",
    };
  },
  props: {
    isShow: Boolean,
    dialogRow: Object,
  },
  computed: {
    ...mapGetters(["systemType", "status"]),
  },
  created() {},
  mounted() {
    if (this.status === "add") {
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    } else {
      this.ruleForm = this.dialogRow;
    }
    this.description1 = this.dialogRow.details.split("|")[0];
    this.description2 = this.dialogRow.details.split("|")[1];
  },
  methods: {
    successIcon(res, file) {
      this.ruleForm.icon_img = res.data;
    },
    successImg(res, file) {
      this.ruleForm.cover_img = res.data;
    },
    beforeUpload(file) {
      const isImg =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isImg) {
        this.$message.error("只能上传图片格式为jpg,jpeg,png!");
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return isImg && isLt5M;
    },

    //表单提交
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let form = this.ruleForm;

          form.details = this.description1 + "|" + this.description2;
          if (this.status === "add") {
            this.showLoading();

            addH5Type(form)
              .then((res) => {
                this.message("新增案例分类成功");
                this.$refs["form"].resetFields();
                this.isVisible = false;
                this.$emit("getCaseList");
              })
              .finally(() => {
                this.hideLoading();
              });
          } else {
            this.showLoading();

            editH5Type(form)
              .then((res) => {
                this.message("编辑案例分类成功");
                this.$refs["form"].resetFields();
                this.isVisible = false;
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
    setValue(name, val) {
      this.ruleForm[name] = val;
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 148px;
      height: 148px;
      line-height: 148px;
      text-align: center;
    }
    .avatar {
      width: 148px;
      height: 148px;
      display: block;
    }
  }
  .active {
    border-radius: 3px;
    margin: 5px;
    color: #fff;
    background-color: rgb(102, 177, 255);
  }
}
</style>
