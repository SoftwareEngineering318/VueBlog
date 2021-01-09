<template>
  <div id="Home">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-home"
        mode="horizontal"
        @select="handleSelect"
        text-color="#000000"
        active-text-color="#38B0DE"
        router>
      <el-menu-item>
        <img src="../assets/images/TJLogo2.png" width="172px" height="66px" style="margin-top: -10px; margin-left: -20px">
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-news"></i>
        首页
      </el-menu-item>
      <el-submenu index="1" :disabled="!isLogin">
        <template slot="title"><i class="el-icon-user"></i>我的</template>
        <el-menu-item :index="info"><i class="el-icon-info"></i>我的资料</el-menu-item>
        <el-menu-item index="/postRecord"><i class="el-icon-document"></i>发言记录</el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-s-custom"></i>我的关注</template>
          <el-menu-item index="/myFollowed"><i class="el-icon-bottom-right"></i>谁关注了我</el-menu-item>
          <el-menu-item index="/myFollow"><i class="el-icon-top-right"></i>我关注了谁</el-menu-item>
        </el-submenu>
        <el-menu-item index="/applyForManager"><i class="el-icon-upload"></i>申请吧务</el-menu-item>
      </el-submenu>
      <el-submenu index="3" :disabled="!isLogin">
        <template slot="title"><i class="el-icon-collection"></i>管理</template>
        <el-menu-item index="/notAllowedToSay"><i class="el-icon-notebook-1"></i>禁言列表</el-menu-item>
        <el-menu-item index="/deletedPost"><i class="el-icon-notebook-2"></i>删帖列表</el-menu-item>
        <el-menu-item index="/applies"><i class="el-icon-files"></i>吧务申请列表</el-menu-item>
        <el-menu-item index="/editManager"><i class="el-icon-edit-outline"></i>吧务增加撤销</el-menu-item>
      </el-submenu>
      <el-menu-item index="/login" style="float: right" :disabled="isLogin">登录/注册</el-menu-item>
      <el-submenu index="4" style="float: right" :disabled="!isLogin">
        <template slot="title">Hello, {{ username }}!</template>
        <el-menu-item @click="logOut()"><i class="el-icon-warning-outline"></i>退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      info: '/userInfo/1854304',
      activeIndex: '/',
      isLogin: false,
      username: 'username'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logOut() {
      this.$axios.get('/logout', {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then( res => {
        this.$store.commit('REMOVE_INFO')
        this.$router.push('/login')
      })
    }
  },
  mounted() {
    //console.log(this.$store.getters.getIsLogin)
    this.isLogin = !this.$store.getters.getIsLogin
    console.log(this.isLogin)
    if(this.isLogin) {
      this.username = this.$store.getters.getUserInfo.username
    }
  }
}
</script>

<style scoped>
.el-menu-home {
  background-color: aliceblue;
}
</style>