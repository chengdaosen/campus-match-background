const express = require('express')
const router = express.Router()
const sql = require('../db/index')

router.post('/', async (req, res) => {
  const { username, openid, sex, wechat, qq } = req.body
  try {
    const results = await update(openid, sex, username, wechat, qq)
    return res.status(200).json(results)
  } catch (error) {
    console.error('Error updating user information:', error)
    return res.status(500).json({ error: 'Internal server error' }) // 返回错误对象而不是简单的消息字符串
  }
})

function update(openid, sex, username, wechat, qq) {
  return new Promise((resolve, reject) => {
    console.log('openid', openid)
    console.log('Received user information:', wechat, qq)
    const updateQuery =
      'UPDATE users SET username = ?, sex = ?, wechat = ?, qq = ? WHERE openId = ?'
    sql.query(updateQuery, [username, sex, wechat, qq, openid], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve({ message: 'User information updated successfully' })
      }
    })
  })
}

module.exports = router
