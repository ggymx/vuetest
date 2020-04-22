import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './utils/pageUtil';
import './config/ui/elementUI';
import './styles/animate.min.css';
// import ElementUI from 'element-ui'; 
// import 'element-ui/lib/theme-chalk/index.css';
import ajax from './api/request';

import i18n from './lang/i18n';//国际化
import $ from 'jquery';
import _ from 'lodash';

Vue.config.productionTip = false;
Vue.prototype.$ = $;
Vue.prototype._ = _;
//引入element-ui
// Vue.use(ElementUI);

Vue.prototype.$axios = ajax;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
