<template>
  <div>
    <el-container>
      <el-main v-loading="loading">
        <el-card class="box-card" style="border-radius: 20px;background-color: azure">
          <div slot="header" class="clearfix">
            <router-link :to="{name: 'UserInfo', params: {userID: blog.ownerID}}">
              <span style="color: dimgray">{{ blog.ownerName+'('+blog.ownerID+')'}}</span>
            </router-link>
            <h4 style="float: right">发布于{{ blog.time }}</h4>
          </div>
          <h2>{{ blog.title }}</h2>
          <div><br/></div>
          <p>{{ blog.content }}</p>
          <el-button type="text" @click="reply()" style="float: right;">{{ replyType }}</el-button>
          <el-button type="text" @click="isReplying = false;replyType = '回复楼主'" style="float: right;margin-right: 10px" v-if="isReplying">收起</el-button>
          <el-form :model="replyForm" :rules="replyRules" ref="replyForm" v-if="isReplying">
            <!--表单将按钮覆盖了-->
            <div><br/><br/></div>
            <el-form-item prop="content">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入您的回复" v-model="replyForm.content"></el-input>
            </el-form-item>
          </el-form>
        </el-card>

        <div style="height: 50px"></div>

        <el-card class="replyCard" v-for="reBlog in reBlogs" :key="reBlog.floor" style="border-radius: 10px;height: auto">
          <el-row :gutter="20">
            <el-col :span="8">
              <span>{{ reBlog.floor }}楼</span>
              <el-divider direction="vertical"></el-divider>
              <router-link :to="{name: 'UserInfo', params: {userID: reBlog.ownerID}}">
                <span style="color: dimgray">{{ reBlog.ownerName+'('+reBlog.ownerID+')'}}</span>
              </router-link>
              <div><br/></div>
              <h5 style="color: cornflowerblue">{{ reBlog.time }}</h5>
            </el-col>
            <el-col :span="12"><span style="font-family: 宋体">{{ reBlog.content }}</span></el-col>
            <el-col :span="4">
              <div style="height: 12px"></div>
              <el-button type="text" @click="changeIClass()" style="color: red"><i :class=iClass></i>点赞</el-button>
              <el-button type="text" style="color: gray"><i class="el-icon-chat-dot-round"></i>回复</el-button>
            </el-col>
          </el-row>
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
      replyType: "回复楼主",
      isReplying: false,
      iClass: "el-icon-star-off",
      pageSize: 10,
      total: 0,
      currentPage: 1,
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
          content: '多少沾点那啥',
          ownerID: '1853830',
          ownerName: '±申',
          time: '2021-01-06 13:15'
        }
      ],
      replyForm: {
        content: ''
      },
      replyRules: {
        content: [
          { required: true, message: '回复不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changeIClass() {
      if(this.iClass === "el-icon-star-off") {
        this.iClass = "el-icon-star-on"
      } else {
        this.iClass = "el-icon-star-off"
      }
    },
    submitForm(formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('', this.replyForm).then(res => {
            this.$message.success('回复成功！')
            this.replyType = "回复楼主";
            this.isReplying = !this.isReplying
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    reply() {
      switch (this.replyType) {
        case "回复楼主":
          this.replyType = "提交回复";
          this.isReplying = !this.isReplying;
          break;
        case "提交回复":
          this.submitForm('replyForm')
          break;
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

      this.reBlogs = res.data.data

      this.loading = false
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
a {
  text-decoration: white;
}
</style>