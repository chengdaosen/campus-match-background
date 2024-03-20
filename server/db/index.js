const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'mini_program', //连接的数据库
  port: 3306,
  charset: 'utf8mb4',
})

connection.connect()
module.exports = connection
