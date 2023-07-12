
import request from './request'



//用户操作

const user = {
    base: '/user',
    //注册
    signUp: (data, captcha) => request({ method: 'post', url: `${user.base}/signUp?captcha=${captcha}`, data: data }),
    //登录
    login: (data) => {
        console.log(data)
        request({ method: 'post', url: `${user.base}/login`, data: data })
            .then((res) => {
                const data = res.data.data
                console.log(data)
                sessionStorage.setItem('token', data.token)
            })
    }
}

const mail = {
    base: '/mail',
    //获取验证码
    getCapcha: (params) => request({ url: `${mail.base}/getCaptcha`, params: params }),

}
//文件操作

//文件上传
const uploadNii = (data) => {
    console.log(data)
    request({ method: 'post', url: 'file/uploadNii', data: data })
        .then((res) => {
            console.log(res)
        })
}

export {
    user,
    mail,
    uploadNii
}