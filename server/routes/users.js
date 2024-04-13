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
    console.log('openid', openid)
    // 查询与该openid相关的喜欢项
    const usersLikes = await getLikedPosts(openid)

    // 检查数据库中是否已存在相同openid的用户
    const userExists = await checkIfUserExists(openid)

    if (userExists) {
      // 用户已存在，返回消息
      console.log('用户已存在')
      const userInfo = await getUserInfo(openid)
      res.json({ openid, usersLikes, ...userInfo })
    } else {
      // 用户不存在，将用户信息插入数据库
      console.log('1111', openid, username, headPic)
      await insertUserInfo(openid, username, headPic)
      // 返回openid和喜欢的帖子数组给前端
      res.json({ openid, usersLikes })
    }
  } catch (error) {
    console.error('获取 openid 失败:', error)
    res.status(500).send('获取 openid 失败')
  }
})

// 检查数据库中是否已存在相同openid的用户
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

// 查询用户信息
async function getUserInfo(openid) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT username, head_pic , sex ,wechat ,qq FROM users WHERE openId = ?',
      [openid],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          console.log('用户信息:', results[0])
          const { username, head_pic, sex, wechat, qq } = results[0]
          resolve({ username, head_pic, sex, wechat, qq })
        }
      }
    )
  })
}

// 插入用户信息
async function insertUserInfo(openid, username, headPic) {
  return new Promise((resolve, reject) => {
    sql.query(
      'INSERT INTO users (openId, username, head_pic) VALUES (?, ?, ?)',
      [openid, username, headPic],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      }
    )
  })
}

// 查询与给定openid相关的喜欢项的postId值组成的数组
async function getLikedPosts(openid) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT postId FROM likes WHERE user_like_id = ?',
      [openid],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          const postIdArray = results.map((result) => result.postId)
          resolve(postIdArray)
        }
      }
    )
  })
}

module.exports = router
