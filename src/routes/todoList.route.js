import { TodoList } from '../controllers'
import Router from 'koa-router'

// 不需要用户登录权限
const todoListPub = new Router({prefix: '/public/v1/todolist'})
  .get('/', TodoList.todoPages)
  // .get('/:id', Test.Post)

// 需要有用户登录权限
const todoListAPI = new Router({prefix: '/api/v1/todolist'})
  .post('/', TodoList.addTodo)
  .put('/:id', TodoList.updateTodo)
  .del('/:id', TodoList.delTodo)

export { todoListPub, todoListAPI }
