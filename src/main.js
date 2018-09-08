import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'

import 'ant-design-vue/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  render: h => h(App)
}).$mount('#app')
