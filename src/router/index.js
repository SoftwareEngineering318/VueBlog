import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from "@/views/Home";
import EditInfo from "@/views/EditInfo";
import PostRecord from "@/views/PostRecord";
import MyFollowed from "@/views/MyFollowed";
import MyFollow from "@/views/MyFollow";
import ApplyForManager from "@/views/ApplyForManager";
import NotAllowedToSay from "@/views/NotAllowedToSay";
import EditManager from "@/views/EditManager";
import DeletedPost from "@/views/DeletedPost";
import Applies from "@/views/Applies";
import BlogDetail from "@/views/BlogDetail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/editInfo',
    name: 'EditInfo',
    component: EditInfo
  },
  {
    path: '/postRecord',
    name: 'PostRecord',
    component: PostRecord
  },
  {
    path: '/myfollowed',
    name: 'MyFollowed',
    component: MyFollowed
  },
  {
    path: '/myfollow',
    name: 'MyFollow',
    component: MyFollow
  },
  {
    path: '/applyForManager',
    name: 'ApplyForManager',
    component: ApplyForManager
  },
  {
    path: '/notAllowedToSay',
    name: 'NotAllowedToSay',
    component: NotAllowedToSay
  },
  {
    path: '/editManager',
    name: 'EditManager',
    component: EditManager
  },
  {
    path: '/deletedPost',
    name: 'DeletedPost',
    component: DeletedPost
  },
  {
    path: '/applies',
    name: 'Applies',
    component: Applies
  },
  {
    path: '/blogDetail/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  }
  //{
    //path: '/about',
    //name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
