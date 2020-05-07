import focus from './focus';
import copy from './copy';
import btnpr from './btnpr';
const directives = {
    focus,
    copy,
    btnpr
}

export default {
    install(Vue){
        Object.keys(directives).forEach(key=>{
            Vue.directive(key,directives[key]);
        })
    }
}
