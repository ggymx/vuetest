let target = process.env.VUE_APP_URL;
console.log('url：' + process.env.VUE_APP_URL);

module.exports = {
  //关闭eslint代码规则约束
  lintOnSave: false,
  //修改项目端口号
  devServer: {
    port: 9001
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 100, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            // selectorBlackList: [], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
          }),
        ]
      }
    }
  },
  // publicPath: './', //解决打包上线时，文件路径变为绝对路径，显示空白
  configureWebpack: { //重写webpack配置
    devServer: {
      proxy: { //跨域代理 (使用/api代理到target：如http://39.97.33.178)
        '/api': {
          target: target, //baseURL（后台接口域名）
          //是否开启跨域（//开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题）
          changeOrigin: true,
          ws: true, //如果要代理 websockets，配置这个参数,
          secure: false, // 如果是https接口，需要配置这个参数
          pathRewrite: { //重定向
            '^/api': '' //让路径以/api开头的字段为空
          }
        }
      }
    }
  }
  //   chainWebpack: config => { //修改webpack打包的入口文件。需要在根目录建两个对应入口js文件
  //     config.when(process.env.NODE_ENV === 'production', config => {
  //       config.entry('app').clear().add('./src/main-prod.js') //生产环境
  //     })
  //     config.when(process.env.NODE_ENV === 'development', config => {
  //       config.entry('app').clear().add('./src/main-dev.js') //开发环境
  //     })
  //   },
}