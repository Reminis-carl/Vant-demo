<script setup>
import zhCh from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
const locale = ref(zhCh)
</script>

<template>
  <a-config-provider :locale="locale"></a-config-provider>
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<style scoped></style>
