<!--
 * @Author: yuguangzhou
 * @Date: 2021-04-26 10:01:50
 * @LastEditTime: 2021-04-26 15:08:19
 * @LastEditors: yuguangzhou
 * @Description:  饼图
-->
<template>
  <div id="Chart2"></div>
</template>
<script>
import { reactive, ref, onMounted, getCurrentInstance, toRefs } from "vue";
export default {
  name: "Chart2",
  components: {},
  setup() {
    const state = reactive({
    });
    const { ctx } = getCurrentInstance();
    onMounted(() => {
      drawLine();
    });
    const drawLine = () => {
      // 基于准备好的dom，初始化echarts实例
      let Chart2 = ctx.$echarts.init(document.getElementById("Chart2"));
      let options = {
        title: { text: "饼图", left: "center" }, //图标中的表题
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 绘制图表
      Chart2.setOption(options);
    };
    return {
      ...toRefs(state),
      drawLine,
    };
  },
};
</script>

<style lang="less" scoped>
#Chart2 {
  width: 100%;
  height: 400px;
}
</style>
