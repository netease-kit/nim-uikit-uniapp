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
  ],
})
