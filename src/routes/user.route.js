import { User } from '../controllers'
import Router from 'koa-router'

const userrouter = new Router({prefix: '/public/users'})
  //.get('/', User.getUsers)
  //.get('/:id', User.getUser)
  .post('/login', User.login)
  .post('/register', User.register)

  // 需要有用户登录权限
const userListapi = new Router({prefix: '/api/v1/user'})
  .get('/', User.getUsers)
  // .get('/:id', User.getUser)
  .get('/my', User.getUser)
  .del('/:id', User.delete)
  .put('/:id', User.update)


export { userrouter, userListapi }
