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
        class="case-list-dialog"
      >
        <el-form-item label="启停">
          <el-switch v-model="ruleForm.enable" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>

        <el-form-item prop="type" label="分类">
          <el-select v-model="ruleForm.type" placeholder="请选择分类级别">
            <el-option
              v-for="item in caseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="type_name" label="案例名称">
          <el-input v-model="ruleForm.type_name"></el-input>
        </el-form-item>

        <el-form-item label="案例图">
          <el-upload
            class="avatar-uploader"
            action="http://beta.fang.ekeae.com/wx/uploadImageOne"
            :show-file-list="false"
            :on-success="successImg"
            :before-upload="beforeUploadIcon"
            accept=".jpg, .jpeg, .png, .JPG, .JPEG"
            :limit="1"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="案例详情图">
          <el-upload
            action="http://beta.fang.ekeae.com/wx/uploadImageOne"
            list-type="picture-card"
            :show-file-list="true"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeUploadImg"
            :on-success="uploadSuccess"
            :on-remove="removeImgList"
            :limit="9"
            multiple
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
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
import { getCaseType } from "@/api/caseType";

export default {
  name: "caseListDialog",
  data() {
    return {
      isVisible: this.isShow,
      ruleForm: {
        type_name: "",
        update_time: "",
        type: "",
        enable: true,
        suffix: "",
        directory: "",
        url: ""
      },
      form_rules: {
        type: [{ required: true, message: "分类不能为空", trigger: "change" }],
        type_name: [
          { required: true, message: "案例名称不能为空", trigger: "blur" }
        ]
      },
      startStop: true,
      imageUrl: "",
      //详情弹框信息
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      isClear: false,
      caseOptions: [],
      isCanSelectAddress: true,
      dialogImageUrl: "",
      dialogVisible: false,
      file: "",
      fileName: "",
      iconBase64: "",
      files: "",
      fileNames: "",
      fileList: []
    };
  },
  props: {
    isShow: Boolean,
    dialogRow: Object
  },
  components: {
    ...mapGetters(["systemType"])
  },
  computed: {},
  created() {},
  mounted() {
    this.imageUrl = this.noBaseUrlhandleSmImgUrl(
      this.dialogRow.type_name,
      this.dialogRow.suffix,
      this.dialogRow.directory
    );

    if (this.dialogRow.title === "添加小程序案例") {
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    } else {
      this.ruleForm = this.dialogRow;
    }
    this.getCaseTypeList();
  },
  methods: {
    getCaseTypeList() {
      const caseForm = {
        pid: this.systemType,
        pageNum: 1,
        pageSize: 20
      };
      getCaseType(caseForm).then(res => {
        if (res.code === 0) {
          this.caseOptions = res.data || [];
        }
      });
    },

    successImg(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeUploadIcon(file) {
      this.ruleForm.suffix = file.type.split("/")[1];
      this.file = file;
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
      this.fileName = file.name;
      return isImg && isLt5M;
    },

    beforeUploadImg(file) {
      this.files = file;
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
      this.fileNames = file.name;
      return isImg && isLt5M;
    },

    // 图片上传成功
    uploadSuccess(res, file, fileList) {
      this.fileList = fileList;
    },

    //表单提交
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const form = this.ruleForm;
          this.ruleForm.pid = "sm"; // 系统类型
          this.ruleForm.directory = `mg/${this.ruleForm.type}`; // 存放文件目录(app,logo...)

          console.log(form);
          if (this.dialogRow.title === "添加小程序案例") {
            this.showLoading();
            this.file
              ? this.iconToBase64(this.file)
              : (this.ruleForm.base64Case = "");

            this.fileList.map(item => {
              this.imageToBase64(item.raw);
            });

            caseList(form).then(res => {
              this.message("新增案例列表成功");
              this.hideLoading();
              this.$refs["form"].resetFields();
              this.isVisible = false;
              this.$emit("getCaseList");
            });
          } else {
            this.showLoading();
            caseList(para).then(res => {
              this.message("修改案例列表成功");
              this.hideLoading();
              this.$refs["form"].resetFields();
              this.isVisible = false;
              this.$emit("getCaseList");
            });
          }
        }
      });
    },

    removeImgList(file, fileList) {
      console.log(file, fileList);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 关闭dialog
    closeDialog() {
      this.$emit("closeDialog");
    },

    // 显示加载框
    showLoading() {
      const loading = this.$loading({
        lock: true,
        text: "上传中,请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      return loading;
    },

    // 隐藏加载框
    hideLoading() {
      let loading = this.show();
      loading.close();
    },

    // 案例图二进制转base64
    iconToBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // console.log("cion file 转 base64结果：" + reader.result);
        this.ruleForm.base64Case = reader.result.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },

    // 案例详情图二进制转base64
    imageToBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // console.log("img file 转 base64结果：" + reader.result);
        this.ruleForm.base64Details.push(
          reader.result.replace(/^data:image\/\w+;base64,/, "")
        );
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },

    // 拼接图片
    noBaseUrlhandleSmImgUrl(name, suffix, directory) {
      if (name && suffix && directory) {
        return `/zngl/fileOperate?name=${name}&suffix=${suffix}&directory=${directory}`;
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
  /deep/ .el-form {
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

    // 文本域高度
    .el-textarea__inner {
      height: 150px;
    }
  }
}
</style>
