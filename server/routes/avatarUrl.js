const express = require('express')
const router = express.Router()
const sql = require('../db/index')
const path = require('path')
const multer = require('multer')

// 设置文件上传的目录
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/upload/'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage: storage })

router.post('/', upload.single('file'), (req, res) => {
  const openid = req.body.openid
  const avatarUrl = 'http://localhost:3000/upload/' + req.file.filename

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173') // 允许跨域请求的源
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') // 允许跨域请求的方法
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // 允许跨域请求的头部

  // 创建MySQL查询
  const sqlStr = 'SELECT * FROM users WHERE openId = ?'

  // 查询数据库
  sql.query(sqlStr, [openid], function (err, result) {
    if (err) {
      console.error(err)
      res.status(500).send('Database error')
    } else {
      // 检查是否有匹配的openId
      if (result.length > 0) {
        const sqlStr = `UPDATE users SET head_pic = '${avatarUrl}' WHERE openId = '${openid}'`
        sql.query(sqlStr, (err, result) => {
          if (err) throw err
          res.json({ avatarUrl })
        })
        console.log('更新新路径', avatarUrl)
      }
    }
  })
})

module.exports = router
