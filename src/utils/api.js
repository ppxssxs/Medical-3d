
import request from './request'
import { ElMessage } from "element-plus";

function isObject(form) {
    let flag = true
    for (let key in form) {
        if (!form[key]) {
            return false
        }
    }
    return flag
}

//用户操作

const user = {
    base: '/user',
    //注册
    signUp: (data, captcha) => {
        if (!isObject(data)) {
            ElMessage.warning('请将信息填写完整!')
            return
        }
        if (!captcha) {
            ElMessage.warning('请输入验证码!')
            return
        }
        request({ method: 'post', url: `${user.base}/signUp?captcha=${captcha}`, data: data })
    },
    //登录
    login: (data) => {
        console.log(data)
        if (!isObject(data)) {
            ElMessage.warning('请将信息填写完整!')
            return
        }
        request({ method: 'post', url: `${user.base}/login`, data: data })
            .then((res) => {
                const data = res.data.data
                console.log(data)
                sessionStorage.setItem('token', data.token)
                console.log(sessionStorage['token'])

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