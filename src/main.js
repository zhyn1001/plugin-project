import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Test from './plugins/Toast/test'
import Calendar1 from './plugins/Calendar/index'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Test)
Vue.use(Calendar1)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
