<template>
    <div class="box">
        <div class="mask"></div>
        <div class="main">
            <div class="X" @click="returnIndex">
                <svg t="1689138728285" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="3770" width="16" height="16">
                    <path
                        d="M119.233957 66.85913l837.898911 837.898911-52.368365 52.368365-837.898911-837.898911 52.368365-52.368365Z"
                        fill="#fff" p-id="3771"></path>
                    <path
                        d="M957.140461 119.233957l-837.898911 837.898911-52.368365-52.368365 837.898911-837.898911 52.368365 52.368365Z"
                        fill="#fff" p-id="3772"></path>
                </svg>
            </div>
            <div :class="panel_active ? 'container right-panel-active' : 'container'" ref="login_in_up">
                <div class="form-container sign-up-container">
                    <form>
                        <h1>医师注册</h1>
                        <div class="txtb">
                            <input type="text" placeholder="医师姓名" v-model="signUpMsg.name">
                        </div>
                        <div class="txtb">
                            <input type="email" placeholder="邮箱" v-model="signUpMsg.email">
                        </div>
                        <div class="txtb" style="border: none; ">
                            <input type="text" placeholder="验证码" style="width: 60%; border-bottom: 2px solid #adadad;"
                                v-model="captcha">
                            <el-button @click="sendCode" style="width: 38%; padding: 0; margin: 0; height: 100%;"
                                :disabled="disabled">
                                {{ timer === 0 ? "发送验证码" : `${timer}秒后发送` }}
                            </el-button>

                            <!-- <div @click="sendCode">{{timer === 0? "发送验证码": `${timer}秒后发送`}} </div> -->
                        </div>
                        <div class="txtb">
                            <input type="password" placeholder="密码" v-model="signUpMsg.password">
                        </div>
                        <div class="txtb">
                            <input type="password" placeholder="再次确认密码">
                        </div>
                        <button @click="signup" type='button'>注册</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form>
                        <h1>医师登录</h1>
                        <div class="txtb">
                            <input type="text" placeholder="邮箱" v-model="signInMsg.email">
                        </div>
                        <div class="txtb">
                            <input type="password" placeholder="密码" v-model="signInMsg.password">
                        </div>
                        <a href="#">忘记密码？</a>
                        <button @click="signin" type='button'>登录</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>已有账号？</h1>
                            <p>请使用您的账号进行登录</p>
                            <button class="ghost" id="signIn" @click="panel_active = false">登录</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>没有账号?</h1>
                            <p>欢迎注册使用医疗系统</p>
                            <button class="ghost" id="signUp" @click="panel_active = true">注册</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { user, mail } from '../../utils/api'
import { useIntervalFn } from '@vueuse/core'
import { useInitStore } from '../../store/init.js'
import { configProviderProps } from 'element-plus'

const init = useInitStore()
const { returnIndex } = init

const { signUp, login } = user
const { getCapcha } = mail
const captcha = ref('')
const signUpMsg = reactive({
    name: '',
    email: '',
    password: '',
    user_name: 'xxx',
    sex: '1',
})

const signInMsg = reactive({
    email: '',
    password: '',
})
const disabled = computed(() => {
    return signUpMsg.email ? false : true
})
// 控制发送验证码的倒计时效果
const timer = ref(0)
const { pause, resume } = useIntervalFn(() => {
    //每次定时任务 控制时间递减
    if (timer.value <= 0) {
        // 停止递减：停止定时器
        pause()
    } else {
        timer.value -= 1
    }
}, 1000, {
    // 首次是否自动启动定时任务：true（默认值，自动启动），false，不需要自动启动
    immediate: false,
    // 是否延时执行定时任务（false(默认值)，不延时；true表示延时）
    immediateCallback: false
})
// 发送验证码
const sendCode = async () => {
    getCapcha({
        email: signUpMsg.email
    })
    //开启定时效果
    if (timer.value === 0) {
        timer.value = 60
        // 重启定时器
        resume()
    } else {
        return
    }
}

const signup = () => {
    signUp(signUpMsg, captcha.value)
}

const signin = () => {
    login(signInMsg)
   

   
}
//控制是否有这个属性
const panel_active = ref(false)

//登录状态
//sessionStorage.setItem('token','true')

</script>

<style lang="less" scoped>
* {
    box-sizing: border-box;
}

// body {
//     font-family: 'Montserrat', sans-serif;
//     background-image: linear-gradient(120deg, #3498db, #8e44ad);
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;
//     margin: -20px 0 50px;
// }

h1 {
    font-weight: bold;
    margin: 0;
}

p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: .5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

.box {
    position: absolute;
    width: 103.5%;
    height: 100%;
    top: 0;
    left: -3.5%;
    display: flex;
    justify-content: center;
    align-items: center;

    .X {
        position: absolute;
        top: -20px;
        right: -20px;
        z-index: 200;
    }

    .X:hover {
        svg {
            transform: scale(1.3);
        }
    }

    .mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }
}

.main {
    position: absolute;
    width: 768px;
    height: 480px;
   
}

.container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    height: 480px;


    form {
        background: #fff;
        display: flex;
        flex-direction: column;
        padding: 0 50px;
        height: 100%;
        justify-content: center;
        text-align: center;
    }

    // f .social-container {
    //     margin: 20px 0;

    //     a {
    //         border: 1px solid #ddd;
    //         border-radius: 50%;
    //         display: inline-flex;
    //         justify-content: center;
    //         align-items: center;
    //         margin: 0 5px;
    //         height: 40px;
    //         width: 40px;
    //     }

    // }
}

// .form-container .social-container .social-container a:hover {
//     background-color: #eee;
// }

.txtb {
    border-bottom: 2px solid #adadad;
    position: relative;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
        font-size: 15px;
        color: #333;
        border: none;
        width: 100%;
        outline: none;
        background: none;
        padding: 0 3px;
        height: 35px;
    }

    :deep(.el-button.is-disabled, .el-button.is-disabled:hover) {
        background: linear-gradient(120deg, #3498db, #8e44ad);
    }
}


.txtb span::before {
    content: attr(data-placeholder);
    position: absolute;
    top: 50%;
    left: 5px;
    color: #adadad;
    transform: translateY(-50%);
    transition: .5s;
}

.txtb span::after {
    content: '';
    position: absolute;
    left: 0%;
    top: 100%;
    width: 0%;
    height: 2px;
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    transition: .5s;
}


button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
}

button:active {
    transform: scale(.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background: transparent;
    border-color: #fff;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all .6s ease-in-out;

    button {
        background: linear-gradient(120deg, #3498db, #8e44ad);
        border: none;
        background-size: 200%;
        color: #fff;
        transition: .5s;
    }

    button:hover {
        background-position: right;
    }
}


.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;

    a {
        position: relative;
        left: 100px;
    }

    a:hover {
        color: #3498db;
    }
}


.sign-up-container {
    left: 50%;
    width: 50%;
    z-index: 1;
    opacity: 0;
    transform: translateY(100%);
}

.sign-up-container button {
    margin-top: 20px;
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .6s ease-in-out;
    z-index: 100;

    .overlay {
        background-image: linear-gradient(120deg, #3498db, #8e44ad);
        color: #fff;
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        transform: translateY(0);
        transition: transform .6s ease-in-out;

        .overlay-panel {
            position: absolute;
            top: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 40px;
            height: 100%;
            width: 50%;
            text-align: center;
            transform: translateY(0);
            transition: transform .6s ease-in-out;
        }

        .overlay-right {
            right: 0;
            transform: translateY(0);

        }

        .overlay-left {
            transform: translateY(-20%);
        }

    }
}



.container.right-panel-active .sign-in-container {
    transform: translateY(100%);
}

.container.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.container.right-panel-active .sign-up-container {
    transform: translateY(0);
    opacity: 1;
    z-index: 5;
}

.container.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.container.container.right-panel-active .overlay-left {
    transform: translateY(0);
}

.container.container.right-panel-active .overlay-right {
    transform: translateY(-20%);
}
</style>