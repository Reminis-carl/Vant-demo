<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo"></div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <stock-outlined />
          <span>航行资料</span>
        </a-menu-item>
        <a-menu-item key="2">
          <hdd-outlined />
          <span>管制规定</span>
        </a-menu-item>
        <a-menu-item key="3">
          <file-jpg-outlined />
          <span>图片类航图</span>
        </a-menu-item>
        <a-menu-item key="4">
          <gold-outlined />
          <span>辅助工具</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0"> </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>航行资料</a-breadcrumb-item>
        </a-breadcrumb>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Copyright © 2020 - 2021 四川川大智胜软件股份有限公司
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup>
import {
  StockOutlined,
  HddOutlined,
  FileJpgOutlined,
  GoldOutlined
} from '@ant-design/icons-vue'
import { ref } from 'vue'
const collapsed = ref(false)
const selectedKeys = ref(['1'])
</script>
<style scoped>
.logo {
  height: 37px;
  margin: 12px;
  background: rgba(255, 255, 255, 0.3);
}
</style>
