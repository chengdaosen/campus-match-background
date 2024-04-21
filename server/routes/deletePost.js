const express = require('express')
const router = express.Router()
const sql = require('../db/index')

router.post('/', async (req, res, next) => {
  const { postId } = req.body
  console.log('postId:', postId)

  try {
    const result = await deleteUserPost(postId)
    console.log('Delete result:', result)
    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting user post:', error)
    next(error) // 将错误传递给全局错误处理程序
  }
})

async function deleteUserPost(postId) {
  try {
    const results = await new Promise((resolve, reject) => {
      sql.query('DELETE FROM posts WHERE id = ?', [postId], (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
    })
    return results
  } catch (error) {
    throw error
  }
}

module.exports = router
