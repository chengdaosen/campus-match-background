const express = require('express')
const router = express.Router()
const sql = require('../db/index')

/* 获取用户列表. */
router.post('/', async (req, res, next) => {
  const { openId } = req.body
  console.log('openId:', openId)
  try {
    const results = await getUserLikes(openId)
    console.log('用户喜欢的帖子 ID:', results)
    res.json({ results })
  } catch (error) {
    console.error('获取用户喜欢的帖子 ID 失败:', error)
    res.status(500).send('获取用户喜欢的帖子 ID 失败')
  }
})

async function getUserLikes(openId) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT postId FROM `like` WHERE openId = ?',
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

module.exports = router
