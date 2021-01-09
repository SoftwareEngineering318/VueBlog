<template>
  <div style="margin: 0 auto;width: 800px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span  style="" >我的粉丝</span>
      </div>
      <div v-for="myFollowed in myFolloweds" :key="myFollow" class="text item">
        <span style="font-family: 微软雅黑;font-weight: bold;font-size: large">{{ myFollowed.name}}</span>
        <span >({{ myFollowed.id}})</span>
        <el-divider direction="vertical"></el-divider>
        <span style="font-family: 微软雅黑;">{{ myFollowed.sex}}</span>
        <el-divider direction="vertical"></el-divider>
        <span style="font-family: 微软雅黑;">{{ myFollowed.type}}</span>
        <el-divider direction="vertical"></el-divider>
        <span style="font-family: 微软雅黑;">{{ myFollowed.grade}}</span>
        <router-link :to="{name: 'UserInfo', params: {userID: myFollowed.id}}">
          <el-button type="info" style="float: right" round>进入ta的主页</el-button>
        </router-link>
        <el-divider></el-divider>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MyFollowed",
  data(){
    return{
      myFolloweds:[
        {
          id:'1853983',
          name:'黄爸爸',
          type:'吧务',
          sex:'女',
          grade:'研一'
        },
        {
          id:'1853830',
          name:'坤孙子',
          type:'普通用户',
          sex:'中性',
          grade:'研二'
        }
      ]
    };
  },
  created() {
    this.showMyFollowed()
  },
  methods: {
    showMyFollowed(){
      this.$axios.post('', this.$store.getters.getUserInfo.stdID, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res)
        this.myFolloweds = res.data
        this.$message.success('我的关注获取成功！')
      })
          .catch(res => {
            console.log(res)
            this.$message.error('我的关注获取失败！')
          })
    },
    deleteMyFollowed(id){
      this.$axios.post('', id, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res)
        this.showMyFollowed()
        this.$message.success('已取消该关注！')
      })
          .catch(res => {
            console.log(res)
            this.$message.error('取消该关注失败！')
          })
    }
  }
}
</script>

<style scoped>

</style>