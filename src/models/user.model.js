import {Sequelize, db} from '../lib/sequelize'
// import moment from 'moment'

const User = db.define('user', {
  username: { // 用户名
    type: Sequelize.STRING(50)
    // unique: true
  },
  password: { // 密码
    type: Sequelize.STRING
  },
  email: { // 邮件
    type: Sequelize.STRING(50)
  },
  phone_number: { // 手机号
    type: Sequelize.STRING(50),
    defaultValue: null,
    validate: {
      isNumeric: true // 只能使用数字
    }
  },
  head_img: { // 头像URL
    type: Sequelize.STRING
  },
  created_at: { // 创建日期时间
    type: Sequelize.STRING(30)
  },
  updated_at: { // 更新日期时间
    type: Sequelize.STRING(30)
  },
  is_delete: { // 用户是否删除
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  timestamp_at: { // 更新时的时间戳
    type: Sequelize.BIGINT
  }
},
{
  timestamps: false,
  comment: '用户信息表'
})
// 创建当前表结构,不会添加外键
// User.sync({force: true})
User.sync()
/**/
// force: true will drop the table if it already exists
// 创建表结构并且增加一条数据
// User.sync({force: true}).then(() => {
//   // Table created
//   return User.create({
//     username: '小明',
//     password: 'Hancock',
//     email: 'xiao@163.com',
//     created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
//     updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
//     is_delete: false,
//     timestamp_at: moment().format('X')
//   })
// })

export default User
