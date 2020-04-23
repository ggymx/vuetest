import axios from 'axios';

// let token=sessionStorage.getItem('token')||'adefaultstring8888';
// axios.defaults.headers.common['Authorization'] = token;
//配置cors跨域时前端携带cookie
// axios.defaults.withCredentials = true;
const http = axios.create({
  //   baseURL: 'http://localhost:8080/',
  withCredentials: true, //设置跨域时携带cookie
  timeout: 8000, //请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
    let newData = '';
    for (let k in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    return newData;
  }]
});

//请求拦截器
http.interceptors.request.use(config => {
  console.log('请求携带的token', sessionStorage.getItem('token'));
  return config;
}, error => {
  console.log(error);
  return Promise.reject();
})

//响应拦截器
http.interceptors.response.use(response => {
  if (response.status === 200) {
    console.log('服务器响应成功！', response.data);
    return response.data;
  } else {
    console.log('出现异常-------');
    Promise.reject();
  }
}, error => {
  console.log('出现错误-------', error.message);
  if (error && error.response) {
    switch (error.response.status) {
    case 400:
      error.message = '错误请求';
      break;
    case 401:
      error.message = '未授权，请重新登录';
      break;
    case 403:
      error.message = '拒绝访问';
      break;
    case 404:
      error.message = '请求错误,未找到该资源';
      break;
    case 405:
      error.message = '请求方法未允许';
      break;
    case 408:
      error.message = '请求超时';
      break;
    case 500:
      error.message = '服务器端出错';
      break;
    case 501:
      error.message = '网络未实现';
      break;
    case 502:
      error.message = '网络错误';
      break;
    case 503:
      error.message = '服务不可用';
      break;
    case 504:
      error.message = '网络超时';
      break;
    case 505:
      error.message = 'http版本不支持该请求';
      break;
    default:
      error.message = `未知错误${error.response.status}`;
    }
  } else {
    error.message = "连接到服务器失败";
  }
  return Promise.reject(error);
  // return Promise.reject();
})

function httpService(method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    response(err);
  })
}
//文件上传
// export function fileUpload(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     httpService({
//       url: url,
//       method: 'post',
//       data: params,
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }).then(response => {
//       resolve(response);
//     }).catch(error => {
//       reject(error);
//     });
//   });
// }

export default {
  get: function (url, params, response) {
    return httpService('GET', url, params, response)
  },
  post: function (url, params, response) {
    return httpService('POST', url, params, response)
  },
  put: function (url, params, response) {
    return httpService('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return httpService('DELETE', url, params, response)
  }
  // fileUpload: fileUpload
}