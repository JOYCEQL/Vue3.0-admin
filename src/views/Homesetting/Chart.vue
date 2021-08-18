<!--
 * @Author: yuguangzhou
 * @Date: 2021-04-22 15:13:19
 * @LastEditTime: 2021-05-22 11:37:14
 * @LastEditors: yuguangzhou
 * @Description: 可视化大屏
-->
<template>
  <div class="Chart">
    <a-layout-header><h2>可视化面板</h2></a-layout-header>
    <a-layout-content style="padding: 30px 0">
      <a-row type="flex" justify="space-around" :gutter="30">
        <a-col :span="12">
          <a-card> <Chart1 ref="chart1"></Chart1> </a-card
        ></a-col>
        <a-col :span="12">
          <a-card>
            <Chart2 ref="chart2"></Chart2>
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
    <a-button type="primary" @click="goScreen">大屏中心</a-button>
    <!-- <a-switch v-model:checked="skin" checked-children="深色模式" un-checked-children="默认模式" /> -->
  </div>
</template>

<script>
import { reactive, ref, toRef, toRefs, onMounted, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import Chart1 from "@/components/Screen/Chart1.vue";
import Chart2 from "@/components/Screen/Chart2.vue";
export default {
  name: "Chart",
  components: {
    Chart1,
    Chart2,
  },
  setup() {
    const chart1 = ref(null)
    const chart2 = ref(null)
    const router=useRouter()
    const { ctx } = getCurrentInstance();
    const state = reactive({
      skin: false,
    });
    onMounted(() => {
      let CHART1 = ctx.$echarts.init(chart1.value.$el)
      let CHART2 = ctx.$echarts.init(chart2.value.$el)
      window.addEventListener('resize', () => {
        CHART1.resize()
        CHART2.resize()
      })
    })
    const goScreen=()=>{
      router.push('/screen')
    }
    return {
      ...toRefs(state),
      chart1,
      chart2,
      ctx,
      goScreen
    };
  },
};
</script>

<style lang="less" scoped>
.ant-layout-header h2 {
  text-align: center;
  color: #fff;
}
</style>
