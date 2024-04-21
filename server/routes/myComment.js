const express = require('express')
const router = express.Router()
const sql = require('../db/index')

router.post('/', async (req, res, next) => {
  const { openId } = req.body

  try {
    // 获取评论列表
    const comments = await getComments(openId)
    console.log('Comments:', comments)

    // 提取唯一的 postId
    const postIds = [...new Set(comments.map((comment) => comment.postId))]
    console.log('Post IDs:', postIds)

    // 查询对应的评论信息
    const relatedComments = await getCommentsByPostIds(postIds)
    console.log('Related Comments:', relatedComments)

    // 查询对应的帖子信息
    const posts = await getPostsByPostIds(postIds)
    console.log('Posts:', posts)

    // 返回帖子信息和相关评论给前端
    res.json({ posts, relatedComments })
  } catch (error) {
    console.error('Error fetching comments:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// 根据 postIds 查询 comment 表中的相关项
async function getCommentsByPostIds(postIds) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM comment WHERE postId IN (?)'
    sql.query(query, [postIds], (error, results) => {
      if (error) {
        reject(error) // 如果查询出错，返回错误信息
      } else {
        resolve(results) // 如果查询成功，返回查询结果
      }
    })
  })
}

// 获取评论列表
async function getComments(openId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM comment WHERE openId = ?'
    sql.query(query, [openId], (error, results) => {
      if (error) {
        reject(error) // 如果查询出错，返回错误信息
      } else {
        resolve(results) // 如果查询成功，返回查询结果
      }
    })
  })
}

// 根据 postId 获取帖子信息，并加上 username 和 head_pic 字段
async function getPostsByPostIds(postIds) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        p.*, 
        u.username, 
        u.head_pic 
      FROM 
        posts p 
      JOIN 
        users u ON p.openId = u.openId 
      WHERE 
        p.id IN (?)`
    sql.query(query, [postIds], (error, results) => {
      if (error) {
        reject(error) // 如果查询出错，返回错误信息
      } else {
        // 遍历结果数组，将每个帖子的 createTime 转换为本地时间格式
        results.forEach((post) => {
          post.createTime = new Date(post.createTime).toLocaleString()
        })
        resolve(results) // 如果查询成功，返回查询结果
      }
    })
  })
}

module.exports = router
