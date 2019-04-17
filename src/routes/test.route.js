import { Test } from '../controllers'
import Router from 'koa-router'

const router = new Router({prefix: '/api'})
  .get('/:name', Test.Get)
  .post('/post', Test.Post)
  .post('/auth', Test.Auth)
  .put('/:name', Test.Put)
  .del('/:name', Test.Delect)

export default router
