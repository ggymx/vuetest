<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div class="logo"></div>
    <HelloWorld :msg="msg" />
    <div class="header">
      <el-button type="primary" id="test" @click="login()">{{$t("login")}}</el-button>
      <el-button type="primary" id="test2" @click="switchLang()">{{$t("language.name")}}</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>

    <!-- <el-select v-model="template" placeholder="更换风格主题" @change="switchSkin">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select> -->
    <div>换肤：<theme-picker></theme-picker></div>
    <!-- <el-calendar>
    </el-calendar> -->
    <div>格式化日期：{{date| time }}</div>
    <div>自动聚焦<input type="text" v-focus/></div>
    <div v-copy>复制：5555555555sssss</div>
     <el-button type="primary" @click="test" v-btnpr.dis>鉴权按钮</el-button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from "@/components/HelloWorld.vue";
  import ThemePicker from "@/components/ThemePicker.vue"
  import cookies from 'js-cookie';
  // import ajax from '../lib/request';
  import log from '../utils/log';
  // import skin from '../utils/skin';
  export default {
    name: "Home",
    components: {
      HelloWorld,
      ThemePicker
    },
    data: function () {
      return {
        msg: process.env.VUE_APP_TITLE,
        lang: localStorage.getItem('locale'),
        options: [
        {
          value: '001',
          label: '天蓝'
        },
        {
          value: '002',
          label: '墨绿'
        }],
        template: '',
        date:'1588832774000',
        copy:'要复制的内容'
      }
    },
    created() {
      // skin.getCss();
    },
    mounted() {
      console.log('挂载------');
      cookies.set('user', 'gegan', { expires: 7 });
    },
    methods: {
      login() {
        $("#test").css({'background':'red'})
        $('#test').addClass('animated bounce');
        console.log('点击登录', process.env.VUE_APP_URL);
        log.info(this._.fill);
        // 代理跨域
        // this.$axios.get('api/champion/test', { flag: 123456 }, (res) => {
        //   log.info(res);
        // })
        //CORS跨域
        // this.$axios.get(process.env.VUE_APP_URL+'/champion/test', { flag: 123456 }, (res) => {
        //   log.info(res);
        // })
        this.$api.login().then(res=>{}).catch(err=>{
          log.err(err);
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
          type: 'success',
          showClose: true,
          customClass:'message-skin-success',
          onClose:()=>{
              location.reload();
          }
        });
      },
      switchSkin(template) {
        log.info(template);
        // skin.setCss(template);
        // skin.getCss();
        // this._setCss(template);
      },
      test(){
        alert('测试')
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

  .el-calendar {
    font-size: 30px;
    ;
  }

  .header {
    width: 100%;
    height: 80px;
    // background-color: #3b76b9
  }
  input:focus{
        background: rebeccapurple;
  }
</style>