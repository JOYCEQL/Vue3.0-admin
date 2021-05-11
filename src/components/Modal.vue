<!--
 * @Author: yuguangzhou
 * @Date: 2021-04-23 11:40:38
 * @LastEditTime: 2021-04-25 16:26:03
 * @LastEditors: yuguangzhou
 * @Description: 全局对话框
-->
<template>
  <div class="Modal">
    <a-modal v-model:visible="visible" :title="title" @ok="handleOk" okText="确定" cancelText="取消" @cancel="hanleCancel" >
      <slot></slot>
    </a-modal>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  name: "Modal",
  components: {},
  emits: ["modalAction", "modalCancel",],
  props: ["visible", "title",'key'],
  setup(props, ctx) {
    const data = reactive({});
    const handleOk = () => {
      ctx.emit("modalAction");
    };
    const hanleCancel = () => {
      ctx.emit("modalCancel");
    };
    return {
      data,
      handleOk,
      hanleCancel,
      ctx,
    };
  },
};
</script>

<style lang="less" scoped></style>
