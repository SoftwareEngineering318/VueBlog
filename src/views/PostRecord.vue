<template>
  <div style="margin: 50px auto 120px;width:1200px ">
    <el-tabs v-model="activeName" type="border-card" style="border-radius: 15px">
      <el-tab-pane label="我的发帖" name="first">
        <template >
          <el-col :span="20" >
            <el-timeline class="blogs">
              <el-timeline-item :timestamp="blog.time" placement="top" v-for="blog in blogs" :key="blog">
                <el-card class="box-card" style="border-radius: 20px">
                  <div slot="header" class="clearfix">
                    <span style="color: dimgray">{{ blog.ownerName+'('+blog.ownerID+')'}}</span>
                    <p style="float: right">现有{{ blog.count }}人参与讨论</p>
                  </div>
                  <router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">
                    <h2>{{ blog.title }}</h2>
                  </router-link>
                  <div><br/></div>
                  <p>{{ blog.theme }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </template>
      </el-tab-pane>
      <el-tab-pane label="我的回帖" name="second">
        <template>
          <el-col :span="20" >
            <el-timeline >
              <el-timeline-item :timestamp="reblog.time" placement="top" v-for="reblog in reblogs" :key="reblog">
                <router-link :to="{name: 'BlogDetail', params: {blogId: reblog.blogid}}">
                  <el-card class="box-card" style="border-radius: 20px">
                    <div slot="header" class="clearfix">
                      <span style="color: dimgray">{{ reblog.ownerName+'('+reblog.ownerID+')'}}</span>
                    </div>
                    <p>{{ reblog.floor }}楼</p>
                    <div><br/></div>
                      <h2 style="color: black">{{ reblog.content }}</h2>
                  </el-card>
                </router-link>
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "PostRecord",
  data() {
    return {
      pageSize: 10,
      total: 0,
      currentPage: 1,
      activeName:'first',
      blogs: [
        {
          id: '111',
          title: '啦啦啦',
          ownerID: '1853983',
          ownerName: '晨雨未歇',
          theme: '今天真的很高兴',
          time: '2020-12-29',
          isTop: false,
          count: 2
        }
      ],
      reblogs: [
        {
          blogid: '111',
          ownerName: '俺是回帖人儿',
          floor: '2',
          content: '我是回帖内容',
          ownerID: '1854304',
          time: '2020-12-29',
          isDeleted: false,
        }
      ]
    };
  },
  created() {
    this.showMyBlogForm()
    this.showMyReBlogForm()
  },
  methods:{
    showMyBlogForm() {
      this.$axios.post('', this.$store.getters.getUserInfo.stdID, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res)
        this.blogs = res.data
        this.$message.success('我的发帖获取成功！')
      })
          .catch(res => {
            console.log(res)
            this.$message.error('我的发帖获取失败！')
          })
    },
    showMyReBlogForm() {
      this.$axios.post('', this.$store.getters.getUserInfo.stdID, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res)
        this.reblogs = res.data
        this.$message.success('我的回帖获取成功！')
      })
          .catch(res => {
            console.log(res)
            this.$message.error('我的回帖获取失败！')
          })
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: #eeeeee;
  }
</style>