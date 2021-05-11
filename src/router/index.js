/*
 * @Author: yuguangzhou
 * @Date: 2021-04-19 15:41:39
 * @LastEditTime: 2021-05-10 16:27:12
 * @LastEditors: yuguangzhou
 * @Description: 路由配置
 */
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Swiper from "../views/Homesetting/Swiper.vue";
import Chart from "../views/Homesetting/Chart.vue";
import Dashboard from "../views/layout/Dashboard.vue"
import Video from "../views/Video.vue"
import Editor from "../views/Editor.vue"
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, RobotOutlined, SettingFilled,SettingOutlined,CloseOutlined, LineHeightOutlined } from "@ant-design/icons-vue";
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration
import { getToken } from "../utils/token";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: '/introduce',
      component: Home,
      meta:{
        title:'首页'
      },
      children: [
        {
          path: "introduce",
          name: "Introduce",
          meta: {
            title: '系统介绍',
            icon:"iconfont icon-dashboard",
          },
          component: Dashboard,
        },
      ]
    },
    {
      path: '/homeset',
      name: 'Homeset',
      component: Home,
      meta: {
        title: '首页配置',
        icon:'iconfont icon-home'
      },
      redirect: '/homeset/swiper',
      children: [
        {
          path: "swiper",
          name: "Swiper",
          meta: {
            title: '轮播图配置'
          },
          component: Swiper,
        },
        {
          path: "chart",
          name: "Chart",
          meta: {
            title: '可视化面板'
          },
          component: Chart
        }
      ]
    },
    
    // {
    //   path: '/swiper',
    //   name: 'Swiper',
    //   component: Swiper
    // },
    {
      path: "/video",
      name: "Video",
      meta:{
        title:'首页'
      },
      component: Home,
      redirect: '/video/index',
      children: [
        {
          path: "index",
          meta: {
            title: '视频播放器',
            icon:"iconfont icon-video",
          },
          component: Video,
        },
      ]
    },
    {
      path: "/editor",
      name: "Editor",
      meta:{
        title:'首页'
      },
      component: Home,
      redirect: '/editor/index',
      children: [
        {
          path: "index",
          meta: {
            title: '富文本编辑器',
            icon:"iconfont icon-edit",
          },
          component: Editor,
        },
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});
// 前置路由守卫
router.beforeEach((to, from, next) => {
  document.title = "vite app"
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path === "/login" || getToken('token')) {
    next();
    NProgress.down();
  } else {
    next({
      path: "/login"
    });
    NProgress.down();
  }
});
// 后置路由守卫
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

export default router;
