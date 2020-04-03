import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './lib/pageUtil';
import ajax from './lib/ajax';

Vue.config.productionTip = false;
// Vue.use(ajax);
// Vue.prototype.ajax=ajax;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
