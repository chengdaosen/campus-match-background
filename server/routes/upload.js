const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/:filename', (req, res) => {
  // 设置响应头 Access-Control-Allow-Origin 为 *
  console.log('11111111111')
  res.setHeader('Access-Control-Allow-Origin', '*')

  // 获取请求中的文件名参数
  const filename = req.params.filename

  // 拼接文件的完整路径
  const filePath = path.join(__dirname, '../public/upload/', filename)

  // 使用 Express 的 sendFile 方法发送文件
  res.sendFile(filePath)
})

module.exports = router
