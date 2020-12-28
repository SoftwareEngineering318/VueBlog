import axios from "axios";
import Element from 'element-ui'
import router from './router'
import store from './store'

axios.defaults.baseURL = ""

// 前置拦截
axios.interceptors.request.use(config => {
    return config
})

// 后置拦截，主要为了用户友好
axios.interceptors.response.use(response => {
    let res = response.data

    if(res.code === 200)
        return response
    else if(res.code === 101) {
        Element.Message.error("密码不正确！", {duration: 3*1000})
    }
    else {
        Element.Message.error("登录失败！", {duration: 3*1000})
    }

    return Promise.reject(response.data.msg)    //返回错误信息
},
error => {
    console.log(error)
    if(error.response.data) {
        error.message = error.response.data.msg
    }

    if(error.response.status === 401) {
        store.commit("REMOVE_INFO")
        router.push("/login")
    }

    Element.Message.error(error.message, {duration: 3*1000})
    return Promise.reject(error)
})