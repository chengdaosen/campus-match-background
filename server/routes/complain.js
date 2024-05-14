const express = require('express')
const router = express.Router()
const sql = require('../db/index')

router.delete('/delete', async (req, res, next) => {
  try {
    const { postId } = req.body

    // 执行数据库查询，删除相关的投诉
    await deleteComplainsByPostIds(postId)

    // 返回成功消息给前端
    res.status(200).json({ message: 'Complains deleted successfully' })
  } catch (error) {
    console.error('Error deleting complains:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})
// POST路由，用于设置complain
router.post('/', async (req, res, next) => {
  const { postId, openId, tag, reportedId } = req.body
  try {
    // 执行数据库查询
    await setComplain(postId, openId, tag, reportedId)
    // 返回成功消息给前端
    res.status(200).json({ message: 'Complain set successfully' })
  } catch (error) {
    console.error('Error setting complain:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/add', async (req, res, next) => {
  const { reported_id } = req.body
  console.log('324324', reported_id)
  try {
    // 执行数据库查询
    await addTotal(reported_id)
    // 返回成功消息给前端
    res.status(200).json({ message: 'Total incremented successfully' })
  } catch (error) {
    console.error('Error incrementing total:', error)
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

async function setComplain(postId, openId, tag, reportedId) {
  return new Promise((resolve, reject) => {
    const query =
      'INSERT INTO complain (postId, openId, tag, reported_id) VALUES (?, ?, ? ,?)'
    sql.query(query, [postId, openId, tag, reportedId], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}
async function addTotal(reported_id) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET total = total + 1 WHERE openId = ?'
    sql.query(query, [reported_id], (error, results) => {
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
async function deleteComplainsByPostIds(postId) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM complain WHERE postId IN (?)'
    sql.query(query, [postId], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = router
