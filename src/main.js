import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './lib/pageUtil';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import ajax from './lib/ajax';
import { Button, Select } from 'element-ui';
// import lang from 'element-ui/lib/locale/lang/en';
// import locale from 'element-ui/lib/locale';

Vue.config.productionTip = false;

//引入element-ui
Vue.use(ElementUI);
//按需引入element-ui
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
// //设置语言
// locale.use(lang);

// Vue.use(ajax);
// Vue.prototype.ajax=ajax;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
