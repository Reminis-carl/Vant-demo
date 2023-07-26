import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'normalize.css'
import 'vant/lib/index.css'
import '@/assets/css/global.less'
// 桌面端适配
import '@vant/touch-emulator'

// Toast
// import { showToast } from 'vant';
import 'vant/es/toast/style'

// Dialog
// import { showDialog } from 'vant';
import 'vant/es/dialog/style'

// Notify
// import { showNotify } from 'vant';
import 'vant/es/notify/style'

// ImagePreview
// import { showImagePreview } from 'vant';
import 'vant/es/image-preview/style'

const app = createApp(App)
// 错误处理器，用来捕获所有子组件错误
app.config.errorHandler = err => {
  console.error(err)
}
app.use(createPinia())
app.use(router)

app.mount('#app')
