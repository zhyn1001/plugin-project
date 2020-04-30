import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Test from './plugins/Toast/test'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Test)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
