import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignIn from '@/components/SignIn'
import Users from '@/components/Users'
import UserEdit from '@/components/UserEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/user/create',
      name: 'UserCreate',
      component: UserEdit
    },
    {
      path: '/user/:id',
      name: 'UserEdit',
      component: UserEdit,
      props : true
    }
  ]
})
