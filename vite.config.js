import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pxtovw from 'postcss-px-to-viewport'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(mode => {
  const env = loadEnv(mode, './env')
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-imports.d.ts'
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ]
      })
    ],
    css: {
      postcss: {
        plugins: [
          pxtovw({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 2560, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            landscape: false // 是否处理横屏情况
          })
        ]
      },
      preprocessorOptions: {
        less: {
          charset: false,
          modifyVars: {
            // 在这里自定义主题色等样式
            'primary-color': '#1890ff',
            'link-color': '#1890ff',
            'border-radius-base': '2px'
          },
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      alias: {
        // '@': path.join(__dirname, './src')
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
        '/foo': 'http://localhost:4567',
        // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        // 正则表达式写法：http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
        '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/fallback/, '')
        },
        // 使用 proxy 实例
        // "/api": {
        //   target: "http://jsonplaceholder.typicode.com",
        //   changeOrigin: true,
        //   configure: (proxy, options) => {
        //     // proxy 是 'http-proxy' 的实例
        //   },
        // },
        // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
        '/socket.io': {
          target: 'ws://localhost:5174',
          ws: true
        }
      }
    }
  }
})
