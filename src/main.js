import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vueCookie from 'vue-cookie'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

Vue.use(vueCookie)
Vue.use(Buefy)

Vue.prototype.$fetch = async (url, body) => {
  return await fetch(url, {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
