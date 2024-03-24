const express = require('express')
const router = express.Router()
const sql = require('../db/index')

router.post('/', (req, res, next) => {
  const { content, openid, tag, createTime } = req.body
  try {
    // 将内容存储在数据库中，并包含openid
    sql.query(
      'INSERT INTO posts (content, openid,tag,createTime) VALUES (?, ?, ? ,?)',
      [content, openid, tag, createTime],
      (error, results) => {
        if (error) {
          console.error('存入数据库失败:', error)
          res.status(500).json({ message: 'Failed to create post' })
        } else {
          console.log('数据存储成功')
          res.status(200).json({ message: 'Post created successfully' })
        }
      }
    )
  } catch (error) {
    // 发生错误时返回错误信息，并传递给全局错误处理程序
    console.error('Error creating post:', error)
    next(error) // 将错误传递给全局错误处理程序
  }
})

module.exports = router
