<template>
  <div style="margin: 100px auto; width:1000px">
    <h1 style="margin-left: 435px">申请吧务</h1>
    <div><br /></div>
    <div><br /></div>
    <div><br /></div>
    <el-form ref="form" :model="form" label-width="120px" :inline="true">
      <mavon-editor v-model="form.content" style="width: 1000px"></mavon-editor>
      <div><br /></div>
      <el-form-item>
        <el-button type="primary" @click="submitForm()" style="margin-left: 445px">提交修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ApplyForManager",
  data() {
    return {
      form: {
        applyUID:'',
        content:''
      }
    }
  },
  created() {
    this.form.applyUID = this.$store.getters.getUserInfo.stdID
  },
  methods:{
    submitForm(){
      this.$axios.post('',this.form ,{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res)
        this.$message.success('发送申请成功！')
      }).catch(res => {
        console.log(res)
        this.$message.error('发送申请失败！')
      })
    }
  }
}
</script>

<style scoped>

</style>