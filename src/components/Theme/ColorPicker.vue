<!--
 * @Author: yuguangzhou
 * @Date: 2021-05-06 14:02:16
 * @LastEditTime: 2021-05-12 14:23:13
 * @LastEditors: yuguangzhou
 * @Description: 颜色选择器
-->
<template>
  <div class="ColorPicker">
      <span @click="handleColor(color)" v-for="(color,index) in colorList" :key="index"  class="color-item" :style="{'background':color}"  :class="activeColor==color?'color-active':''" >
        <CheckOutlined/>
      </span>
  </div>
</template>

<script>
import {reactive,ref,toRefs} from "vue"
import { CheckOutlined } from '@ant-design/icons-vue';
import {systemColor} from './color.js'
export default {
  name:"ColorPicker",
  components: {
    CheckOutlined
  },
  setup() {
   const state = reactive({
     colorList:systemColor,
     activeColor:'#0084f4'
   })
    const handleColor=(color)=>{
      state.activeColor=color
      // window.less.modifyVars({

      // })
    }
    return {
     ...toRefs(state),
     handleColor
    }
  }
}
</script>

<style lang="less" >
.ColorPicker{
    display: flex;
    flex-wrap: wrap;
    margin: 16px 0;
    justify-content: space-around;
}
.color-item{
    width: 20px;
    height: 20px;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 2px;
    svg {
        display: none;
    }
  
}
.color-active {
      svg {
        display: inline-block;
        margin: 0 0 3px 3px;
        font-size: 12px;
        fill: white;
      }
}

</style>
