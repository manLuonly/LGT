<template>
   <div class="menu_left cflex" :style="{width:sidebar.width+'px'}">
        <div class="menu_page_top rflex">
            <div class="logo">
                <img  src="~@/assets/img/logo.png">
            </div>
            <span class='title' v-show="sidebar.opened">智能桂联后台管理</span>
        </div>
        <div class="menu_page_bottom is-scroll-left">
            <el-menu 
                mode="vertical"
                theme="dark" 
                :show-timeout="200"
                :default-active="$route.path" 
                :collapse="isCollapse"
                :background-color="menuObj.bgColor"
                :text-color="menuObj.textColor"
                :active-text-color="menuObj.activeTextColor"
                :style="{width:sidebar.width+'px'}"
                >
                    <template v-for="(item,index) in permission_routers">
                        <!--表示 有一级菜单-->
                        <router-link v-if="!item.hidden && item.noDropdown" :to="item.path+'/'+item.children[0].path" :key="index">
                            <el-menu-item class="dropItem" 
                                :index="item.path+'/'+item.children[0].path"
                                >
                                <icon-svg v-if="item.meta.icon" :icon-class="item.meta.icon" class="submenu-item_icon"/>
                                <span v-if="item.meta.title" slot="title" class="submenu-item_name">{{ $t(`commons.${item.name}`)}}</span> 
                            </el-menu-item>
                        </router-link>

                        <!--表示 有二级或者多级菜单 -->
                        <el-submenu v-if="item.children  && item.children.length >= 1 && !item.hidden && !item.noDropdown"  :index="item.path" :key="index">
                            <template slot="title">
                                <icon-svg v-if="item.meta.icon" :icon-class="item.meta.icon" class="submenu-item_icon"/>
                                <span v-if="item.meta.title" slot="title" class="submenu-item_name">{{ $t(`commons.${item.name}`)}}</span>
                            </template>
                            <!--直接定位到子路由上，子路由也可以实现导航功能-->
                            <router-link v-for="(citem,cindex) in item.children" :to="getIindex(citem,item,cindex)"  :key="cindex">
                                <el-menu-item 
                                    v-if="citem.meta.routerType != 'topmenu' && citem.meta.title"
                                    :index="getIindex(citem,item,cindex)">
                                    <span slot="title"> {{ $t(`commons.${citem.name}`)}}</span>
                                </el-menu-item> 
                            </router-link>
                        </el-submenu>
                    </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as mUtils from "@/utils/mUtils";

export default {
  name: "left-Menu",
  data() {
    return {
       menuObj:{
         bgColor:'#304155',
         textColor:'#fff',
         activeTextColor:'#3D92E5',
       },
    };
  },
  computed:{
      ...mapGetters([
        'permission_routers',
        'isCollapse',
        'sidebar',
        'menuIndex'
      ]),
  },
  created(){
  },
  mounted(){
  },
  methods: {
    getIindex(citem,item,cindex){
      return (citem.meta.titleList)?item.path+'/'+citem.path+'/'+citem.meta.titleList[0].path:item.path+'/'+citem.path;
    }
  }
};
</script>


<style lang="less" scoped>
  @left-bgColor:#fff;  // 左侧菜单背景颜色;
  @icon-link:#FF6C60;
    .menu_left{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
    }
    .menu_page_top{
        width:100%;
        height: 60px;
        align-items: center;
        justify-content: space-around;
        text-transform: uppercase;
        box-sizing: border-box;
        box-shadow:0px 2px 5px 0px rgba(230,224,224,0.5);
        .logo {
            height: 20px;
            width: 65px;
            
            img {
                width: 100%;
                height: 100%;
            }
        }
        .title{
            font-size: 14px;
            i{
                color:#FF6C60;
            }
        }
    }
    .menu_page_bottom {
        width:100%;
        overflow-y: scroll;
        overflow-x: hidden;
        flex:1;
        margin-top:3px;
        z-index: 10;
        box-shadow: 0 0 10px 0 rgba(230, 224, 224, 0.5);
        .submenu-item_icon {
            margin-left: 10px;
        }
        .submenu-item_name {
            margin-left: 14px;
        }
    }
</style>
