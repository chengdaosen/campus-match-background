const express = require('express')
const router = express.Router()
const sql = require('../db/index')

router.post('/', async (req, res, next) => {
  const { username, head_pic, openId, total } = req.body
  console.log(username, head_pic, openId, total)
  try {
    const result = await setblacklist(username, head_pic, openId, total)
    // 返回结果给前端
    res.status(200).json(result)
  } catch (error) {
    console.error('获取失败', error)
    res.status(500).json({ error: '获取黑名单失败，请稍后重试' })
  }
})
// GET路由，用于获取所有黑名单数据
router.get('/', async (req, res, next) => {
  try {
    const blacklistData = await getBlacklist()
    res.status(200).json(blacklistData)
  } catch (error) {
    console.error('获取失败', error)
    res.status(500).json({ error: '获取黑名单失败，请稍后重试' })
  }
})
// 将用户添加到黑名单中
async function setblacklist(username, head_pic, openId, total) {
  return new Promise((resolve, reject) => {
    // 在这里执行 SQL 查询，将参数传递到 blacklist 表中
    const query =
      'INSERT INTO blacklist (username, head_pic, openId, total) VALUES (?, ?, ?, ?)'
    sql.query(query, [username, head_pic, openId, total], async (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}
// 获取所有黑名单数据
async function getBlacklist() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM blacklist'
    sql.query(query, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = router
