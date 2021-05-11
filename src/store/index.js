/*
 * @Author: yuguangzhou
 * @Date: 2021-04-21 14:18:21
 * @LastEditTime: 2021-04-27 11:36:05
 * @LastEditors: yuguangzhou
 * @Description: vuex
 */
import { createStore, Store } from "vuex";

const store = createStore({
  state: {
    token: "",
    dark:false
  },
});
export default store;
