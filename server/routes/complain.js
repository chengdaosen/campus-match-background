const express = require('express')
const router = express.Router()
const sql = require('../db/index')

// POST路由，用于设置complain
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

// GET路由，用于获取complain表的内容并返回给前端
router.get('/', async (req, res, next) => {
  try {
    // 执行数据库查询
    const complains = await getComplains()
    // 返回查询结果给前端
    res.status(200).json(complains)
  } catch (error) {
    console.error('Error getting complains:', error)
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

async function getComplains() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT c.*, u.head_pic, u.username, p.content
      FROM complain c
      INNER JOIN users u ON c.openId = u.openId
      INNER JOIN posts p ON c.postId = p.id
    `
    sql.query(query, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = router
