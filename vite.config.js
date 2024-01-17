import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  //   cssPreprocessOptions: {
  //    scss: {
  //       additionalData: '@import "./src//scss/common.scss";' // 全局公共样式
  //    }
  // },
  resolve: {
    // 别名配置
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  server: {
    proxy: {
      // 使用/api代理域名
      '/api': {
        target: 'http://locallhost:3000',
        changeOrigin: true,

        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [vue()],
})
