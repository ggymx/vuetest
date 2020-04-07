import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './lib/pageUtil';
// import ElementUI from 'element-ui'; 
// import 'element-ui/lib/theme-chalk/index.css';
// import ajax from './lib/ajax';
import { Button, Select, MessageBox, Message,Calendar} from 'element-ui';
// import lang from 'element-ui/lib/locale/lang/en';
// import locale from 'element-ui/lib/locale';

// import VueI18n from 'vue-i18n';   //国际化
import i18n from './lib/lang/i18n';

Vue.config.productionTip = false;

//引入element-ui
// Vue.use(ElementUI);
// Vue.use(VueI18n);
//按需引入element-ui
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Message.name, Message);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Calendar.name,Calendar);
Vue.prototype.$message = Message;
// //设置语言
// locale.use(lang);

// Vue.use(ajax);
// Vue.prototype.ajax=ajax;

//设置语言包
// const i18n=new VueI18n({
//   locale: localStorage.getItem("locale") || "zh",// 语言标识
//   messages: {
//     zh: require("./lib/lang/zh"),//语言包
//     en: require("./lib/lang/en")
//   }
// })

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
