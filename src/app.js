import Koa2 from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static2'
import {System as SystemConfig} from './config'
import path from 'path'
import MainRoutes from './routes'
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch'
import ErrorRoute from './routes/error-route'
import jwt from 'koa-jwt'
import fs from 'fs'
import cors from'koa-cors'
// import PluginLoader from './lib/PluginLoader'
// 设置数据库链接
import './lib/sequelize'
import logger from 'koa-logger'
import ResponseData from './middleware/ResponseData'
import UserAuth from './middleware/UserAuth'
import CorsRequest from './middleware/CorsRequest'

// const Koa2 = require('koa')
// const KoaBody = require('koa-body')
// const KoaStatic = require('koa-static2')
// const System = require('./config')
// const SystemConfig = require('./config')
// const path = require('path')
// const MainRoutes = require('./routes')
// const ErrorRoutesCatch = require('./middleware/ErrorRoutesCatch')
// const ErrorRoute = require('./routes/error-route')
// const jwt = require('koa-jwt')
// const fs = require('fs')
// const cors = require('koa-cors')
// // import PluginLoader from './lib/PluginLoader'
// // 设置数据库链接
// // const './lib/sequelize'
// const logger = require('koa-logger')
// const ResponseData = require('./middleware/ResponseData')
// const UserAuth = require('./middleware/UserAuth')
// const CorsRequest = require('./middleware/CorsRequest')



const app = new Koa2()
const env = process.env.NODE_ENV || 'development' // Current mode

const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'))

//使用koa-cors
app.use(cors())

// if (env === 'development') { // logger
//   /*
//   app.use((ctx, next) => {
//     const start = new Date()
//     return next().then(() => {
//       const ms = new Date() - start
//       console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
//     })
//   })
//   */
//   // 改用koa-logger组件，注释上面代码
//   app.use(logger())
//   // 开发环境用跨域请求，生产环境用反向代理服务器
//   app.use(CorsRequest)
// }

app
  .use(ResponseData)
  .use(ErrorRoutesCatch())
  .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  .use(jwt({ secret: publicKey }).unless({ path: [/^\/public|\/user\/login|\/assets/] }))
  .use(KoaBody({
    multipart: true,
    strict: false,
    formidable: {
      uploadDir: path.join(__dirname, '../assets/uploads/tmp')
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  })) // Processing request
  // .use(PluginLoader(SystemConfig.System_plugin_path))
  .use(UserAuth)
  .use(MainRoutes.routes())
  .use(MainRoutes.allowedMethods())
  .use(ErrorRoute())

app.listen(SystemConfig.API_server_port)

console.log('Now start API server on port ' + SystemConfig.API_server_port + '...')

export default app
