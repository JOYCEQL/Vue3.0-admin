<!--
 * @Author: yuguangzhou
 * @Date: 2021-04-26 10:01:50
 * @LastEditTime: 2021-04-26 15:08:03
 * @LastEditors: yuguangzhou
 * @Description:  柱状图
-->
<template>
  <div id="Chart1"></div>
</template>

<script>
import { reactive, ref,onMounted, getCurrentInstance } from "vue";
export default {
  name: "Chart1",
  components: {},
  setup() {
    const data = reactive({});
    const { ctx } = getCurrentInstance();
    onMounted(() => {
      drawLine();
    });
    const drawLine = () => {
      // 基于准备好的dom，初始化echarts实例
      let Chart1 = ctx.$echarts.init(document.getElementById("Chart1"));
      let options = {
        title: { text: "柱状图" }, //图标中的表题
        tooltip: {},
        legend: {},
        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，
          // 默认把第一个维度映射到 X 轴上，第二个维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          dimensions: ["product", "2015", "2016", "2017"],
          source: [
            { product: "Matcha Latte", 2015: 43.3, 2016: 85.8, 2017: 93.7 },
            { product: "Milk Tea", 2015: 83.1, 2016: 73.4, 2017: 55.1 },
            { product: "Cheese Cocoa", 2015: 86.4, 2016: 65.2, 2017: 82.5 },
            { product: "Walnut Brownie", 2015: 72.4, 2016: 53.9, 2017: 39.1 },
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      };
      // 绘制图表
      Chart1.setOption(options);
   
    };
    return {
      data,
      drawLine
    };
  },
};
</script>

<style lang="less" scoped>
#Chart1 {
  width: 100%;
  height: 400px;
}
</style>
