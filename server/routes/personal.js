const express = require('express')
const router = express.Router()
const sql = require('../db/index')

router.post('/', async (req, res, next) => {
  const { openId } = req.body
  try {
    // 执行数据库查询
    const result = await getUser(openId)
    console.log('Result:', result) // 等待查询结果
    res.status(200).json(result)
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})
router.post('/post', async (req, res, next) => {
  const { openId } = req.body
  try {
    // 执行数据库查询
    const result = await getUserPost(openId)
    console.log('Result:', result) // 等待查询结果
    res.status(200).json(result)
  } catch (error) {
    console.error('Error fetching user posts:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

async function getUser(openId) {
  return new Promise((resolve, reject) => {
    // 添加通配符来执行模糊查询
    sql.query(
      'SELECT * FROM users WHERE openId = ?',
      [openId],
      async (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}
async function getUserPost(openId) {
  return new Promise((resolve, reject) => {
    // 执行数据库查询，联合 users 表和 posts 表，根据 openId 进行连接
    sql.query(
      'SELECT posts.*, users.username, users.head_pic FROM posts INNER JOIN users ON posts.openId = users.openId WHERE posts.openId = ?',
      [openId],
      async (error, results) => {
        if (error) {
          reject(error)
        } else {
          results.forEach((post) => {
            post.createTime = new Date(post.createTime).toLocaleString()
          })
          resolve(results)
        }
      }
    )
  })
}
module.exports = router
