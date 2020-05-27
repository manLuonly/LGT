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

        <el-form-item prop="classificationName" label="上级分类">
          <el-select v-model="ruleForm.classificationName" placeholder="请选择分类级别">
            <el-option
              v-for="item in caseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="jumpAddress" label="上级分类">
          <span
            v-for="(item,index) in ClassificationStatusItems"
            :key="index"
            @click="getClassificationStatus(index)"
            :class="{active:index===staticNumber}"
          >{{ item.name }}</span>
          <el-input v-model="ruleForm.jumpAddress" :disabled="isCanSelectAddress"></el-input>
        </el-form-item>

        <el-form-item prop="updateTime" label="案例名称">
          <el-input v-model="ruleForm.updateTime"></el-input>
        </el-form-item>

        <el-form-item prop="accoutCash" label="缩略图">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item prop="remarks" label="图文">
          <editor-bar v-model="ruleForm.remarks" :isClear="isClear"></editor-bar>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click='onSubmit("form")'>确 定</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { addMoney, updateMoney } from "@/api/money";
import editorBar from "../components/wangEditor";

export default {
  name: "addFundDialogs",
  data() {
    return {
      isVisible: this.isShow,
      ruleForm: {
        classificationName: "",
        jumpAddress: "www.baidu.com",
        updateTime: "",
        remarks: ""
      },
      form_rules: {
        jumpAddress: [
          { required: true, message: "跳转地址不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        remarks: [{ required: true, message: "备注不能为空", trigger: "blur" }]
      },
      startStop: true,
      imageUrl: "",
      //详情弹框信息
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      isClear: false,
      caseOptions: [
        {
          value: "LOGO设计",
          label: "LOGO设计"
        },
        {
          value: "小程序开发",
          label: "小程序开发"
        },
        {
          value: "APP开发",
          label: "APP开发"
        },
        {
          value: "包装设计",
          label: "包装设计"
        },
        {
          value: "画册设计",
          label: "画册设计"
        },
        {
          value: "网站开发",
          label: "网站开发"
        },
        {
          value: "品牌VI设计",
          label: "网站开发"
        }
      ],
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
  components: {
    editorBar
  },
  computed: {},
  created() {},
  mounted() {
    if (this.dialogRow.type === "添加案例列表") {
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    } else {
      this.ruleForm = this.dialogRow;
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.form {
  .active {
    border-radius: 3px;
    margin: 5px;
    color: #fff;
    background-color: rgb(102, 177, 255);
  }
}
</style>
