/*
 * @Author: yuguangzhou
 * @Date: 2021-04-19 14:34:50
 * @LastEditTime: 2021-08-13 10:05:08
 * @LastEditors: yuguangzhou
 * @Description:入口文件
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from '@/store/index'
import "./assets/css/main.css"
import * as echarts from 'echarts';
import './assets/iconfont/iconfont.css'

// 挂载到全局变量中
import { Button, Form, Input, Icon, Layout, Menu, Dropdown, Popover, Breadcrumb, Card, Row, Col, Table, Image, Modal, Upload, InputNumber, Spin,Switch,Drawer,Checkbox,Tabs,Space } from "ant-design-vue";
const app = createApp(App);
app.config.globalProperties.$echarts = echarts;
app.config.productionTip = false;
app.use(store)
app.use(router);
app.use(Button)
  .use(Form)
  .use(Input)
  .use(Icon)
  .use(Layout)
  .use(Menu)
  .use(Dropdown)
  .use(Popover)
  .use(Breadcrumb)
  .use(Card)
  .use(Row)
  .use(Col)
  .use(Table)
  .use(Image)
  .use(Modal)
  .use(Upload)
  .use(InputNumber)
  .use(Spin)
  .use(Switch)
  .use(Drawer)
  .use(Checkbox)
  .use(Tabs)
  .use(Space)
app.mount("#app");

