<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="msg" />
    <button id="test">测试</button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from "@/components/HelloWorld.vue";

  export default {
    name: "Home",
    components: {
      HelloWorld
    },
    data: function () {
      return {
        msg: process.env.VUE_APP_TITLE
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