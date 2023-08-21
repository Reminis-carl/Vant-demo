import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'normalize.css'
import '@/assets/css/global.less'
const app = createApp(App)
// 错误处理器，用来捕获所有子组件错误
app.config.errorHandler = err => {
  console.error(err)
}
app.use(createPinia())
app.use(router)

app.mount('#app')
