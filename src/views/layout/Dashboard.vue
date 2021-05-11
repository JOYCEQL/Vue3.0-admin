<!--
 * @Author: yuguangzhou
 * @Date: 2021-04-22 14:20:47
 * @LastEditTime: 2021-05-06 13:46:59
 * @LastEditors: yuguangzhou
 * @Description: 首页面板
-->
<template>
  <div class="dashboard">
    <a-row type="flex">
        <a-col  :span="7" v-for="item in cardList" :key="item.title" style="display: flex; justify-content: center;margin:10px">
        <a-card hoverable style="width: 220px" :bodyStyle="{ textAlign: 'center' }">
          <template #cover>
            <img alt="example" :src="item.imgSrc" style="width:100%"  />
          </template>
          <a-card-meta :title="item.title">
            <template #description>{{ item.desc }}</template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
    <!-- <a-row style="margin-top: 30px">
      <a-col :span="8" style="display: flex; justify-content: center">
        <a-card hoverable style="width: 240px" title="技术要点">
          <p>本项目使用Vue3.0+Vite2.0+Ant Design2.X搭建</p>
          <p>同时用到了Vue-router4.0以及最新的Vuex</p>
        </a-card>
      </a-col>
    </a-row> -->
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import vueImg from "../../assets/image/vue.png";
import viteImg from "../../assets/image/vite.svg";
import antdImg from "../../assets/image/antd.svg";
import echartsImg from "../../assets/image/echarts.png"
export default {
  name: "Dashboard",
  components: {},
  setup() {
    const settingData = reactive({
      cardList: [
        {
          title: "Vue3.0",
          desc: "Composition Api,全新语法",
          imgSrc: vueImg,
        },
        {
          title: "Vite2.0",
          desc: "全新的构建工具",
          imgSrc: viteImg,
        },
        {
          title: "Ant Design Vue2.x",
          desc: "蚂蚁金服的组件库,适配Vue.3.0",
          imgSrc: antdImg,
        },
        {
          title: "Ecahrts 5.0",
          desc: "百度良心开源项目",
          imgSrc: echartsImg,
        },
      ],
    });
    return {
      ...toRefs(settingData),
    };
  },
};
</script>

<style lang="less" scoped>
.dashboard {
  // height: 100%;
}
</style>
