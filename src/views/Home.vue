<template>
  <div id="Home">
    <el-dialog
        title="请您获悉"
        :visible.sync="dialogVisible"
        width="50%"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false">
      <h1 style="color: red; font-family: 楷体">本贴吧面向同济大学学生，未登录的访客将不能正常使用</h1>
      <div><br/></div>
      <h2>检测到您尚未登录，点击右上角登录按钮即可完成登录认证</h2>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">我已知晓</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      dialogVisible: true
    };
  },
  methods: {

  }
}
</script>

<style scoped>

</style>