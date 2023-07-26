<template>
  <router-view></router-view>
  <van-action-bar :safe-area-inset-bottom="true">
    <van-action-bar-icon icon="home-o" text="首页" />
    <van-action-bar-icon icon="search" text="搜索" />
    <van-action-bar-icon icon="apps-o" text="工具" />
  </van-action-bar>
</template>
<script setup></script>
<style lang="scss" scoped>
.van-action-bar {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
</style>
