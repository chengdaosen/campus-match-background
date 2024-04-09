const express = require('express')
const router = express.Router()
const sql = require('../db/index')

/* 获取用户喜欢的帖子ID  */
router.post('/', async (req, res, next) => {
  const { openId } = req.body
  try {
    const results = await getUserLikes(openId)
    res.json(results)
  } catch (error) {
    console.error('获取用户喜欢的帖子 ID 失败:', error)
    res.status(500).send('获取用户喜欢的帖子 ID 失败')
  }
})
/* 获取用户喜欢的帖子及详细用户信息列表. */
router.post('/posts', async (req, res, next) => {
  const { openId } = req.body
  try {
    const likedPostIds = await getUserLikes(openId)
    // 获取所有帖子的详细信息和发布者的用户信息
    const postsWithUserInfo = await getPostsWithUserInfo(likedPostIds)
    console.log('用户喜欢的帖子及用户信息列表:', postsWithUserInfo)
    res.json(postsWithUserInfo)
  } catch (error) {
    console.error('获取用户喜欢的帖子及用户信息列表失败:', error)
    res.status(500).send('获取用户喜欢的帖子及用户信息列表失败')
  }
})

async function getUserLikes(openId) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT postId FROM likes WHERE user_like_id = ?',
      [openId],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          const userLikes = results.map((row) => row.postId)
          resolve(userLikes)
        }
      }
    )
  })
}
// 获取所有帖子的详细信息和发布者的用户信息
async function getPostsWithUserInfo(postIds) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT p.*, u.head_pic, u.username, 1 AS likeStatus
      FROM posts p
      JOIN users u ON p.openId = u.openId
      WHERE p.id IN (${postIds.join(',')})
    `
    sql.query(query, [postIds], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}
module.exports = router
