import md5 from 'md5'
import { User } from '../models'
// import { User, TodoList } from '../models'
import { createToken, getAuthInfo } from '../services/userAuth.service'
import { currentDateTime, timestamp } from '../tool/dateUtil'

/*
export let findAllUser = async (ctx) => {
  let users = await models.user.User.findAll()
  ctx.body = users
}

export let findOneById = async (ctx) => {
  // let user = await models.user.User.findById(ctx.query.id)
  // ctx.body = user
  var userid = ctx.query.id
  try {
    const user = await models.user.User.findById(userid)
    user ? ctx.success(user) : ctx.notFound('不能找到用户检查id', {id: userid})
  } catch (err) {
    ctx.error(err.toString(), {id: userid})
  }
}
*/
export default {
  getUsers: async (ctx) => {
    try {
      let users = await User.findAll({
        attributes: { exclude: ['password', 'is_delete', 'timestamp_at'] } // 不包含的列
      }) // 没有关联关系
      // let users = await User.findAll({
      //   include: [ TodoList ], // 关联表不带查询条件
      //   // include: [{
      //   //   TodoList,
      //   //   where: { id: 2 } // 关联表带查询条件,查询条件不好用。不知道为什么
      //   // }],
      //   where: {
      //     id: 1 // 查询user表的条件
      //   }
      // }) // 有关联关系1:m
      ctx.success(users)
    } catch (err) {
      ctx.error('查询全部用户出错', err)
    }
  },

  getUser: async (ctx) => {    
    console.log('输出header:'+JSON.stringify(ctx.header))
    try {
      const ut = ctx.header.authorization
      console.log(ut)
      // const ut = a
      const userInfo = getAuthInfo(ut)
      ctx.success(userInfo)
      //ctx.body = {userInfo}
      console.log('输出userInfo:'+ JSON.stringify(userInfo))
    } catch (error) {
      console.log('err:'+error)
      ctx.error('查询用户出错', error)
    }
    //let userid = ctx.params.id
    // const token = ctx.header.authorization  // 获取jwt
    // console.log(token)
    //     let payload
    //     if (token) {
    //         payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
    //         ctx.success = {
    //             payload
    //         }
    //     } else {
    //       ctx.error = {
    //             message: 'token 错误',
    //             code: -1
    //         }
    //     }

    // try {
    //   const user = await User.findById(userid)
    //   user ? ctx.success(user) : ctx.notFound('用户不存在', {id: userid})
    // } catch (err) {
    //   ctx.error('查询用户出错', err, {id: userid})
    // }
  },

  login: async (ctx) => {
    let username = ctx.request.body.username
    let password = md5(ctx.request.body.password)
    try {
      const user = await User.findOne({
        attributes: ['id', 'username', 'email'],
        where: {username, password, is_delete: false}
      })
      if (user) {
        // 取得用户数据,根据model的dataValues属性
        const u = user.dataValues
        // 用户登陆后只返回token,客户端根据token取得用户信息
        const token = createToken(u)
        const usertoken = 'Bearer '+token
        // ctx.append('authorization','Bearer '+token);
        ctx.success({ usertoken }, '用户登录成功')
      } else {
        ctx.notFound('用户名或者密码错误!', {username, password})
      }
    } catch (err) {
      ctx.error('用户登录出错', err, {username, password})
    }
  },

  register: async (ctx) => {
    let newUser = {
      username: ctx.request.body.username,
      password: md5(ctx.request.body.password),
      email: ctx.request.body.email,
      created_at: currentDateTime(),
      updated_at: currentDateTime(),
      is_delete: false,
      timestamp_at: timestamp()
    }
    try {
      const user = await User.findOne({
        attributes: ['username'],
        where: {username:ctx.request.body.username}
      })
      if(!user || user == null || user == ""){
      console.log('111'+user)
      await User.create(newUser)
      console.log(newUser)
      ctx.success(null, '用户注册成功')
      }else{
        console.log('222'+user)
        ctx.success('用户名已被注册', newUser)
      }
    } catch (err) {
      console.log(newUser)
      ctx.error('用户注册出错', err, newUser)
    }
  },

  delete: async (ctx) => {
    let userId = ctx.params.id
    console.log(userId)
    try {
      const user = await User.destroy({
        where:{
          id:userId
        }
      })
      console.log(user)
      if(user){
        ctx.success('删除成功',user,userId)
      }else{
        ctx.error('删除失败', error, userId)
      }
    } catch (error) {
      ctx.error('删除失败', error, userId)
    }
  },

  update: async (ctx) => {
    let userid = ctx.params.id
    try {
      const user = await User.findById(userid)
      //console.log('findById'+JSON.stringify(user))
      if(user){
        const upUser =  User.update({
          username: ctx.request.body.username,
          password: md5(ctx.request.body.password),
          email: ctx.request.body.email,
          updated_at: currentDateTime()
        },{
          where:{
            id:userid
          }
        })
        //console.log('upuser'+JSON.stringify(upUser))
        ctx.success('更新成功',upUser)
      }else{
        ctx.error('更新失败',upUser )
      }
    } catch (err) {
      ctx.error('查询用户出错', err, {id: userid})
    }
  }

}
