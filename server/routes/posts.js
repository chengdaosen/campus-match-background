const express = require('express')
const router = express.Router()
const sql = require('../db/index')

// POST请求，用于获取帖子列表
router.post('/', async (req, res, next) => {
  const { commentTypeIndex, openId, keyword } = req.body
  try {
    const results = await getPosts(commentTypeIndex, openId, keyword)
    res.status(200).json(results)
  } catch (error) {
    console.error('Failed to retrieve posts:', error)
    res.status(500).json({ message: 'Failed to retrieve posts' })
  }
})
// POST请求，用于更新点赞数并更新likes表中postId字段值
router.post('/like', async (req, res, next) => {
  const { postId, openId } = req.body

  try {
    const isLiked = await isPostLiked(postId, openId)
    if (isLiked) {
      await decreaseLikes(postId)
      await deleteFromLikeTable(postId, openId)
    } else {
      await increaseLikes(postId)
      await addToLikeTable(postId, openId)
    }
    res.status(200).json({ message: 'Likes count updated successfully' })
  } catch (error) {
    console.error('Failed to update likes count:', error)
    res.status(500).json({ message: 'Failed to update likes count' })
  }
})

function getPosts(commentTypeIndex, openId, keyword) {
  return new Promise((resolve, reject) => {
    let queryParams = []

    let orderByClause = ''
    if (commentTypeIndex == 1) {
      orderByClause = ' ORDER BY posts.createTime DESC'
    } else {
      orderByClause = ' ORDER BY posts.likeTotal DESC'
    }

    let queryStr = `SELECT posts.*, users.head_pic, users.username 
                    FROM posts 
                    JOIN users ON users.openId = posts.openId`

    if (openId) {
      queryStr += ` LEFT JOIN likes ON posts.id = likes.postId AND likes.user_like_id = ?`
      queryParams.push(openId)
    }

    queryStr += orderByClause

    sql.query(queryStr, queryParams, (error, results) => {
      console.log('queryStr', queryStr)
      if (error) {
        reject(error)
      } else {
        results.forEach((post) => {
          post.createTime = new Date(post.createTime).toLocaleString()
          post.likeStatus = post.user_like_id ? 1 : 0 // 根据是否有点赞来设置likeStatus字段
        })
        resolve(results)
      }
    })
  })
}

// 判断帖子是否被点赞过
function isPostLiked(postId, openId) {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT * FROM likes WHERE postId = ? AND user_like_id = ?`,
      [postId, openId],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results.length > 0)
        }
      }
    )
  })
}
// 减少点赞数的函数
function decreaseLikes(postId) {
  return new Promise((resolve, reject) => {
    sql.query(
      `UPDATE posts SET likeTotal = likeTotal - 1 WHERE id = ?`,
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

// 从like表中删除postId字段值的函数
function deleteFromLikeTable(postId, openId) {
  return new Promise((resolve, reject) => {
    sql.query(
      `DELETE FROM likes WHERE postId = ? AND user_like_id = ?`,
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

// 向like表中添加postId字段值的函数
function addToLikeTable(postId, openId) {
  return new Promise((resolve, reject) => {
    sql.query(
      `INSERT INTO likes (postId,user_like_id) VALUES (?,?)`,
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
