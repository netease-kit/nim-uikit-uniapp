import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
const BUILD_ENV = process.env.BUILD_ENV || 'dev' // prod || dev
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    BUILD_ENV: JSON.stringify(BUILD_ENV),
  },
  plugins: [
    uni({
      vueOptions: {
        reactivityTransform: true,
      },
      viteLegacyOptions: {
        targets: ['defaults', 'android >= 6', 'ios >= 10'],
        modernPolyfills: true,
      },
    }),
    {
      // 自定义插件禁用vite:vue插件的devToolsEnabled，强制编译 vue 模板时 inline 为 true
      name: 'fix-vite-plugin-vue',
      configResolved(config) {
        const plugin = config.plugins.find((p) => p.name === 'vite:vue')
        if (plugin && plugin.api && plugin.api.options) {
          plugin.api.options.devToolsEnabled = false
        }
      },
    },
  ],
})
