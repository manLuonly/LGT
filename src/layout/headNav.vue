<template>
  <header class="head-nav rflex" :style="{'width':headNavWidth+'px'}" id="header_container">
    <div class="right-nav" ref="rightNav">
      <top-menu></top-menu>
      <div class="userinfo-right rflex">
        <div class="notify-row"></div>
        <div class="userinfo">
          <el-menu  mode="horizontal" >
            <div class="welcome">
              <span class="name">你好,</span>
              <span class="name avatarname">{{ trueName }}</span>
            </div>
            <img :src="avatar" class="avatar" alt />
            <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
              <i class="el-icon-switch-button loginout_icon" @click="logout"></i>
            </el-tooltip>
          </el-menu>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { removeToken,removeName,removeAvatar,getName,getAvatar } from "@/utils/auth";
import store from "@/store";
import topMenu from "./topMenu";
import { logout } from "@/api/user";
import router from '../router'

export default {
  name: "head-nav",
  data() {
    return {
      menu: {
        userBgcolor: "#f0f2f5"
      },
      trueName: "卢广宗",
      avatar: ""
    };
  },
  components: {
    topMenu
  },
  computed: {
    ...mapGetters([ "sidebar"]),
    headNavWidth() {
      return document.body.clientWidth - this.sidebar.width;
    }
  },
  created() {},
  mounted() {
   this.trueName = getName('name');
   this.avatar = getAvatar('Avatar');
  },
  methods: {
    logout() {
      logout().then(res => {
        if (res.code === 0) {
          removeToken()
          removeName()
          removeAvatar()
          this.$router.push({ path: "/login" });
          window.location.reload();
        }
      }).catch(err => {
        console.log(err,'err')
      })
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
