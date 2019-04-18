//import md5 from 'md5'
import { Article } from '../models'
// import { User, TodoList } from '../models'
import { createToken, getAuthInfo } from '../services/userAuth.service'
import { currentDateTime, timestamp } from '../tool/dateUtil'
import { Sequelize } from '../lib/sequelize'


export default {
  getAllArticle: async (ctx) => {
    const Op = Sequelize.Op
    try {
      let pid = ctx.request.querystring// 获取get参数：hs 也是获取url参数Article?hs={}
      console.log('pid:'+pid)
      if(pid == 'hs'){
        console.log('false')
        let Articles= await Article.findAll({
          attributes: { exclude: ['password', 'is_delete', 'timestamp_at'] }, // 不包含的列
          where:{
            is_delete:{
              [Op.not]: false
            }
          }
        }) 
        ctx.success(Articles)
      }else if(pid == undefined || pid ==null || pid == ' '){
        console.log('true')
        let Articles= await Article.findAll({
          attributes: { exclude: ['password', 'is_delete', 'timestamp_at'] }, // 不包含的列
          where:{
            is_delete:{
              [Op.not]: true
            }
          }
        }) 
        ctx.success(Articles)
      }else{
        ctx.error('请求参数错误')
      }
    } catch (err) {
      ctx.error('查询所有文章出错', err)
    }
  },

  getArticle: async (ctx) => {
    try {
      let ArticleID = ctx.params.id
      console.log('ArticleID:'+ArticleID)
      const article = await Article.findOne({
        where:{
          id:ArticleID
        }
      })
      //console.log(article)
      if(article != null){
        console.log(article.dataValues)
        ctx.success('查询成功',article)
      }else{
        console.log(article.dataValues)
        ctx.success('查无此文',article)
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
    let uparticle = {
      title: ctx.request.body.title,
      content: ctx.request.body.content,
      author: ctx.request.body.author,
      created_at: currentDateTime(),
      updated_at: currentDateTime(),
      is_delete: false,
      timestamp_at: timestamp()
    }

  },

  deleteArticle: async (ctx) =>{

  },

}
