<template>
  <div style="margin: 0 auto;width: 800px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span  style="" >我的关注</span>
      </div>
      <div v-for="myFollow in myFollows" :key="myFollow" class="text item">
        <span style="font-family: 微软雅黑;font-weight: bold;font-size: large">{{ myFollow.name}}</span>
        <span >({{ myFollow.id}})</span>
        <el-divider direction="vertical"></el-divider>
        <span style="font-family: 微软雅黑;">{{ myFollow.sex}}</span>
        <el-divider direction="vertical"></el-divider>
        <span style="font-family: 微软雅黑;">{{ myFollow.type}}</span>
        <el-divider direction="vertical"></el-divider>
        <span style="font-family: 微软雅黑;">{{ myFollow.grade}}</span>
        <router-link :to="{name: 'UserInfo', params: {userID: myFollow.id}}">
          <el-button type="info" style="float: right" round>进入ta的主页</el-button>
        </router-link>
        <el-button style="float: right;margin-right: 10px" type="danger" round @click="deleteMyFollows(myFollow.id)">取消关注</el-button>
        <el-divider></el-divider>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MyFollow",
  data(){
    return{
      myFollows:[
        {
          id:'1853983',
          name:'胡儿子',
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
    this.showMyFollows()
  },
  methods: {
    showMyFollows(){
      this.$axios.post('', this.$store.getters.getUserInfo.stdID, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res)
        this.myFollows = res.data
        this.$message.success('我的关注获取成功！')
      })
      .catch(res => {
        console.log(res)
        this.$message.error('我的关注获取失败！')
      })
    },
    deleteMyFollows(id){
      this.$axios.post('', id, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res)
        this.showMyFollows()
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