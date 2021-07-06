//封装axios
import axios from 'axios';
//import qs from 'querystring'

//错误信息处理
const errorHandle = (status , other) => {
    switch(status){
        case 400:
            console.log("信息校验失败")
            break;
        case 401:
            console.log("认证失败")
            break;
        case 403:
            console.log("token校验失败")
            break;
        case 404:
            console.log("请求资源不存在")
            break;
        default:
            console.log(other)
            break;
    }
}

//创建axios实例
var instance = axios.create({ timeout : 500000 })
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// //instance.defaults.headers.post['Content-Type'] = 'application/json';
// //instance.defaults.headers.common['Authorization'] = "AUTH_TOKEN";
// instance.defaults.baseURL = '121.0.0.1:8081/a';

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //判断post请求需要增加qs转化
    if(config.method === "post"){
        //config.data = qs.stringify(config.data)
        config.data = JSON.stringify(config.data)
    }

    // if(token){
    //     config.headers.Authorization = token
    // }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(
    //请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    //请求失败
    error => {
        const { response } = error
        if(response){
            errorHandle(response.status,response.data.message)
            return Promise.reject(response)
        }else{
            console.log("断网了")
        }
    }
);

export default instance