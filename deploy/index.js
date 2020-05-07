/*将构建的dist自动部署到服务器 */
const scpClient = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const server = require('./products');
const spinner = ora(`正在发布到${(process.env.NODE_ENV === 'prod' ? '生产' : '测试')}服务器.../host：${server.host}，port：${server.port}`);
spinner.start();
scpClient.scp(
  './dist',
  {
    host: server.host,
    port: server.port,
    username: server.username,
    password: server.password,
    path: server.path
  },
  function (err) {
    spinner.stop();
    if (err) {
      // console.log(chalk.red('发布失败.\n'));
      console.log(chalk.red('发布失败.\n')+err);
      // throw err;
    } else {
    //   console.log(chalk.green('Success! 成功发布到' + (process.env.NODE_ENV === 'prod' ? '生产' : '测试') + '服务器! \n'));
      console.log(chalk.green('Success! 成功发布到' + (process.env.NODE_ENV === 'prod' ? '生产' : '测试') + '服务器! \n'));
    }
  }
);