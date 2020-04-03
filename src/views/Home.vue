<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="msg" />
    <button id="test" @click="login()">测试</button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from "@/components/HelloWorld.vue";
  import cookies from 'js-cookie';
  import ajax from '../lib/ajax';
  import log from '../lib/log';
  export default {
    name: "Home",
    components: {
      HelloWorld
    },
    data: function () {
      return {
        msg: process.env.VUE_APP_TITLE
      }
    },
    mounted(){
      console.log('挂载------');
      cookies.set('user','gegan',{expires: 7});
    },
    methods:{
      login(){
        console.log('点击登录',process.env.VUE_APP_URL);
        ajax.get('/api/champion/test',{flag:123456},(res)=>{
          log.info(res);
        })
      }
    }
  };
</script>
<style lang="less" scoped>
  #test{
    width:200px;
    height:100px;
    padding: 0;
    border: none;
  }
</style>