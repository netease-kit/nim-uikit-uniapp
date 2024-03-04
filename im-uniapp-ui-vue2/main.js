import App from './App'
// import i18n from './i18n'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import VueCompositionApi from '@vue/composition-api'


Vue.config.productionTip = false
Vue.use(VueCompositionApi)


App.mpType = 'app'
const app = new Vue({
  ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
// #endif
