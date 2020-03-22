import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Stock from '@/components/pages/Stock'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingMall',
      component: ShoppingMall
    },
    {
      path:'/register',
      name: 'Register',
      component: Register
    },
    {
      path:'/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/stock',
      name: 'stock',
      component:Stock
    },
    {
      path: '/goods',
      name: 'goods',
      component:Goods
    },
    {
      path: '/CategoryList',
      name: 'CategoryList',
      component:CategoryList
    }
  ]
})
