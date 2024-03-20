const express = require('express')
const router = express.Router()
const sql = require('../db/index')

router.get('/', (req, res, next) => {
  try {
    sql.query(
      `SELECT posts.*, users.head_pic, users.username 
       FROM posts 
       JOIN users ON posts.openid = users.openid
       COLLATE utf8mb4_unicode_ci`,
      (error, results) => {
        if (error) {
          console.error('查询失败:', error)
          res
            .status(500)
            .json({ message: 'Failed to retrieve posts with user information' })
        } else {
          console.log('查询成功:', results)
          res.status(200).json(results)
        }
      }
    )
  } catch (error) {
    console.error('Error creating post:', error)
    next(error)
  }
})

module.exports = router
