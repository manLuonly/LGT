<template>
  <div class="update-info">
    <div class="personal-info">
      <div class="avatar">
        <img src="../../assets/img/avatar-3.png" class="avatar-img" />
        <el-button type="primary" class="upload">上传</el-button>
      </div>
      <div class="info">
        <div class="name">
          <span>姓名:叶紫涵</span>
        </div>
        <div class="sex">
          <span>性别:女</span>
        </div>
        <div class="tel">
          <span>联系方式:13978805889</span>
        </div>
        <div class="mailbox">
          <span>邮箱:110@QQ.com</span>
        </div>
        <el-button type="primary" class="update-btn" @click="isShowForm = true">修改信息</el-button>
      </div>
    </div>
    <div class="form" v-show="isShowForm">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <div class="close-form-icon" @click="closeForm">
          <i class="el-icon-close"></i>
        </div>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男" value="man"></el-radio>
            <el-radio label="女" value="women"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model="ruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.mailbox"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "",

  data() {
    return {
      isShowForm: false,
      ruleForm: {
        name: "",
        sex: "",
        tel: "",
        mailbox: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        tel: [
          { required: true, message: "请输入您的手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度只能为11位", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closeForm() {
      this.isShowForm = false;
    }
  }
};
</script>

<style lang='less' scoped>
.update-info {
  .personal-info {
    display: inline-block;
    width: 400px;
    height: 200px;
    margin: 20px;
    background-color: #fff;
    .avatar {
      position: relative;
      display: inline-block;
      float: left;
      width: 30%;
      height: 90%;
      margin: 10px 15px;
      border: 1px solid #ccc;
      .avatar-img {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        width: 70%;
        border-radius: 50%;
        text-align: center;
      }
      .upload {
        position: absolute;
        left: 25%;
        top: 65%;
      }
    }
    .info {
      display: inline-block;
      float: right;
      width: 55%;
      height: 90%;
      margin: 10px;
      border: 1px solid #ccc;
      div {
        margin-left: 15px;
        margin-bottom: 10px;
        font-size: 12px;
      }
      .name {
        margin-top: 20px;
      }
      .update-btn {
        margin-left: 15px;
      }
    }
  }
  .form {
    position: relative;
    display: inline-block;
    width: 400px;
    padding: 20px;
    padding-right: 50px;
    background-color: #fff;
    .ruleForm {
      .close-form-icon {
        position: absolute;
        right: 10px;
        top: 5px;
        cursor: pointer;
      }
      /deep/ .el-form-item:last-child{
          .el-form-item__content {
              margin-left: 150px !important;
          }
      }
    }
  }
}
</style>