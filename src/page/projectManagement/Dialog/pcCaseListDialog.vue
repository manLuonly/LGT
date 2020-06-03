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
              :key="item.type"
              :label="item.type_name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item prop="jumpAddress" label="上级分类">
          <span
            v-for="(item,index) in ClassificationStatusItems"
            :key="index"
            @click="getClassificationStatus(index)"
            :class="{active:index===staticNumber}"
          >{{ item.name }}</span>
          <el-input v-model="ruleForm.jumpAddress" :disabled="isCanSelectAddress"></el-input>
        </el-form-item>-->

        <el-form-item prop="type_name" label="案例名称">
          <el-input v-model="ruleForm.type_name"></el-input>
        </el-form-item>

        <el-form-item prop="accoutCash" label="案例图">
          <el-upload
            class="avatar-uploader"
            action="http://beta.fang.ekeae.com/wx/uploadImageOne"
            :show-file-list="false"
            :on-success="successImg"
            :before-upload="beforeUploadImg"
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
            :on-preview="handlePictureCardPreview"
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
import { caseList } from "@/api/projectManagement";

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
      staticNumber: 0,
      ClassificationStatusItems: [
        {
          name: "默认"
        },
        {
          name: "自定义"
        }
      ],
      isCanSelectAddress: true,
      dialogImageUrl: "",
      dialogVisible: false,
      file: "",
      fileName: ""
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
    if (this.dialogRow.title === "添加网站案例") {
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
          this.caseOptions = res.data.map(i => i) || [];
        }
      });
    },

    successImg(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeUploadImg(file) {
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

    //表单提交
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const form = this.ruleForm;
          form.pid = this.systemType; // 获取系统类型
          delete form.title;
          console.log(form, "form");
          if (this.dialogRow.title === "添加网站案例") {
            this.ruleForm.opr = "add";
            this.showLoading();

            let fileFormData = new FormData();
            // fileFormData.append("file", this.file, this.fileName);
            let requestConfig = {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            };
            
            // this.$axios.post(
            //   `zngl/caseList?form=${ form} }`,
            //   fileFormData,
            //   requestConfig
            // ).then(res => {
            //   console.log(res,'ressssss');
              
            // })
            caseList(form, fileFormData, requestConfig).then(res => {
              this.message("新增案例列表成功");
              this.hideLoading();
              this.$refs["form"].resetFields();
              this.isVisible = false;
              this.$emit("getCaseList");
            });
          } else {
            this.ruleForm.opr = "update";
            this.showLoading();
            // caseList(form).then(res => {
            //   this.message("修改案例列表成功");
            //   this.hideLoading();
            //   this.$refs["form"].resetFields();
            //   this.isVisible = false;
            //   this.$emit("getCaseList");
            // });
          }
        }
      });
    },
    // 地址是否自定义
    getClassificationStatus(index) {
      this.staticNumber = index;
      if (index === 1) {
        this.isCanSelectAddress = false;
      } else {
        this.isCanSelectAddress = true;
      }
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
      let loading = this.showLoading();
      loading.close();
    },
    sendImg(form) {
      this.$axios.post(
        `http://192.168.31.50:80/zngl/caseList?form=${form}`,
        fileFormData,
        requestConfig
      );
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
