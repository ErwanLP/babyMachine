// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import 'bootstrap'

import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css'

Vue.config.productionTip = false

Vue.mixin({
    methods: {
        dateToShortISOString: function (string) {
            let date = new Date(string)

            function pad (number) {
                if (number < 10) {
                    return '0' + number
                }
                return number
            }

            return date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate())
        },
        hasRight (right) {
            return store.getters['user/hasRight'](right)
        }
    },
    computed: {
        me: () => {
            return store.getters['user/me']
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    store: store,
    template: '<App/>'
})
