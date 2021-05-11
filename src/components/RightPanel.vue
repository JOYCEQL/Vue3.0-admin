<!--
 * @Author: yuguangzhou
 * @Date: 2021-04-26 15:44:47
 * @LastEditTime: 2021-04-27 17:09:58
 * @LastEditors: yuguangzhou
 * @Description: 右侧设置面板
-->
<template>
  <div class="RightPanel">
        <a-button  v-show="!showPanel" type="primary" size="large" class="setting-false" @click="changeStatus(true)">
       <SettingOutlined />
        </a-button>
        <a-button v-show="showPanel" type="primary" size="large" class="setting-true" @click="changeStatus(false)" >
        <CloseOutlined />        
        </a-button>
         <a-drawer
            title="系统设置"
            placement="right"
            :closable="false"
            v-model:visible="showPanel"
            :after-visible-change="afterVisibleChange"
        >
          <a-checkbox v-model:checked="dark" @change="hanleDark" disabled>暗黑模式(暂不支持)</a-checkbox>
        </a-drawer>
  </div>
</template>

<script>
import {reactive,ref, toRefs} from "vue"
import { CloseOutlined,SettingOutlined } from "@ant-design/icons-vue";
export default {
  name:"RightPanel",
  components: {
    CloseOutlined,
    SettingOutlined
  },
  props:['showPanel'],
  emits:['showSetting'],
  setup(props,ctx) {
   const state = reactive({
     dark:false
   })
   const afterVisibleChange=(value)=>{
    ctx.emit('showSetting',value)
   }
    const changeStatus=(value)=>{
      ctx.emit('showSetting',value)
    }
    const hanleDark=(value)=>{
       window.less
        .modifyVars({
          dark: false,
        })
        .then(() => {
          console.log(1)
        })
        .catch((err) => {
          console.log(2,err)
        });
    }
   return {
      ...toRefs(state),
      afterVisibleChange,
      changeStatus,
      hanleDark
    }
  }
}
</script>

<style lang="less" scoped>
.setting-true{
  position: fixed;
  top: 40%;
  right: 256px;
  z-index: 9999;
}
.setting-false{
  position: fixed;
  top: 40%;
  right: 0;
  z-index: 9999;
}
</style>
