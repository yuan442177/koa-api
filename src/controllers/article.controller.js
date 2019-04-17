//import md5 from 'md5'
import { Article } from '../models'
// import { User, TodoList } from '../models'
import { createToken, getAuthInfo } from '../services/userAuth.service'
import { currentDateTime, timestamp } from '../tool/dateUtil'

export default {
  getAllArticle: async (ctx) => {
    try {
      let Articles= await Article.findAll({
        attributes: { exclude: ['password', 'is_delete', 'timestamp_at'] } // 不包含的列
      }) 
      ctx.success(Articles)
    } catch (err) {
      ctx.error('查询所有文章出错', err)
    }
  },

  getArticle: async (ctx) => {
    try {
      let ArticleID = ctx.params.id
      console.log(ArticleID)
      const article = await Article.findById(ArticleID)
      //console.log(article)
      if(article != null){
        console.log(article.dataValues)
        ctx.success('查询成功',article)
      }else{
        ctx.success('查无此文',{ArticleID,article})
      }
    } catch (err) {
      ctx.success('查无此文',err)
    }
  },

  createArticle: async (ctx) =>{
    let newarticle = {
      title: ctx.request.body.title,
      content: ctx.request.body.content,
      author: ctx.request.body.author,
      created_at: currentDateTime(),
      updated_at: currentDateTime(),
      is_delete: false,
      timestamp_at: timestamp()
    }
    try {
      const article = await Article.findOne({
        where: {title:ctx.request.body.title}
      })
      if(!article){
        const addarticle = await Article.create(newarticle)
        if(addarticle){
          ctx.success('发文成功',addarticle)
        }else{
          ctx.error('发布失败')
        }

      }else{
        const addarticle = await Article.create(newarticle)
        if(addarticle){
          ctx.success('发文成功，但此标题已存在，建议修改',addarticle)
        }else{
          ctx.error('发布失败')
        }
      }
    } catch (err) {
      ctx.error('发布失败',err)
    }
  },

  updateArticle: async (ctx) =>{

  },

  deleteArticle: async (ctx) =>{

  },

}
