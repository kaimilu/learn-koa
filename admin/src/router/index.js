import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

Vue.use(Router)

import Main from '../components/Main'

export default new Router({
    model: 'history',
    scrollBehavior: function(to, from, savedPosition) {
        return savedPosition || {
            x: 0,
            y: 0
        }
    },
    routes: [{
        path: '/',
        name: 'Hello',
        component: Main
    }]
})