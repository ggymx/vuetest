import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//创建初始化状态
const state={
  count:1,
  skin:localStorage.getItem("template") || '001'
}

//创建改变状态的方法
const mutations= {
  ADD(state,data){
    state.count+=data;
  },
  SET_SKIN(state,data){
    console.log('触发换肤',data)
    state.skin = data;
  }
}

//创建外部获取的state
const getters= {
  count:function(state){
    return state.count;
  },
  skin:function(state){
    return state.skin;
  }
}

//创建驱动方法改变mutations
const actions={
  add({commit},data){
    //此处可进行异步操作
    commit('ADD',data);
  },
  setSkin({commit},data){
    console.log('更换皮肤',data);
    localStorage.setItem("template",data)
    commit('SET_SKIN',data)
  }
}

const modulesA={
  state:{},
  mutations: {},
  actions: {},
  getters: {}
}

//模块组
const modules= {
  a:modulesA
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
});
