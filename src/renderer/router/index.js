import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginIndex',
      component: require('@/components/login/index').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
