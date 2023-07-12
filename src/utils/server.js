import axios from 'axios'


let server = axios.create({
    baseURL: "/api",    //请求地址前缀
    timeout: 5000,                        // 超时时间
    // headers: {
        // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        // 'Content-Type': 'multipart/form-data'
      // },
})

// 请求拦截
server.interceptors.request.use(config => {
    // console.log(config); 
    // config是一个包含了所有请求信息的对象 在这里可以修改config对象 修改之后需要返回config对象 请求才会正常进行
    if(sessionStorage['token']){
      console.log(sessionStorage['token'])
      config.headers.token = sessionStorage['token']
    }
    return config
}, err => {
    // throw new Error(err)
    Promise.reject(err)
})


// // 响应拦截
// server.interceptors.response.use(res => {
//     // res 是服务器返回的数据信息
//     // console.log(res);
//     return res.data
// }, err => {
//     throw new Error(err)
// })

export default server
