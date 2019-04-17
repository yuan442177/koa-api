import {Sequelize, db} from '../lib/sequelize'

const Todolist = db.define('todolist', {
  title: { // 事项标题
    type: Sequelize.STRING(200)
  },
  content: { // 事项内容
    type: Sequelize.STRING(1000)
  },
  start_end: { // 事项开始和截止日期
    type: Sequelize.STRING(50)
  },
  importance: { // 事项重要性 1-5
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  is_complete: { // 事项是否完成
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  created_at: { // 创建日期时间
    type: Sequelize.STRING(30)
  },
  updated_at: { // 更新日期时间
    type: Sequelize.STRING(30)
  },
  timestamp_at: { // 更新时的时间戳
    type: Sequelize.BIGINT
  }
},
{
  timestamps: false,
  comment: '事项列表信息表'
})
// 创建当前表结构,不会添加外键
Todolist.sync()

export default Todolist
