<template>
  <div>
    <el-container>
      <el-main v-loading="loading">
        <el-card class="box-card" style="border-radius: 20px;background-color: azure">
          <div slot="header" class="clearfix">
            <span style="color: dimgray">{{ blog.ownerName+'('+blog.ownerID+')'}}</span>
            <h4 style="float: right">发布于{{ blog.time }}</h4>
          </div>
          <h2>{{ blog.title }}</h2>
          <div><br/></div>
          <p>{{ blog.content }}</p>
        </el-card>

        <div style="height: 50px"></div>

        <el-card class="replyCard" v-for="reBlog in reBlogs" :key="reBlog.floor" style="border-radius: 10px;height: auto">
          <el-container>
            <el-aside width="auto">
              <span>{{ reBlog.floor }}楼</span>
              <el-divider direction="vertical"></el-divider>
              <span style="color: dimgray">{{ reBlog.ownerName+'('+reBlog.ownerID+')'}}</span>
              <h5 style="color: cornflowerblue">{{ reBlog.time }}</h5>
              <el-button type="text" @click="changeIClass()" style="color: red"><i :class=iClass></i>点赞</el-button>
              <el-button type="text" style="color: gray"><i class="el-icon-chat-dot-round"></i>回复</el-button>
            </el-aside>
            <el-main>
              <span>{{ reBlog.content }}</span>
            </el-main>
          </el-container>
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
      iClass: "el-icon-star-off",
      blog: {
        title: '啦啦啦',
        ownerID: '1853983',
        ownerName: '晨雨未歇',
        time: '2020-12-29',
        content: '哈哈哈哈哈'
      },
      reBlogs: [
        {
          floor: 1,
          content: '???',
          ownerID: '1854304',
          ownerName: 'BigRedRed',
          time: '2021-01-06 12:00'
        },
        {
          floor: 2,
          content: '多少沾点',
          ownerID: '1853830',
          ownerName: '±申',
          time: '2021-01-06 13:15'
        }
      ]
    }
  },
  methods: {
    changeIClass() {
      if(this.iClass === "el-icon-star-off") {
        this.iClass = "el-icon-star-on"
      } else {
        this.iClass = "el-icon-star-off"
      }
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
      let MarkdownIt = require('markdown-it')
      let md = new MarkdownIt()
      this.blog.content = md.render(blog.content)

      //待定
      this.reBlogs = res.data.data
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