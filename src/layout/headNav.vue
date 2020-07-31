<template>
  <header class="head-nav rflex" :style="{'width':headNavWidth+'px'}" id="header_container">
    <div class="right-nav" ref="rightNav">
      <top-menu></top-menu>
      <div class="userinfo-right rflex">
        <div class="notify-row"></div>
        <div class="userinfo">
          <el-menu mode="horizontal">
            <div class="welcome">
              <span class="name">你好,</span>
              <span class="name avatarname">{{ trueName }}</span>
            </div>
            <el-dropdown>
              <img
                src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1582757028,805496526&fm=26&gp=0.jpg"
                class="avatar"
              />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="getParameter('updatePwd')">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
              <i class="el-icon-switch-button loginout_icon" @click="logout"></i>
            </el-tooltip>
          </el-menu>
        </div>
      </div>
    </div>

    <el-dialog
      title="修改密码"
      :visible.sync="updatePwd"
      @close="resetForm('ruleForm')"
      width="40%"
      append-to-body
      center
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
        class="updatePwd-ruleForm"
      >
        <el-form-item label="密码" prop="pass">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col>
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col>
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </span>
    </el-dialog>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import {
  removeToken,
  removeName,
  removeAvatar,
  getName,
  getAvatar,
} from "@/utils/auth";
import store from "@/store";
import topMenu from "./topMenu";
import { logout } from "@/api/user";
import router from "../router";

export default {
  name: "head-nav",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      menu: {
        userBgcolor: "#f0f2f5",
      },
      trueName: "卢广宗",
      avatar: "",
      updatePwd: false,
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  components: {
    topMenu,
  },
  computed: {
    ...mapGetters(["sidebar"]),
    headNavWidth() {
      return document.body.clientWidth - this.sidebar.width;
    },
  },
  created() {},
  mounted() {
    this.trueName = getName("name") ? getName("name") : '管理员';
    this.avatar = getAvatar("Avatar");
  },
  methods: {
    // 退出登录
    logout() {
      logout()
        .then((res) => {
          removeToken();
          removeName();
          removeAvatar();
          this.$router.push({ path: "/login" });
          window.location.reload();
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    // 修改密码
    getParameter(val) {
      switch (val) {
        case "updatePwd":
          this.updatePwd = true;
          break;
        default:
          break;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
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
  },
};
</script>

<style scoped lang='less'>
.right-nav {
  display: flex;
  flex: 1;
  width: calc(100% - 180px);
  padding-right: 15px;
  justify-content: space-between;
  box-shadow: 0px 2px 5px 0px rgba(237, 233, 233, 0.5);
}
.head-nav {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 29;
  width: calc(100% - 180px);
  transition: width 0.2s;
  justify-content: space-between;
  height: 60px;
  box-sizing: border-box;
  background: #fff;
  .logout {
    vertical-align: middle;
    cursor: pointer;
  }
}
.middle {
  align-items: center;
  border: 1px solid;
}
.userinfo-right {
  width: 320px;
  padding: 0 10px;
  justify-content: space-between;
}
.userinfo {
  line-height: 60px;
  text-align: right;
  .loginout_icon {
    padding: 10px 0;
    margin-left: 10px;
    cursor: pointer;
  }
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.langAvatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  vertical-align: middle;
  padding: 0 5px;
  .name {
    line-height: 20px;
    text-align: center;
    font-size: 12px;
  }
  .avatarname {
    color: #a9d86e;
    font-weight: bolder;
    font-size: 13px;
  }
}

.username {
  cursor: pointer;
  margin-right: 5px;
}
.border {
  border: 1px solid;
}
.notify-row {
  line-height: 60px;
  flex: 1;
  ul {
    display: flex;
    justify-content: space-around;
  }
}
</style>
