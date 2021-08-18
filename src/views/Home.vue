<!--
 * @Author: yuguangzhou
 * @Date: 2021-04-19 15:02:41
 * @LastEditTime: 2021-05-22 11:32:35
 * @LastEditors: yuguangzhou
 * @Description: 
-->
<template>
  <div class="home">
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible breakpoint="lg">
        <div class="logo">
          <img style="height: 100%; display: inline-block" src="../assets/image/logo.svg" alt="" />
          <h3 style="display: inline; color: #fff" v-if="!collapsed">Vue3.0-admin</h3>
        </div>
        <a-menu theme="dark" mode="inline" :inline-collapsed="collapsed" v-model:selectedKeys="selectedKeys" @click="handleRoute">
          <template v-for="item in routes">
          <a-menu-item v-if="item.children&&item.children.length==1" :key="item.redirect">
            <span :class="item.children[0].meta['icon']" style="margin-right:5px"></span>
            <span v-show="!collapsed">{{item.children[0].meta['title']}}</span>
          </a-menu-item>
          <a-sub-menu v-if="item.children&&item.children.length>1" :key="item.path">
              <template #title>
                  <span>
                      <span :class="item.meta['icon']" style="margin-right:5px"></span>
                      <span v-show="!collapsed">{{item.meta['title']}}</span>
                  </span>
              </template>
              <a-menu-item v-for="sub in item.children"  :key="item.path+'/'+sub.path">{{sub.meta['title']}}</a-menu-item>
          </a-sub-menu>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="padding: 0;background-color: #fff">
          <menu-unfold-outlined v-if="collapsed"   class="trigger" @click="() => (collapsed = !collapsed)" />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          <a-breadcrumb style="display: inline-block;">
            <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name" >
              <router-link   v-if="item.name != name && index != 1" :to="{ path: item.path === '' ? '/' : item.path }">{{ item.meta.title }}</router-link>
              <span v-else>{{ item.meta.title }}</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
          <div class="right-menu">
            <a-popover trigger="click">
              <template #content>
                <div style="width: 200px">
                  <p>
                    <span>用户名：{{ userInfo && userInfo.loginUserName }}</span>
                    <a-button type="danger" @click="logout" style="float: right" size="small">退出</a-button>
                  </p>
                  <p>昵称：{{ userInfo && userInfo.nickName }}</p>
                </div>
              </template>
              <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link" @click.prevent>
                  <img src="../assets/image/avatar.jpg" alt="" />
                  <DownOutlined />
                </a>
              </a-dropdown>
            </a-popover>
          </div>
        </a-layout-header>
        <!-- tab页签 -->
        <div class="tabs">
          <a-tabs hide-add  size="small" v-model:activeKey="activeKey" :tabBarGutter="3" type="editable-card" :animated="true"  @edit="onEdit" @change="handleTabChange">
        <a-tab-pane   v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
              </a-tab-pane>
          </a-tabs>
        </div>
        <!-- 主体内容 -->
        <a-layout-content style="padding: 24px; overflow-y: auto;">
          <transition>
        <router-view v-slot="{ Component }">
            <transition
            :duration="300"
             mode="out-in" enter-active-class="animated animate fadeOutRightBig" 
             leave-active-class="animated fadeOutLeftBig"
              >
              <component :is="Component" />
            </transition>
          </router-view>
          </transition>
        </a-layout-content>
        <!-- 底部 -->
        <a-layout-footer style="text-align: center"> Vue3.0-admin ©2021 Created by 四月清晨 </a-layout-footer>
      </a-layout>
    </a-layout>
    <!-- 设置 -->
      <right-panel :showPanel="showPanel" @showSetting="openOrClose"></right-panel>
  </div>
</template>
<script>
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, RobotOutlined, SettingFilled,SettingOutlined,CloseOutlined, LineHeightOutlined } from "@ant-design/icons-vue";
import { ref, defineComponent, onMounted, reactive, toRefs, computed, watch, toRef } from "vue";
import { logoutAjax, getUserInfoAjax } from "@/api/user";
import { removeToken } from "@/utils/token";
import {setLocalstorage,getLocalstorage,removeLocalstorage} from "@/utils/storage"
import { useRouter, useRoute } from "vue-router";
import RightPanel from "@/components/RightPanel.vue"
import { Divider } from "ant-design-vue/lib/vc-menu";
export default defineComponent({
  name: "Home",
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
    RobotOutlined,
    SettingFilled,
    SettingOutlined,
    CloseOutlined,
    RightPanel,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      showPanel:false,
      userInfo: null,
      collapsed: false,
      selectedKeys: [],
      routes: [],
      breadList: [],
      name: "",
      panes:[],
      activeKey:''
    });
    onMounted(async () => {
      state.breadList = [];
      const res = await getUserInfoAjax();
      state.userInfo = res;
      // 获取路由数组--
      state.routes = router.options.routes;
      changeBread();
      state.selectedKeys = ref([`${route.path}`]);
      getRoutesList()
    });
    // 获取路由数组-tabs页签
    const getRoutesList=()=>{
        if(getLocalstorage("tabInfo")){
          state.panes=getLocalstorage("tabInfo")
        }else{
            let obj={title:route.meta.title,key:route.fullPath,closable:false}
          state.panes.push(obj)
        }
          state.activeKey=route.path
    }
    const logout = () => {
      logoutAjax().then((res) => {
        removeToken("token");
        removeLocalstorage("tabInfo")
        router.push("/login");
      });
    };
    const showSetting=()=>{
      state.showPanel=!state.showPanel
    }
    const handleRoute = ({ key }) => {
      router.push(key);
    };
    watch(
      () => {
        return route.path;
      },
      (nextData, preData) => {
        changeBread();
        if(nextData!=='/login'){
          handleTabs(nextData,preData)
        }
      }
    );
    // tab页签栏切换
    const handleTabs=(newValue,oldVlaue)=>{
      state.activeKey=newValue
      state.selectedKeys=[newValue]
      if(newValue!=oldVlaue){
        for (let i = 0; i <  state.panes.length; i++) {
            if(state.panes[i].key==newValue){
             return
           }
        }
        let obj={title:route.meta.title,key:route.fullPath}
        state.panes.push(obj)
        setLocalstorage("tabInfo",state.panes)
      }
    }
    const changeBread = () => {
      state.name = route.name;
      state.breadList = [];
      route.matched.forEach((item) => {
        state.breadList.push(item);
      });
    };
    const openOrClose=(value)=>{
      console.log(value);
      state.showPanel=value
    }
    // tab页签相关--需要先遍历routes
    const onEdit=(targetKey, action)=>{
      console.log(action);
      if(action==='remove'){
        removeTabs(targetKey)
      }
    }
    // 移除页签
    const removeTabs=(key)=>{
      state.panes.forEach((item,index)=>{
          if(item.key==key){
            console.log(state.panes[index-1].key,3333);
              router.push(state.panes[index-1].key)
          }
      })
       state.panes=state.panes.filter(item=>{
          return item.key!=key
      })
      setLocalstorage("tabInfo",state.panes)
    }
    // 页签改变时回调
    const handleTabChange=(key)=>{
        state.selectedKeys = [key]
        router.push(key)
    }
    return {
      ...toRefs(state),
      logout,
      handleRoute,
      router,
      changeBread,
      openOrClose,
      onEdit,
      getRoutesList,
      handleTabs,
      removeTabs,
      handleTabChange,
    };
  },
});
</script>
<style scoped>
.home {
  height: 100%;
  position: relative;
}
.ant-layout {
  height: 100%;
}
.trigger {
  font-size: 18px;
  line-height: 48px;
  padding: 0 18px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
.logo {
  height: 50px;
  /* background: rgba(255, 255, 255, 0.3); */
  margin: 16px;
}

.site-layout .site-layout-background {
  /* background: #fff; */
}
.right-menu {
  float: right;
  margin-right: 20px;
}

.ant-dropdown-link img {
  width: 36px;
  height: 100%;
  border-radius: 4px;
}
.ant-layout-header{
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #ccc;
}   

.ant-tabs-card{
  height: 40px;
  line-height: 22px;
  background-color: #fff;
}
.ant-tabs-card /deep/ .ant-tabs-tab-active{
  background-color: #1890ff !important;
  color: #fff  !important;
}
.ant-tabs.ant-tabs-card /deep/  .ant-tabs-card-bar .ant-tabs-tab .ant-tabs-close-x{
  /* color: #fff; */
}
</style>
