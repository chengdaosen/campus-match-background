const express = require('express')
const router = express.Router()
const sql = require('../db/index')

router.post('/', async (req, res, next) => {
  try {
    // 执行数据库查询
    const result = await getUser()
    console.log('Result:', result) // 等待查询结果
    res.status(200).json(result)
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

async function getUser() {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM users', (error, results) => {
      if (error) {
        reject(error) // 如果查询出错，返回错误信息
      } else {
        resolve(results) // 如果查询成功，返回查询结果
      }
    })
  })
}

module.exports = router
