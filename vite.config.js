import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
  resolve: {
    // 别名配置
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // server: {
  //   proxy: {
  //     // 使用/api代理域名
  //     '/api': {
  //       target: process.env.VITE_APP_URL,
  //       // target: 'http://127.0.0.1:3000',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
  plugins: [vue()],
})
