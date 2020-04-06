import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//创建初始化状态
const state={
  count:1
}

//创建改变状态的方法
const mutations= {
  ADD(state,data){
    state.count+=data.n;
  }
}

//创建外部获取的state
const getters= {
  count:function(state){
    return state.count;
  }
}

//创建驱动方法改变mutations
const actions={
  add({commit},data){
    //此处可进行异步操作
    commit('ADD',data);
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
