//element组件懒加载配置
import Vue from "vue";
import { Button, Select, MessageBox, Message, Calendar, Option } from 'element-ui';
//按需引入element-ui
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Message.name, Message);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Calendar.name, Calendar);
Vue.prototype.$message = Message;