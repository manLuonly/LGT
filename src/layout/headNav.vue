<template>
  <header class="head-nav rflex" :style="{'width':headNavWidth+'px'}" id="header_container">
    <div class="right-nav" ref="rightNav">
      <top-menu></top-menu>
      <div class="userinfo-right rflex">
        <div class="notify-row"></div>
        <div class="userinfo">
          <el-menu class="el-menu-demo" mode="horizontal">
            <div class="welcome">
              <span class="name">你好,</span>
              <span class="name avatarname">{{ trueName }}</span>
            </div>
            <img :src="avatar" class="avatar" alt />
          </el-menu>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import * as mUtils from "@/utils/mUtils";
import { setToken, getToken } from "@/utils/auth";
import store from "@/store";
import topMenu from "./topMenu";
import wechatImg from "@/assets/img/wechat.jpg";
import qqImg from "@/assets/img/qq.png";
import logoImg from "@/assets/img/logo.png";
import chinaImg from "@/assets/img/china.svg";
import americaImg from "@/assets/img/america.svg";
import { github } from "@/utils/env";

export default {
  name: "head-nav",
  data() {
    return {
      logo: logoImg,
      langLogo: getToken("langLogo") || americaImg,
      chinaImg: chinaImg,
      americaImg: americaImg,
      menu: {
        userBgcolor: "#f0f2f5"
      },
      trueName: "卢广宗"
    };
  },
  components: {
    topMenu
  },
  computed: {
    ...mapGetters(["name", "avatar", "sidebar"]),
    headNavWidth() {
      return document.body.clientWidth - this.sidebar.width;
    }
  },
  created() {},
  mounted() {},
  methods: {
    showWechat() {
      this.wechat.isWechat = true;
    },
    hideWechat() {
      this.wechat.isWechat = false;
    },
    showQq() {
      this.qq.isQq = true;
    },
    hideQq() {
      this.qq.isQq = false;
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    }
  }
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
