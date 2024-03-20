const express = require('express')
const router = express.Router()
const axios = require('axios')
const sql = require('../db/index')

/* 获取用户列表. */
router.post('/', async (req, res, next) => {
  const { code, username, headPic } = req.body

  try {
    const wxResponse = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: 'wx241b505949aaf057',
        secret: 'cf245e57ee1fd4750c46d8181654b7c4',
        js_code: code,
        grant_type: 'authorization_code',
      },
    })
    const openid = wxResponse.data.openid

    // 立即返回 openid 给前端
    res.json({ openid })

    // 检查数据库中是否已存在相同openid的用户
    const userExists = await checkIfUserExists(openid)

    if (userExists) {
      // 用户已存在，返回消息
      console.log('用户已存在')
    } else {
      // 用户不存在，将用户信息插入数据库
      console.log('1111', openid, username, headPic)
      sql.query(
        'INSERT INTO users (openId, username, head_pic) VALUES (?, ?, ?)',
        [openid, username, headPic],
        (error, results) => {
          if (error) {
            console.error('存入数据库失败:', error)
          } else {
            console.log('数据存储成功')
          }
        }
      )
    }
  } catch (error) {
    console.error('获取 openid 失败:', error)
    res.status(500).send('获取 openid 失败')
  }
})

// 辅助函数：检查数据库中是否已存在相同openid的用户
async function checkIfUserExists(openid) {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM users WHERE openId = ?', [openid], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.length > 0)
      }
    })
  })
}

module.exports = router
