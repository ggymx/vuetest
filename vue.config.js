const baseURL = process.env.VUE_APP_URL;
const version = process.env.VUE_APP_VERSION;
// const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log('url：' + process.env.VUE_APP_URL);

module.exports = {
  // baseUrl: './' vue4.x被废弃 改为publicPath(baseUrl是3.x属性)
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: 'static', //规定资源文件css,js,img的输出目录
  productionSourceMap: false, //打包时生成js映射文件（bug定位时用），默认为true
  //关闭eslint代码规则约束
  lintOnSave: false,
  //输出打包文件目录（区分开发环境和生产环境）
  outputDir: process.env.NODE_ENV === "development" ? "devdist" : "dist",
  //修改项目端口号
  devServer: {
    port: 9001
  },
  css: {
    extract: false,  //不合并编译的css
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
  publicPath: './', //解决打包上线时，文件路径变为绝对路径，显示空白
  configureWebpack: { //重写webpack配置
    devServer: {
      proxy: { //开发环境下代理跨域（服务器间请求数据没有跨域问题） (使用/api代理到target：如http://39.97.33.178) 生产环境下配置nginx
        '/api': {
          target: baseURL, //baseURL（后台接口域名）
          //是否开启跨域（//开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题）
          // changeOrigin: true,
          ws: true, //如果要代理 websockets，配置这个参数,
          secure: false, // 如果是https接口，需要配置这个参数,
          pathRewrite: { //重定向
            '^/api': '' //让路径以/api开头的字段为空
          }
        }
      }
    },
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号】
      filename: `js/[name].${version}.js`,
      chunkFilename: `js/[name].${version}.js`
    },
    plugins: [
      new MiniCssExtractPlugin({
        // 修改打包后css文件名
        filename: `css/[name].${version}.css`,
        chunkFilename: `css/[name].${version}.css`
      })
    ]
  },
  // 修改打包后img文件名
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .tap(options => {
        options.name = `img/[name].${version}.[ext]`;
        options.fallback = {
          loader: "file-loader",
          options: {
            name: `img/[name].${version}.[ext]`
          }
        };
        return options;
      });
  },
  //   chainWebpack: config => { //修改webpack打包的入口文件。需要在根目录建两个对应入口js文件
  //     config.when(process.env.NODE_ENV === 'production', config => {
  //       config.entry('app').clear().add('./src/main-prod.js') //生产环境
  //     })
  //     config.when(process.env.NODE_ENV === 'development', config => {
  //       config.entry('app').clear().add('./src/main-dev.js') //开发环境
  //     })
  //   },
}