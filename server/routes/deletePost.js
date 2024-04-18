const express = require('express')
const router = express.Router()
const sql = require('../db/index')
router.post('/', async (req, res, next) => {
  const { postId } = req.body
  console.log('111', postId)
  try {
    // 执行数据库删除操作
    const result = await deleteUserPost(postId)
    console.log('Result:', result) // 等待删除结果
    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting user post:', error)
    res.status(500).json({ message: 'Internal server error' })
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
