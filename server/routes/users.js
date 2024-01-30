const express = require('express')
const router = express.Router()
const axios = require('axios')
const sql = require('../db/index')
/* GET users listing. */
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
    // 存入数据库
    console.log('1111', openid, username, headPic)
    sql.query(
      'INSERT INTO users (openId, username, head_pic) VALUES (?, ?, ?)',
      [openid, username, headPic],
      (error, results) => {
        if (error) {
          console.error('存入数据库失败:', error)
          res.status(500).send('存入数据库失败')
        } else {
          console.log('数据存储成功')
          // 返回 openid 到前端
          res.json({ openid })
        }
      }
    )
  } catch (error) {
    console.error('获取 openid 失败:', error)
    res.status(500).send('获取 openid 失败')
  }
})

module.exports = router
