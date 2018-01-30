import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Users from '@/components/Users'
import UserEdit from '@/components/UserEdit'
import Teams from '@/components/Teams'
import TeamEdit from '@/components/TeamEdit'
import Tournaments from '@/components/Tournaments'
import TournamentEdit from '@/components/TournamentEdit'
import Matches from '@/components/Matches'
import MatchEdit from '@/components/MatchEdit'
import MatchScore from '@/components/MatchScore'
import TournamentDashboard from '@/components/TournamentDashboard'
import Login from '@/components/Login'
import store from './../store'

import axios from './../utils/axios'

Vue.use(Router)

var router = new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard,
            meta: {requiresAuth: true}
        },
        {
            path: '/users',
            name: 'Users',
            component: Users,
            meta: {requiresAuth: true}

        },
        {
            path: '/user/create',
            name: 'UserCreate',
            component: UserEdit,
            meta: {requiresAuth: true}

        },
        {
            path: '/user/:id',
            name: 'UserEdit',
            component: UserEdit,
            props: true,
            meta: {requiresAuth: true}

        },
        {
            path: '/teams',
            name: 'Teams',
            component: Teams,
            meta: {requiresAuth: true}

        },
        {
            path: '/team/create',
            name: 'TeamCrate',
            component: TeamEdit,
            meta: {requiresAuth: true}

        },
        {
            path: '/team/:id',
            name: 'TeamEdit',
            component: TeamEdit,
            props: true,
            meta: {requiresAuth: true}

        },
        {
            path: '/tournaments',
            name: 'Tournaments',
            component: Tournaments,
            meta: {requiresAuth: true}

        },
        {
            path: '/tournament/create',
            name: 'TournamentCreate',
            component: TournamentEdit,
            meta: {requiresAuth: true}

        },
        {
            path: '/tournament/:id',
            name: 'TournamentEdit',
            component: TournamentEdit,
            props: true,
            meta: {requiresAuth: true}

        },
        {
            path: '/tournament/:id/dashboard',
            name: 'TournamentDashboard',
            component: TournamentDashboard,
            props: true,
            meta: {requiresAuth: true}

        },
        {
            path: '/matches',
            name: 'Matches',
            component: Matches,
            meta: {requiresAuth: true}

        },
        {
            path: '/match/create',
            name: 'MatchCreate',
            component: MatchEdit,
            meta: {requiresAuth: true}

        },
        {
            path: '/match/:id',
            name: 'MatchEdit',
            component: MatchEdit,
            props: true,
            meta: {requiresAuth: true}

        },
        {
            path: '/match/:id/score',
            name: 'MatchScore',
            component: MatchScore,
            props: true,
            meta: {requiresAuth: true}

        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log(to);
    if(to && to.name !== 'Login'){
        if (store.state.user) {
            next();
        } else {
            axios.get('api/users/currentUser')
                .then(response => {
                    store.commit('user/login', response.data)
                    next()
                })
                .catch(e => {
                    console.log('redirect login');
                    next({path: '/login'});
                })
        }
    } else{
        next();
    }
});

export default router
