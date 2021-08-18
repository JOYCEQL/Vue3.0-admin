<!--
 * @Author: yuguangzhou
 * @Date: 2021-05-22 10:07:32
 * @LastEditTime: 2021-05-23 11:03:58
 * @LastEditors: yuguangzhou
 * @Description:  大屏容器
-->
<template>
    <!-- 标题 -->
    <div ref="dashboardView" class="dashboard-view">
      <div ref="maxView" class="max-view" style="width: 1920px; height: 1080px">
        <div class="header">可视化大屏</div>
      </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted, toRefs } from "vue"
import { screenSize } from '@/assets/js/resize.js'

export default {
  name: "",
  components: {},
  setup() {
    const maxView = ref(null)
    const dashboardView = ref(null)
    const data = reactive({
    });
    onMounted(() => {
        // screenSize(maxView.value);
      init()
     window.onresize = () => {
      zoomView()
    }
    });
    const init = () => {
      zoomView()
      dashboardView.value.style.visibility = 'visible'
    }
    const zoomView = () => {
      console.log(maxView.value);
      let maxView1 = maxView.value,
        viewWidth = parseInt(maxView1.style.width),
        viewHeight = parseInt(maxView1.style.height),
        clientRect = maxView1.offsetParent.getBoundingClientRect()
      let scale = Math.min(clientRect.width / viewWidth, clientRect.height / viewHeight)
      let left = (clientRect.width - viewWidth * scale) / 2
      let top = (clientRect.height - viewHeight * scale) / 2
      maxView1.style.left = `${left}px`
      maxView1.style.top = `${top}px`
      maxView1.style.transform = `scale(${scale} , ${scale})`
    }
    return {
      data,
      zoomView,
      maxView,
      dashboardView,
      init
    }
  }
}
</script>

<style lang="less" scoped>
.dashboard-view {
	position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  height: 110px;
  line-height: 110px;
  font-size: 40px;
  text-align: center;
  
  background: url("../../assets/image/title-bg.png") ;
  background-size: contain;
}
.screen {
  background-color: pink;
}
.dashboard-view .max-view {
  position: absolute;
  transform-origin: left top;
  overflow: hidden;
}
.dashboard-view {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: auto;
}
</style>
