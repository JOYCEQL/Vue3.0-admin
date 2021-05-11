/*
 * @Author: yuguangzhou
 * @Date: 2021-04-21 14:46:26
 * @LastEditTime: 2021-04-22 11:54:03
 * @LastEditors: yuguangzhou
 * @Description: 登陆,个人信息相关接口
 */
import service from "./request"

// 登录
export function loginAjax(data) {
  return service({
    url: '/adminUser/login',
    method: 'post',
    data
  })
}

// 获取用户认证信息
export function getUserInfoAjax() {
  return service({
    url: '/adminUser/profile',
    method: 'get',
  })
}


// 退出登录
export function logoutAjax() {
  return service({
    url: '/logout',
    method: 'delete',
  })
}