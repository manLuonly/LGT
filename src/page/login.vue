<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="titleArea rflex">
          <img class="logo" src="../assets/img/logo.png" alt="智能桂联后台管理" />
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
          <el-form-item prop="user" class="login-item">
            <span class="loginTips">
              <icon-svg icon-class="icon-user" />
            </span>
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              type="text"
              placeholder="用户名"
              v-model="loginForm.user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <span class="loginTips">
              <icon-svg icon-class="iconLock" />
            </span>
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
          </el-form-item>
          <div class="sanFangArea">
            <p class="title">第三方账号登录</p>
            <ul class="rflex">
              <li @click="loginByWechat">
                <icon-svg icon-class="iconwechat" />
              </li>
              <li>
                <icon-svg icon-class="iconweibo" />
              </li>
              <li>
                <icon-svg icon-class="iconGithub" />
              </li>
            </ul>
          </div>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>

import { login } from "@/api/user";
import { setToken,setName,setAvatar } from "@/utils/auth";

export default {
  data() {
    return {
      loginForm: {
        user: "",
        password: ""
      },
      rules: {
        user: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    loginByWechat() {},
    showMessage(type, message) {
      this.$message({
        type: type,
        message: message
      });
    },
    submitForm(loginForm) {
      // setToken("Token", 'YGF-xiao-sb');
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          this.loginForm.password = this.$md5(this.loginForm.password);
          let userinfo = this.loginForm;
          login(userinfo)
            .then(res => {
              if (res.code === 0) {
                setToken("Token", res.success);
                setName('name',res.user_name);
                setAvatar('Avatar',res.head);
                setTimeout(() => {
                  this.$router.push({ path: "/" });
                  this.$store.dispatch("initLeftMenu"); //设置左边菜单始终为展开状态
                }, 1500);
              } else {
                this.loginForm.password = "";
              }
            })
            .catch(err => {
              if (err) this.loginForm.password = "";
              this.showMessage("error", "登录失败,请重新登录");
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_page {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../assets/img/bg9.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_contianer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 370px;
  border-radius: 5px;
  padding: 25px;
  text-align: center;
  .titleArea {
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 22px;
    width: 100%;
    padding-bottom: 20px;
    .logo {
      width: 60px;
      margin-right: 10px;
    }
    .title {
      i {
        color: #ff6c60;
      }
    }
  }

  .loginForm {
    .submit_btn {
      width: 100%;
      padding: 13px 0;
      font-size: 16px;
    }
    .loginTips {
      position: absolute;
      left: 10px;
      z-index: 20;
      // color: #FF7C1A;
      font-size: 18px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.manage_tip {
  margin-bottom: 20px;
  .title {
    font-family: cursive;
    font-weight: bold;
    font-size: 26px;
    color: #fff;
  }
  .logo {
    width: 60px;
    height: 60px;
  }
}

.tiparea {
  text-align: left;
  font-size: 12px;
  color: #4cbb15;
  padding: 10px 0;
  .tip {
    margin-left: 54px;
  }
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
.loginForm {
  .el-button--primary {
    // background-color: #ff7c1a;
    // border: 1px solid #ff7c1a;
  }
}
.sanFangArea {
  border-top: 1px solid #dcdfe6;
  padding: 10px 0;
  display: none;
  .title {
    font-size: 14px;
    color: #8b9196;
    margin-bottom: 10px;
  }
  ul {
    li {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .svg-icon {
        font-size: 24px;
      }
    }
  }
}
</style>
