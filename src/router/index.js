import Vue from 'vue'
import VueRouter from 'vue-router'
import test from '../components/Test'
import adminlogin from "../components/login";
import Inputtest from "../components/Inputtest";
import end from "../components/end";
import view from "../components/Echarts";
import login from "../components/login2";
Vue.use(VueRouter)

const routes = [
  {
    path:"",
    redirect:'/login'
  },
  {
    path:'/login2',
    component:()=>import('../components/login.vue')
  },
  {
    path:"/admin",
    component:adminlogin
  },
  {
    path:"/view",
    component:view
  },
  {
    path:"/end",
    component:end
  },
    {
    path:"/login",
    component:login
  },
  {
    path: "/test",
    component:test
  },
  {
    path:'/input',
    component:Inputtest
  }

]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
