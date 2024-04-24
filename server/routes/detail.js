const express = require('express')
const router = express.Router()
const sql = require('../db/index')

// POST请求，用于获取帖子列表
router.post('/', async (req, res, next) => {
  const { postId } = req.body
  try {
    const results = await getPosts(postId)
    res.status(200).json(results)
  } catch (error) {
    console.error('Failed to retrieve posts:', error)
    res.status(500).json({ message: 'Failed to retrieve posts' })
  }
})

async function getPosts(postId) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT posts.*, users.username, users.head_pic FROM posts INNER JOIN users ON posts.openId = users.openId WHERE posts.id = ?',
      [postId],
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

module.exports = router
