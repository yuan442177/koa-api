import {Sequelize, db} from '../lib/sequelize'
// import moment from 'moment'

const Article = db.define('article', {
  title: { // 标题
    type: Sequelize.STRING(50)
    // unique: true
  },
  content: { // 正文
    type: Sequelize.TEXT
  },
  author: { // 作者
    type: Sequelize.STRING(50)
  },
  S_img: { // 缩略图
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
  comment: '游戏攻略文章信息表'
})
Article.sync()

export default Article
