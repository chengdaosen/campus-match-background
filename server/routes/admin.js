const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const sql = require('../db/index')

router.post('/', async (req, res, next) => {
  console.log('login', req.body)
  const { username, password } = req.body
  console.log(username, password)
  try {
    // 查询数据库中是否存在对应的管理员
    const admin = await getAdmin(username)
    // 如果不存在该管理员，则返回错误消息
    if (!admin) {
      return res.status(400).json({ error: '用户不存在' })
    }
    // 如果密码不匹配，则返回错误消息
    else if (admin.password !== password) {
      return res.status(400).json({ error: '密码输入错误' })
    }
    // 生成 JWT token
    const token = jwt.sign({ username: admin.username }, 'chengdaosen', {
      expiresIn: '1h',
    })

    // 返回 token 给前端
    res.status(200).json({ message: '登录成功', token })
  } catch (error) {
    console.error('管理员登录失败:', error)
    res.status(500).json({ error: '管理员登录失败，请稍后重试' })
  }
})

// 查询管理员信息
async function getAdmin(username) {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM admin WHERE username = ?', [username], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results[0])
      }
    })
  })
}

module.exports = router
