import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './lib/pageUtil';
import './lib/config/component-load';
// import ElementUI from 'element-ui'; 
// import 'element-ui/lib/theme-chalk/index.css';
// import ajax from './lib/ajax';

import i18n from './lib/lang/i18n';//国际化

Vue.config.productionTip = false;

//引入element-ui
// Vue.use(ElementUI);

// Vue.prototype.ajax=ajax;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
