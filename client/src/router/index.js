import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import SignIn from '@/components/SignIn'
import Users from '@/components/Users'
import UserEdit from '@/components/UserEdit'
import Teams from '@/components/Teams'
import TeamEdit from '@/components/TeamEdit'
import Tournaments from '@/components/Tournaments'
import TournamentEdit from '@/components/TournamentEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
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
    },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams
    },
    {
      path: '/team/create',
      name: 'TeamCrate',
      component: TeamEdit
    },
    {
      path: '/team/:id',
      name: 'TeamEdit',
      component: TeamEdit,
      props : true
    },
    {
      path: '/tournaments',
      name: 'Tournaments',
      component: Tournaments
    },
    {
      path: '/tournament/create',
      name: 'TournamentCreate',
      component: TournamentEdit
    },
    {
      path: '/tournament/:id',
      name: 'TournamentEdit',
      component: TournamentEdit,
      props : true
    }
  ]
})
