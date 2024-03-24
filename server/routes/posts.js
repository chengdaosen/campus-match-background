const express = require('express')
const router = express.Router()
const sql = require('../db/index')

// GET请求，用于获取帖子列表
router.get('/', async (req, res, next) => {
  try {
    const results = await getPosts()
    res.status(200).json(results)
  } catch (error) {
    console.error('Failed to retrieve posts:', error)
    res.status(500).json({ message: 'Failed to retrieve posts' })
  }
})

// POST请求，用于增加点赞数并更新like表中postId字段值
router.post('/like', async (req, res, next) => {
  const { postId, openId } = req.body

  try {
    await increaseLikes(postId)
    await updateLikeTable(postId, openId)
    res.status(200).json({ message: 'Like count increased successfully' })
  } catch (error) {
    console.error('Failed to increase like count:', error)
    res.status(500).json({ message: 'Failed to increase like count' })
  }
})

// 获取帖子列表的函数
function getPosts() {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT posts.*, users.head_pic, users.username 
       FROM posts 
       JOIN users ON posts.openid = users.openid
       COLLATE utf8mb4_unicode_ci`,
      (error, results) => {
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

// 增加点赞数的函数
function increaseLikes(postId) {
  return new Promise((resolve, reject) => {
    sql.query(
      `UPDATE posts SET likeTotal = likeTotal + 1 WHERE id = ?`,
      [postId],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      }
    )
  })
}

// 更新like表中postId字段值的函数
function updateLikeTable(postId, openId) {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO \`like\` (postId,openId) VALUES (?,?) ON DUPLICATE KEY UPDATE postId = postId`,
      [postId, openId],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      }
    )
  })
}

module.exports = router
