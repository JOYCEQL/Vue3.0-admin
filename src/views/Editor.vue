<!--
 * @Author: yuguangzhou
 * @Date: 2021-05-10 15:56:40
 * @LastEditTime: 2021-05-10 16:21:51
 * @LastEditors: yuguangzhou
 * @Description: 富文本编辑器
-->
<template>
  <div class="Editor">
    <h1>富文本编辑器</h1>
    <div class="content">
            <div ref='editor'></div>
    </div>
  </div>
</template>

<script>
import {reactive,ref,onMounted} from "vue"
import WangEditor from "wangeditor"
export default {
  name:"Editor",
  components: {},
  setup() {
   const editor=ref()
   const data = reactive({

   })
    let instance;
    onMounted(() => {
        instance = new WangEditor(editor.value);
        Object.assign(instance.config, {
            onchange() {
                console.log('change');
            },
        });
        instance.config.zIndex = 20
        instance.config.showLinkImg = false
        instance.config.uploadImgShowBase64 = true
        instance.create();
    });
    
    return {
      data,
      editor
    }
  }


}
</script>

<style lang="less" scoped>
.content{
    width: 90%;
}
</style>

