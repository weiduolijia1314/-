import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from "./plug-in/vuetify";
import Vuetify from "vuetify";
import icons from "vuetify/lib/services/icons/presets/mdi";
import store from "./plug-in/store";
import echarts from 'echarts'
import Meta from 'vue-meta'
Vue.use(Meta)
Vue.prototype.$echarts = echarts
Vue.use(icons);
Vue.config.productionTip = false
Vue.use(Vuetify)
new Vue({
  vuetify,

  store,
  icons,
  router,
  render: h => h(App),
}).$mount('#app')
