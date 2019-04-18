import { Article } from '../controllers'
import Router from 'koa-router'

// 不需要用户登录权限
const articlePublic = new Router({prefix: '/public/v1/Article'})
  .get('/', Article.getAllArticle)
  .get('/:id', Article.getArticle)
  .post('/addArticle', Article.createArticle)

// 需要有用户登录权限
const articleApi = new Router({prefix: '/api/v1/Article'})
  .get('/', Article.getAllArticle)
  .get('/:pid', Article.getAllArticle)
  .get('/:id', Article.getArticle)
  .post('/addArticle', Article.createArticle)

export { articlePublic, articleApi }