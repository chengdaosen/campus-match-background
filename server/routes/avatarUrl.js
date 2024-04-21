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
  // 设置允许跨域请求的源为 http://localhost:5173
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')

  const openid = req.body.openid
  const avatarUrl = 'http://localhost:3000/upload/' + req.file.filename

  // 创建 MySQL 查询
  const selectSqlStr = 'SELECT * FROM users WHERE openId = ?'

  // 查询数据库
  sql.query(selectSqlStr, [openid], function (err, result) {
    if (err) {
      console.error(err)
      res.status(500).send('Database error')
    } else {
      // 检查是否有匹配的 openId
      if (result.length > 0) {
        const updateSqlStr = `UPDATE users SET head_pic = '${avatarUrl}' WHERE openId = '${openid}'`
        sql.query(updateSqlStr, (err, result) => {
          if (err) throw err
          res.json({ avatarUrl })
        })
        console.log('更新新路径', avatarUrl)
      }
    }
  })
})
// 定义路由处理函数
router.get('/:filename', (req, res) => {
  // 获取请求中的文件名参数
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log('55555555555555')
  const filename = req.params.filename

  // 拼接文件的完整路径
  const filePath = path.join(__dirname, '../public/upload/', filename)

  // 使用 Express 的 sendFile 方法发送文件
  res.sendFile(filePath)
})

module.exports = router
