<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld :msg="msg" />
    <el-button type="success" id="test" @click="login()">{{$t("login")}}</el-button>
    <el-button type="info" id="test2" @click="switchLang()">{{$t("language.name")}}</el-button>
    <el-calendar>
    </el-calendar>
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
        msg: process.env.VUE_APP_TITLE,
        lang: localStorage.getItem('locale')
      }
    },
    mounted() {
      console.log('挂载------');
      cookies.set('user', 'gegan', { expires: 7 });
    },
    methods: {
      login() {
        console.log('点击登录', process.env.VUE_APP_URL);
        ajax.get('/api/champion/test', { flag: 123456 }, (res) => {
          log.info(res);
        })
      },
      switchLang() {
        log.info('切换语言');
        if (this.lang == 'zh') {
          this.lang = 'en';

        } else {
          this.lang = 'zh';
        }
        localStorage.setItem('locale', this.lang);
        this.$i18n.locale = localStorage.getItem('locale');
        this.$message({
          message: this.lang == 'zh' ? '切换为中文' : 'Switch to English!',
          type: 'success'
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  #test {
    position: absolute;
    top: 20px;
    right: 230px;
  }

  #test2 {
    position: absolute;
    top: 20px;
    right: 120px;
  }
</style>