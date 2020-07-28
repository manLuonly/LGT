<template>
  <div>
    <el-dialog
      :visible.sync="isVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      @close="closeDialog"
      center
    >
      <el-tabs v-model="activeName" type="border-card" @tab-click="tabsClick">
        <el-tab-pane label="上传图片" name="img">
          <el-input
            v-model="enterImgName"
            @keyup.native="btKeyUp"
            placeholder="请输入图片名"
            clearable
            maxlength="40"
            show-word-limit
            style="margin-bottom:15px"
          ></el-input>
          <el-upload
            :action="action"
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="imgBeforeUpload"
            :http-request="uploadSectionFile"
            list-type="picture-card"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传图片，且不超过20MB</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="上传文件" name="file">
          <el-input
            v-model="enterFileName"
            @keyup.native="btKeyUp"
            placeholder="请输入文件名"
            clearable
            maxlength="40"
            show-word-limit
            style="margin-bottom:15px"
          ></el-input>
          <el-upload
            class="upload-demo"
            drag
            :action="action"
            multiple
            :before-upload="fileBeforeUpload"
            :http-request="uploadSectionFile"
            :limit="1"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传文件，且不超过20MB</div>
          </el-upload>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFile">提 交</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { add, edit } from "@/api/orderDetails";

export default {
  name: "uploadFileDialog",
  data() {
    return {
      isVisible: this.isShow,
      activeName: "img",
      imageUrl: "",
      action: "/uploadCaseLists/add",
      files: "", // 二进制文件
      fileName: "", // 选中文件的名字
      enterImgName: "", // 输入的图片名
      enterFileName: "", // 输入的文件名
    };
  },
  props: {
    isShow: Boolean,
    default: () => {},
  },
  computed: {
    ...mapGetters(["status"]),
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs["form"].resetFields();
    // });
  },
  methods: {
    // 图片上传限制
    imgBeforeUpload(file) {
      this.files = file;
      const isImg = file.type === "image/jpeg" || file.type === "image/png";
      const isLt20M = file.size / 1024 / 1024 < 20;

      if (!isImg) {
        this.$message.error("上传头像图片只能是图片格式!");
      }
      if (!isLt20M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      this.fileName = file.name;
      return isImg && isLt20M;
    },
    // 文件上传限制
    fileBeforeUpload(file) {
      this.files = file;
    },
    // 关闭dialog
    closeDialog() {
      this.$emit("closeDialog");
    },
    // tabs点击
    tabsClick() {
      if (this.activeName == "file") {
        this.imageUrl = "";
        this.enterImgName = "";
      } else {
        this.enterFileName = "";
      }
    },
    // 保存formdata
    uploadSectionFile() {
      this.toUrl(this.files);
    },
    // 确定上传文件
    submitFile() {
      let type = this.files.type;
      if (type == "image/jpeg" || type == "image/png") {
        type = 1;
      } else {
        type = 2;
      }

      let name = this.enterImgName ? this.enterImgName : this.enterFileName;

      let fileFormData = new FormData();
      fileFormData.append("file", this.files); // 文件
      fileFormData.append("name", name); // 文件名
      fileFormData.append("type", type); // 文件类型 (1为文件 / 2为单图片)
      let requestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.$axios
        .post(`/uploadCaseLists/add`, fileFormData, requestConfig)
        .then((res) => {
          if (res.data.code === 0) {
            this.message("上传成功");
            this.isVisible = false;
            this.$emit("getCaseList");
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 禁止输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(
        /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
        ""
      );
    },
    // 二进制文件转为base64
    toUrl(File) {
      //创建对象读取文件
      var reader = new FileReader();
      reader.readAsDataURL(File);
      //readAsDataURL函数读取数据触发的回调
      reader.onload = (e) => {
        // e.target.result就是该文件的完整Base64 Data-URI
        this.imageUrl = e.target.result;
      };
    },
  },
};
</script>

<style lang='less' scoped>
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
</style>