const express = require('express')
const router = express.Router()
const sql = require('../db/index')

router.post('/', async (req, res, next) => {
  const { tag } = req.body
  console.log(tag)
  try {
    const result = await getTagPost(tag)

    // 返回结果给前端
    res.status(200).json(result)
  } catch (error) {
    console.error('获取失败', error)
    res.status(500).json({ error: '获取帖子失败，请稍后重试' })
  }
})

// 查询帖子信息（模糊查询）
async function getTagPost(tag) {
  return new Promise((resolve, reject) => {
    const fuzzyTag = `%${tag}%` // 添加通配符来执行模糊查询
    sql.query(
      'SELECT * FROM posts WHERE tag LIKE ?',
      [fuzzyTag],
      async (error, results) => {
        if (error) {
          reject(error)
        } else {
          // 遍历结果并获取相关用户信息
          for (const post of results) {
            // 获取用户信息并添加到结果中
            const user = await getUserInfo(post.openId)
            post.head_pic = user.head_pic
            post.username = user.username
            // 格式化时间
            post.createTime = new Date(post.createTime).toLocaleString()
          }
          resolve(results)
        }
      }
    )
  })
}

// 获取用户信息
async function getUserInfo(openId) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT head_pic, username FROM users WHERE openId = ?',
      [openId],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results[0])
        }
      }
    )
  })
}

module.exports = router
