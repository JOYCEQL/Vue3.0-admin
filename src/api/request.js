/*
 * @Author: yuguangzhou
 * @Date: 2021-04-20 14:06:15
 * @LastEditTime: 2021-04-25 13:55:58
 * @LastEditors: yuguangzhou
 * @Description:axios二次封装
 */
import axios from "axios";
import router from "@/router/index"
import config from "~/config"
import store from "@/store/index"
import {getToken}  from "@/utils/token"
import { message } from 'ant-design-vue';
const service = axios.create({
  baseURL: config[import.meta.env.MODE].baseUrl, // url = base url + request url
  timeout: 5000 // request timeout
})
// axios.defaults.baseURL = config[import.meta.env.MODE].baseURL;
// console.log(config[import.meta.env.MODE]);
// axios.defaults.headers["token"] = localStorage.getItem("token") || "";
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器
service.interceptors.request.use(config=>{
  // 取于store
    // const token =store.state.token
    const token =getToken('token')
    token&&(config.headers.token =token)
    return config
  },
  error=>Promise.error(error)
  )

// 响应拦截器
service.interceptors.response.use(res => {
  if (typeof res.data !== "object") {
    message.error("服务端异常！");
    return Promise.reject(res);
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) message.error(res.data.message);
    if (res.data.resultCode == 419) {
      router.push({ path: "/login" });
    }
    return Promise.reject(res.data);
  }
  return res.data.data;
});
export default service;
