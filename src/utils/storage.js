/*
 * @Author: yuguangzhou
 * @Date: 2021-04-30 11:28:19
 * @LastEditTime: 2021-04-30 11:31:30
 * @LastEditors: yuguangzhou
 * @Description: 存储
 */
let setLocalstorage = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
}
  
let removeLocalstorage = (key) => {
    window.localStorage.removeItem(key)
}
let getLocalstorage = (key) => {
    const value = window.localStorage.getItem(key);
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (error) {
      return value;
    }
}
export {setLocalstorage,removeLocalstorage,getLocalstorage}