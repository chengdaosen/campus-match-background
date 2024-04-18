const express = require('express')
const router = express.Router()
const sql = require('../db/index')

router.post('/', async (req, res, next) => {
  const { postId, openId, tag } = req.body
  try {
    // 执行数据库查询
    await setComplain(postId, openId, tag)
    // 返回成功消息给前端
    res.status(200).json({ message: 'Complain set successfully' })
  } catch (error) {
    console.error('Error setting complain:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

async function setComplain(postId, openId, tag) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO complain (postId, openId, tag) VALUES (?, ?, ?)'
    sql.query(query, [postId, openId, tag], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = router
