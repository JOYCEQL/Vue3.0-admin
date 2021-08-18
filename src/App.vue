<!--
 * @Author: yuguangzhou
 * @Date: 2021-04-19 14:34:50
 * @LastEditTime: 2021-07-01 10:41:46
 * @LastEditors: yuguangzhou
 * @Description: 
-->
<template>
      <router-view v-slot="{ Component }">
          <keep-alive>
              <component :is="Component"/>
          </keep-alive>
    </router-view>
</template>
<script setup>

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style lang='less'>
  body{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

</style>
