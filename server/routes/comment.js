const express = require('express')
const router = express.Router()
const sql = require('../db/index')

// 添加 POST 请求，用于添加评论
router.post('/', async (req, res, next) => {
  const { postId, openId, username, text } = req.body

  try {
    // 执行数据库查询
    const result = await addComment(postId, openId, username, text)
    console.log('Result:', result) // 等待查询结果
    res.status(200).json(result)
  } catch (error) {
    console.error('Error adding comment:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// 添加 GET 请求，用于获取所有评论
router.get('/', async (req, res, next) => {
  try {
    // 执行数据库查询
    const comments = await getAllComments()
    console.log('Comments:', comments) // 等待查询结果
    res.status(200).json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

async function addComment(postId, openId, username, text) {
  return new Promise((resolve, reject) => {
    const query =
      'INSERT INTO comment (postId, openId, username, text) VALUES (?, ?, ?, ?)'
    const values = [postId, openId, username, text]

    sql.query(query, values, (error, results) => {
      if (error) {
        reject(error) // 如果查询出错，返回错误信息
      } else {
        resolve(results) // 如果查询成功，返回查询结果
      }
    })
  })
}

async function getAllComments() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM comment'

    sql.query(query, (error, results) => {
      if (error) {
        reject(error) // 如果查询出错，返回错误信息
      } else {
        resolve(results) // 如果查询成功，返回查询结果
      }
    })
  })
}

module.exports = router
