const express = require('express')
const router = express.Router()
const sql = require('../db/index')

// 获取用户发布的帖子及相关评论
router.post('/', async (req, res, next) => {
  const { openId } = req.body
  try {
    // 获取用户发布的帖子 ID
    const postResults = await getUserPost(openId)
    if (postResults.length === 0) {
      // 如果用户没有发布任何帖子，则返回空评论信息给前端
      res.json({ commentInfo: [] })
      return
    }

    // 如果有发布帖子，尝试获取用户帖子下的评论
    const comments = await getCommentsByPostIds(postResults.map((post) => post.id))
    if (comments.length === 0) {
      res.json({ commentInfo: [] })
      // 如果没有评论，说明没有回复返回空，不再继续执行下面的逻辑
      return
    } else {
      res.json({ commentInfo: comments })
    }
  } catch (error) {
    console.error('获取用户发布的帖子及相关评论失败:', error)
    res.status(500).send('获取用户发布的帖子及相关评论失败')
  }
})

// 获取用户发布的帖子 ID
async function getUserPost(openId) {
  return new Promise((resolve, reject) => {
    sql.query('SELECT id FROM posts WHERE openId = ?', [openId], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

// 根据帖子ID获取相关评论
async function getCommentsByPostIds(postIds) {
  if (postIds.length === 0) {
    return []
  }
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT comment.*, users.head_pic FROM comment INNER JOIN users ON comment.openId = users.openId WHERE comment.postId IN (?)',
      [postIds],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}

// 获取帖子及相关信息
// async function getPosts(postIds) {
//   if (postIds.length === 0) {
//     return []
//   }
//   return new Promise((resolve, reject) => {
//     sql.query(
//       'SELECT posts.*, users.username, users.head_pic FROM posts INNER JOIN users ON posts.openId = users.openId WHERE posts.id IN (?)',
//       [postIds],
//       (error, results) => {
//         if (error) {
//           reject(error)
//         } else {
//           // 处理帖子中的 createTime 字段
//           results.forEach((post) => {
//             post.createTime = new Date(post.createTime).toLocaleString()
//           })
//           resolve(results)
//         }
//       }
//     )
//   })
// }

module.exports = router
