import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    isLogin: false,
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  mutations: {
    // set
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token",token)
    },
    SET_ISLOGIN: (state, isLogin) => {
      state.isLogin = isLogin
      sessionStorage.setItem("isLogin", isLogin)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    REMOVE_INFO: state => {
      state.token = ''
      state.isLogin = false
      state.userInfo = {}
      localStorage.setItem("token", '')
      sessionStorage.setItem("isLogin", state.isLogin)
      sessionStorage.setItem("userInfo", JSON.stringify(''))
    }
  },
  getters: {
    getUserInfo: state => {
      return state.userInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
