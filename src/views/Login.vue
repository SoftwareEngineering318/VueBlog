<template>
  <div id="backImg">
    <div class="loginCard">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img class="backlogo" src="../assets/images/TJLogo.png">
          <h2 style="font-family: 楷体">同舟共济贴吧</h2>
        </div>
        <div class="infoForm">
          <el-form key="loginFormKey" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="60px" class="loginForm" v-if="isLogin">
            <el-form-item label="学号" prop="stdID">
              <el-input v-model="loginForm.stdID"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
              <el-button @click="resetForm('loginForm')" style="margin-left: 20px">清空输入</el-button>
            </el-form-item>
          </el-form>
          <a class="linkto" @click="changeLogin()" v-if="isLogin">还没有账号？点此注册 >></a>


          <el-form key="conFormKey" :model="conForm" :rules="conRules" ref="conForm" label-width="70px" class="conForm" v-if="!isLogin && !isChecked">
            <el-form-item label="学号" prop="stdID">
              <el-input v-model="conForm.stdID"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="checkCode">
              <el-input v-model="conForm.checkCode" style="width: 110px"></el-input>
              <el-button :type=buttonType @click="sendConfirmCode()" style="margin-left: 10px; width: 130px">{{ content }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('conForm')">确定验证</el-button>
              <el-button @click="changeLogin()">返回登录</el-button>
            </el-form-item>
          </el-form>

          <el-form key="regFormKey" :model="regForm" :rules="regRules" ref="regForm" label-width="80px" class="regForm" v-if="isChecked">
            <el-form-item label="学号" prop="stdID">
              <el-input v-model="regForm.stdID" disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="您的密码" prop="password">
              <el-input type="password" v-model="regForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPwd">
              <el-input type="password" v-model="regForm.confirmPwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('regForm')">立即注册</el-button>
              <el-button @click="changeLogin()">返回登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('学号不能为空'));
      } else if(value.length !== 7){
        callback(new Error('学号由7位数字组成'))
      } else {
        callback();
      }
    };
    let validatePass0 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if(value.length<6 || value.length>16){
        callback(new Error('密码长度6~16个字符'));
      }
    };
    let validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if(value.length<6 || value.length>16){
        callback(new Error('密码长度6~16个字符'));
      } else {
        if (this.regForm.confirmPwd !== '') {
          this.$refs.regForm.validateField('confirmPwd');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isLogin: true,
      isChecked: false,
      buttonType: 'success',
      content: '发送验证码 >>',
      totalTime: 60,
      canClick: true,
      loginForm: {
        stdID: '',
        password: '',
      },
      conForm: {
        stdID: '',
        checkCode: '',
      },
      regForm: {
        stdID: '',
        password: '',
        confirmPwd: ''
      },
      loginRules: {
        stdID: [
          { validator: checkName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass0, trigger: 'blur' }
        ]
      },
      conRules: {
        stdID: [
          { validator: checkName, trigger: 'blur' }
        ],
        checkCode: [
          { required: true, message: '请输入您收到的验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码长度为6个字符', trigger: 'blur' }
        ]
      },
      regRules: {
        stdID: [],
        password: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        confirmPwd: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(formName === 'conForm') {
            //alert('验证码正确！');
            this.regForm.stdID = this.conForm.stdID
            this.isChecked = true
          } else if(formName === 'loginForm') {
            this.$axios.post('', this.loginForm).then(res => {  //这里填写后端的地址
              const jwt = res.headers['authorization']
              const isLogin = true
              const userInfo = res.data.data

              //共享数据
              this.$store.commit("SET_TOKEN", jwt)
              this.$store.commit("SET_ISLOGIN", isLogin)
              this.$store.commit("SET_USERINFO", userInfo)

              //登录后跳转到首页
              this.backToHome()
            })
          } else {
            this.$axios.post('', this.regForm).then(res => {

            })
          }
        } else {
          if(formName === 'conForm') alert('验证码错误！');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeLogin() {
      this.isLogin = !this.isLogin;
      this.isChecked = false;
    },
    backToHome() {
      this.$router.push("/");
    },
    sendConfirmCode() {
      if (!this.canClick) return;  //改动的是这两行代码
      this.buttonType = 'info';
      this.canClick = false;
      this.content = this.totalTime + 's后重新发送';
      //这里写邮件发送的逻辑
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + 's后重新发送';
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = '重新发送 >>';
          this.totalTime = 60;
          this.canClick = true;  //这里重新开启
          this.buttonType = 'warning';
        }
      },1000)
    }
  }
}
</script>

<style scoped>
#backImg{
  margin: 0;
  background-image: url("../assets/images/TJBack.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.loginCard {
  padding: 60px 0;
}

.clearfix {
  text-align: center;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 450px;
  margin: auto;
  background: rgba(255,255,255,0.7);
}

.backlogo {
  width: 65%;
  display: inline-block;
}

.loginForm {
  max-width: 320px;
  margin: 0 auto;
}

.conForm {
  max-width: 320px;
  margin: 0 auto;
}

.regForm {
  max-width: 320px;
  margin: 0 auto;
}

.linkto {
  margin-left: 220px;
  color: #0000ff;
}
</style>