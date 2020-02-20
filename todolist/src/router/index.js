import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TodoList from '@/components/ToDoList'
import LearnApi from '@/components/LearnApi'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/hellow',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'ToDoList',
      component: TodoList
    },
    {
      path: '/learnapi',
      name: 'LearnAPI',
      component: LearnApi
    }
  ]
})
