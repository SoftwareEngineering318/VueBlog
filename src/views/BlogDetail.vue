<template>
  <div>
    <el-container>
      <el-main v-loading="loading">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="color: deepskyblue">{{ blog.ownerName+'('+blog.ownerID+')'}}</span>
            <h4 style="float: right">发布于{{ blog.time }}</h4>
          </div>
          <h2>{{ blog.title }}</h2>
          <div><br/></div>
          <p>{{ blog.content }}</p>
        </el-card>

        <el-card class="replyCard" v-for="reBlog in reBlogs" :key="reBlog">
          <div slot="header" class="clearfix">
            <span style="color: deepskyblue">{{ blog.ownerName+'('+blog.ownerID+')'}}</span>
            <h4 style="float: right">发布于{{ blog.time }}</h4>
          </div>
          <h2>{{ blog.title }}</h2>
          <div><br/></div>
          <p>{{ blog.content }}</p>
        </el-card>
      </el-main>
    </el-container>

  </div>
</template>

<script>
export default {
  name: "BlogDetail",
  data() {
    return {
      loading: false,
      blog: {
        title: '啦啦啦',
        ownerID: '1853983',
        ownerName: '晨雨未歇',
        time: '2020-12-29',
        content: '哈哈哈哈哈'
      },
      reBlogs: [
        {

        }
      ]
    }
  },
  created() {
    const blogId = this.$route.params.blogId
    this.$axios.get('/blog/' + blogId).then(res => {
      const blog = res.data.data
      this.blog.title = blog.title
      this.blog.ownerID = blog.ownerID
      this.ownerName = blog.ownerName
      this.blog.time = blog.time

      //转换为md格式
      var MarkdownIt = require('markdown-it')
      var md = new MarkdownIt()
      var result = md.render(blog.content)
      this.blog.content = result
    })
  }
}
</script>

<style scoped>
.box-card {
  width: 50%;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.replyCard {
  width: 50%;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>