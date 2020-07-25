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

        <el-form-item prop="name" label="案例名称">
          <el-input
            v-model="ruleForm.name"
            maxlength="30"
            show-word-limit
            clearable
            v-clearSpecial:[ruleForm.name]="{set:setValue, setName:'name'}"
          ></el-input>
        </el-form-item>

        <el-form-item label="案例图">
          <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="successImg"
            :before-upload="beforeUploadImg"
            accept=".jpg, .jpeg, .png, .JPG, .JPEG"
            :limit="1"
          >
            <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="案例详情图">
          <el-upload
            :file-list="ruleForm.details_imgs"
            :action="action"
            list-type="picture-card"
            :show-file-list="true"
            :before-upload="beforeUploadImg"
            :on-success="uploadSuccess"
            :on-remove="removeImg"
            :on-preview="handlePictureCardPreview"
            :limit="9"
            multiple
            accept=".jpg, .jpeg, .png, .JPG, .JPEG"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" />
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
import { listAll } from "@/api/caseType";
import { addH5TypeList, editH5TypeList } from "@/api/projectManagement";

export default {
  name: "caseListDialog",
  data() {
    return {
      isVisible: this.isShow,
      ruleForm: {
        enable: true,
        type: "",
        name: "",
        img: "",
        details_imgs: [],
      },
      form_rules: {
        type: [{ required: true, message: "分类不能为空", trigger: "change" }],
        type_name: [
          { required: true, message: "案例名称不能为空", trigger: "blur" },
        ],
      },
      //详情弹框信息
      dialog: {
        width: "400px",
        formLabelWidth: "120px",
      },
      caseOptions: [],
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      action: "https://imgkr.com/api/v2/files/upload",
      type: "",
    };
  },
  props: {
    isShow: Boolean,
    dialogRow: Object,
    default: () => {},
  },
  components: {
    ...mapGetters(["systemType"]),
  },
  mounted() {
    this.type = this.$store.state.user.status;
    if (this.type === "add") {
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    } else {
      this.ruleForm = this.dialogRow;
      this.setObj();
    }
    this.getCaseTypeList();
  },
  methods: {
    // 数组字符串改为数组对象
    setObj() {
      let arr = [];
      this.ruleForm.details_imgs.map((item) => {
        item = { url: item };
        arr.push(item);
      });
      this.ruleForm.details_imgs = arr;
      this.fileList = this.ruleForm.details_imgs; // 详情图赋值
    },
    // 获取案例列表
    getCaseTypeList() {
      let systemType = this.$store.state.user.systemType;
      let type = { system_type: systemType };
      listAll(type).then((res) => {
        this.caseOptions = res.data.map((i) => i) || [];
      });
    },
    // 限制上传类型为图片
    beforeUploadImg(file) {
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
    // 封面图上传图片
    successImg(res, file) {
      this.ruleForm.img = res.data;
    },
    // 详情图上传成功
    uploadSuccess(res, file, fileList) {
      this.fileList = fileList;
    },
    // 移除图片
    removeImg(file, fileList) {
      this.fileList = fileList;
      this.getDetailsImgs();
    },
    // 获取案例详情图
    getDetailsImgs() {
      let details_imgs = [];
      this.fileList.map((item) => {
        let data = item.response ? item.response.data : item.url;
        details_imgs.push(data);
      });

      this.ruleForm.details_imgs = details_imgs;
      this.ruleForm.details_total = details_imgs.length;
    },

    //表单提交
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let form = this.ruleForm;

          this.getDetailsImgs();

          if (this.type === "add") {
            this.showLoading();

            addH5TypeList(form)
              .then((res) => {
                this.message("新增案例列表成功");
                this.$refs["form"].resetFields();
                this.isVisible = false;
                this.$emit("getCaseList");
              })
              .finally(() => {
                this.hideLoading();
              });
          } else {
            this.showLoading();

            editH5TypeList(form)
              .then((res) => {
                this.message("修改案例列表成功");
                this.hideLoading();
                this.$refs["form"].resetFields();
                this.isVisible = false;
                this.$emit("getCaseList");
              })
              .finally(() => {
                this.hideLoading();
              });
          }
        }
      });
    },
    // 详情图放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
