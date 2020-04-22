import Vue from 'vue'
import { addClass } from '@/util/dom'
import { hasPermission } from '@/util/publicData'

/** 权限指令**/
Vue.directive('permissions', {
  // 指令第一次绑定到元素的时候执行,且只执行一次,一般用于执行初始化操作
  bind () {

  },
  // 当被绑定的元素插入到DOM中时执行
  inserted: function (el, binding) {
    // console.log(el);
    // console.log(el.getAttribute('permission-type'));
    // console.log(binding);
    let type = el.getAttribute('permission-type') || 'disable'
    if (!Vue.prototype.$_permissions(binding.value)) {
      if (type === 'none') {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      } else if (type === 'disable') {
        addClass(el, 'disable')
        el.setAttribute('disable', true)
      }
    }
  },
  // 当被绑定的元素所在模版更新时执行
  update () {
    // console.log('update')
  },
  // 指令与被绑定的元素解绑时使用，只调用一次
  unbind () {

  }
})
// 权限检查方法
Vue.prototype.$_permissions = function (values) {
	return hasPermission(values)
}
