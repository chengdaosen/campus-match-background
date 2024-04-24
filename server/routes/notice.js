const express = require('express')
const router = express.Router()
const sql = require('../db/index')

router.delete('/delete', async (req, res, next) => {
  const { id } = req.body
  try {
    const results = await deleteNotice(id)
    res.status(200).json(results)
  } catch (error) {
    console.error('Failed to delete notice:', error)
    res.status(500).json({ message: 'Failed to delete notice' })
  }
})
router.post('/', async (req, res, next) => {
  const { content, username, createTime } = req.body
  try {
    const results = await addNotice(content, username, createTime)
    console.log('35234', content, username, createTime)
    res.status(200).json(results)
  } catch (error) {
    console.error('Failed to add notice:', error)
    res.status(500).json({ message: 'Failed to add notice' })
  }
})
router.post('/status', async (req, res, next) => {
  const { id } = req.body
  try {
    const results = await modifyStatus(id)
    res.status(200).json(results)
  } catch (error) {
    console.error('Failed to add notice:', error)
    res.status(500).json({ message: 'Failed to add notice' })
  }
})
router.get('/', async (req, res, next) => {
  try {
    const results = await getAllNotices()
    res.status(200).json(results)
  } catch (error) {
    console.error('Failed to fetch notices:', error)
    res.status(500).json({ message: 'Failed to fetch notices' })
  }
})

async function addNotice(content, username, createTime) {
  return new Promise((resolve, reject) => {
    sql.query(
      'INSERT INTO notice (content, username, createTime) VALUES (?, ?, ?)',
      [content, username, createTime],
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
async function deleteNotice(id) {
  return new Promise((resolve, reject) => {
    sql.query('DELETE FROM notice WHERE id = ?', [id], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}
async function modifyStatus(id) {
  return new Promise((resolve, reject) => {
    // 首先将所有记录的 submit 字段设置为 0
    sql.query(
      'UPDATE notice SET submit = CASE WHEN id = ? THEN 1 ELSE 0 END',
      [id],
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

async function getAllNotices() {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM notice', (error, results) => {
      if (error) {
        reject(error)
      } else {
        results.forEach((post) => {
          post.createTime = new Date(post.createTime).toLocaleString()
        })
        resolve(results)
      }
    })
  })
}

module.exports = router
