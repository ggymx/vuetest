import time from './time'; 

const filters = {
    time
}
export default {
    install(Vue){
        Object.keys(filters).forEach(key=>{
            Vue.filter(key,filters[key]);
        })
    }
}