<template>
  <div id="Home">
    <el-dialog
        title="发布您的贴子"
        :visible.sync="newBlog"
        width="40%"
        style="margin-top: -60px"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px" class="addForm">
        <el-form-item label="贴子标题" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="贴子概述" prop="theme">
          <el-input type="textarea" v-model="addForm.theme"></el-input>
        </el-form-item>
        <el-form-item label="贴子内容" prop="content">
          <mavon-editor v-model="addForm.content"></mavon-editor>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('addForm')">确定发布</el-button>
        <el-button @click="resetForm('addForm');newBlog = false">取消发布</el-button>
      </span>
    </el-dialog>

    <el-container style="height: 690px; border: 1px solid #eee">
      <!--侧边栏，卡片-->
      <el-aside width="290px" style="background-color: #ffffff">
        <el-card class="box-card" style="border-radius: 15px;">
          <div slot="header" class="clearfix">
            <span style="font-size: 25px;font-family: 新宋体">您好！今天是：</span>
          </div>
          <div>
            {{ nowDate }}
            <div class="bottom clearfix">
              <span style="float: left;margin-top: 4px">
                <h5>您的等级：{{yourLevel}}</h5>
                <br/>
                <h5>您的积分：{{yourScore}}</h5>
              </span>
              <el-button :type="buttonType" class="button" style="margin-right: -8px"@click="check()">
                <i :class="iconType"></i>
                {{ buttonContent }}
              </el-button>
            </div>
          </div>
        </el-card>
        <div><br/></div>
        <el-card :body-style="{ padding: '0px' }" style="border-radius: 15px;">
          <img src="../assets/images/TJScene.jpg" class="image">
          <div style="padding: 14px;">
            <span>想与同济校友畅所欲言吗？</span>
            <div class="bottom clearfix">
              <el-button type="primary" class="button" @click="addBlog()">
                <i class="el-icon-document-copy"></i>
                立即发贴
              </el-button>
            </div>
          </div>
        </el-card>
        <div><br/></div>
        <el-card class="box-card" style="border-radius: 15px;">
          <div slot="header" class="clearfix">
            <span style="font-size: 20px">本吧信息</span>
            <el-button style="float: right; padding: 5px 0" type="text">查看详情</el-button>
          </div>
          <div v-for="o in 1" :key="o" class="text item">
            {{'本吧成员数：' + o}}
          </div>
        </el-card>
      </el-aside>

      <el-container>
        <el-main v-loading="loading">
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

          <el-pagination class="mpage"
                         background
                         layout="prev, pager, next"
                         :current-page="currentPage"
                         :page-size="pageSize"
                         :total="total"
                         @current-change="page">
          </el-pagination>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      loginOrNot: false,
      yourLevel: 0, //等级=积分除以100向下取整
      yourScore: 0, //积分
      isChecked: false, //是否签到
      buttonType: 'success',
      iconType: "el-icon-collection-tag",
      buttonContent: '今日签到',
      totalTime: 60*60*24,
      dialogVisible: !this.loginOrNot,
      newBlog: false,
      nowDate: "", // 当前日期
      loading: false, //加载中？
      pageSize: 10,
      total: 0,
      currentPage: 1,
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
      addForm: {
        title: '',
        theme: '',
        content: ''
      },
      addRules: {
        title: [
          { required: true, message: '请输入帖子标题', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        theme: [
          { required: true, message: '请输入帖子概述', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入帖子内容', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    currentTime() {
      setInterval(this.formatDate, 500);
    },
    formatDate() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let week = date.getDay(); // 星期
      let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.nowDate = `${year}/${month}/${day} ${hour}:${minute}:${second} ${weekArr[week]}`;
    },
    page(currentPage) {
      this.$axios.get('' + currentPage).then(res => {
        this.blogs = res.data.data.records
        this.currentPage = res.data.data.current
        this.total = res.data.data.total
        this.pageSize = res.data.data.size
        this.loading = false
      })
    },
    check() {
      if(this.loginOrNot) {
        this.isChecked = true
        this.buttonType = 'info'
        this.buttonContent = '已签到'
        //这里想写一个每天0点重置的逻辑
      } else {
        this.$message.error('您还未登录，请先登录再进行操作！');
      }
    },
    addBlog() {
      //this.newBlog = true
      if(this.loginOrNot) {
        this.newBlog = true
      } else {
        this.$message.error('您还未登录，请先登录再进行操作！');
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('', this.addForm,{
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res => {
            console.log(res)
            this.$alert('发布成功！', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.resetForm(formName)
                this.newBlog = false
                location.reload()
              }
            });
          })
        } else {
          console.log('提交出现了问题');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    if(this.loginOrNot) {
      this.page(1)
    } else {
      this.$notify({
        title: '注意',
        message: '本贴吧仅对同济学生开放，点击页面右上角登录后方可正常使用',
        type: 'warning',
        position: 'bottom-right',
        duration: 0
      });
    }
  },
  mounted() {
    this.loginOrNot = this.$store.getters.getIsLogin
    this.currentTime();
  },
  // 销毁定时器
  beforeDestroy() {
    if (this.formatDate) {
      clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: royalblue;
}
.blogs {
  width: 700px;
  margin: 0 auto;
}
.bottom {
  margin-top: 5px;
  line-height: 10px;
}
.button {
  float: right;
}
.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.mpage {
  text-align: center;
}
</style>