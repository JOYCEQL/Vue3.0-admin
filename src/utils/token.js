/*
 * @Author: yuguangzhou
 * @Date: 2021-04-20 16:07:56
 * @LastEditTime: 2021-04-22 11:31:19
 * @LastEditors: yuguangzhou
 * @Description:token方法
 */
export function getToken(key) {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    return value;
  }
}
export function setToken(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeToken(key) {
  window.localStorage.removeItem(key)
}