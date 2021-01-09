<template>
  <div>
    <div style="margin: 50px auto; width:50%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item>
          <h2 style="margin-left: 200px;">用户资料</h2>
          <el-button @click="follow(form.ID)" :style="buttonStyle" v-if="!isMe">
            <span style="color: #eeeeee">
              <i class="el-icon-circle-plus"></i>{{buttonText}}
            </span>
          </el-button>
        </el-form-item>
        <el-form-item label="用户昵称:" >
          <el-input v-model="form.name" placeholder="不超过20字" style="width: 250px" :disabled="!isMe"></el-input>
        </el-form-item>
        <el-form-item label="用户性别:">
          <el-select v-model="form.sex" placeholder="点击下拉选择性别" tyle="width: 250px" :disabled="!isMe">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="120px" :inline="true">
        <el-form-item label="用户的密码:" v-if="isMe">
          <el-input v-model="form.pwd" placeholder="不超过20字" style="width: 250px" ></el-input>
        </el-form-item>
        <el-form-item label="用户的年级:">
          <el-select v-model="form.grade" placeholder="点击下拉选择年级" style="width: 250px" :disabled="!isMe">
            <el-option label="大一" value="shanghai"></el-option>
            <el-option label="大二" value="beijing"></el-option>
            <el-option label="大三" value="shanghai"></el-option>
            <el-option label="大四" value="beijing"></el-option>
            <el-option label="研一" value="shanghai"></el-option>
            <el-option label="研二" value="beijing"></el-option>
            <el-option label="研三" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户ID:">
          <el-input v-model="form.regDate" disabled style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="用户类型:">
          <el-input v-model="form.type" disabled style="width: 250px" ></el-input>
        </el-form-item>
        <el-form-item label="用户注册时间:">
          <el-input v-model="form.regDate" disabled style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="用户的家乡:" >
          <el-input v-model="form.hometown" placeholder="介绍一下自己的故乡吧！" style="width: 600px" :disabled="!isMe"></el-input>
        </el-form-item>
        <el-form-item label="用户的兴趣爱好:">
          <el-input type="textarea" v-model="form.habbits" placeholder="介绍一下自己的兴趣爱好吧！" :disabled="!isMe"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm(this.form)" style="margin-left: 320px" v-if="isMe">提交修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      buttonStyle: 'float:right;background-color:#ff7e96;',
      buttonText:'关注此人',
      isMe:false,
      form: {
        ID:'',
        name: '',
        hometown: '',
        type: '',
        sex: '',
        grade: '',
        pwd: '',
        habbits:'',
        regDate:''
      },
      concernCouple:{
        concernID:'',
        concernedID:''
      }
    }
  },
  created() {
    this.userIsMe()
    this.showForm(this.form)
  },
  methods: {
    userIsMe(){
      if(this.$store.getters.getUserInfo.stdID === this.$route.params.userID){
        this.isMe = true
      }
    },
    follow(id){
      this.concernCouple.concernedID = id
      this.concernCouple.concernID = this.$store.getters.getUserInfo.stdID
      switch (this.buttonText){
        case "关注此人":
          this.$axios.post('',this.concernCouple ,{
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res => {
            console.log(res)
            this.$message.success('关注成功！')
            this.buttonText = "取消关注"
            this.buttonStyle = 'float:right;background-color:#E4E7ED;'
          }).catch(res => {
            console.log(res)
            this.$message.error('关注失败！')
          })
          break
        case "取消关注":
          this.$axios.post('',this.concernCouple,{
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res => {
            console.log(res)
            this.$message.success('取消关注成功！')
            this.buttonText = "关注此人"
            this.buttonStyle = 'float:right;background-color:#ff7e96;'
          }).catch(res => {
            console.log(res)
            this.$message.error('取消关注失败！')
          })
          break
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('',this.form ,{
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res => {
            console.log(res)
            this.$message.success('个人资料提交成功！')
            this.showForm(this.form)
          })
              .catch(res => {
                console.log(res)
                this.$message.error('个人资料提交失败！')
              })
        }
      });
    },
    showForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('', this.$store.getters.getUserInfo.stdID, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res => {
            console.log(res)
            this.form = res.data
            this.$message.success('个人资料显示成功！')
          })
          .catch(res => {
            console.log(res)
            this.$message.error('个人资料显示失败！')
          })
        }
      });
    }
  }
}
</script>

<style scoped>

</style>