var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
// 加载路由
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var publishRouter = require('./routes/publish')
var postsRouter = require('./routes/posts')
var usersLikeRouter = require('./routes/usersLike')
var avatarUrlRouter = require('./routes/avatarUrl')
var adminRouter = require('./routes/admin')
var updateInfoRouter = require('./routes/updateInfo')
var tagsRouter = require('./routes/tags')
var personalRouter = require('./routes/personal')
var deletePostRouter = require('./routes/deletePost')
var allUsersRouter = require('./routes/allUsers')
var complainRouter = require('./routes/complain')
var uploadRouter = require('./routes/upload')
var commentRouter = require('./routes/comment')
var myCommentRouter = require('./routes/myComment')
// 创建express实例
var app = express()

// view engine setup
// 设置视图引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// 中间件
// 设置中间件
app.use(require('cors')())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/upload', express.static(__dirname + '/upload'))
// app.use(express.static(path.join(__dirname, 'public')))
app.use(
  cors({
    // origin: 'http://localhost:5173', // 允许指定的域名发送跨域请求
    origin: '*', // 允许所有域发送跨域请求
  })
)
// 路由
// 加载路由
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/publish', publishRouter)
app.use('/posts', postsRouter)
app.use('/usersLike', usersLikeRouter)
app.use('/avatarUrl', avatarUrlRouter)
app.use('/admin', adminRouter)
app.use('/updateInfo', updateInfoRouter)
app.use('/tags', tagsRouter)
app.use('/personal', personalRouter)
app.use('/delete', deletePostRouter)
app.use('/allUsers', allUsersRouter)
app.use('/complain', complainRouter)
app.use('/upload', uploadRouter)
app.use('/comment', commentRouter)
app.use('/myComment', myCommentRouter)
// catch 404 and forward to error handler
// 404
// 捕获404并转发到错误处理程序
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
// 错误处理
// 错误处理
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // 设置locals，仅在开发环境中提供错误信息
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  // 渲染错误页面
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
