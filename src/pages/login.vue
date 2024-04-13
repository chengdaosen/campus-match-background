<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">校园拼伴后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <template #prepend>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
            @keyup.enter="submitForm(login)"
          >
            <template #prepend>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm(login)">登录</el-button>
        </div>
        <el-checkbox class="login-tips" v-model="checked" label="记住密码" size="large" />
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useTagsStore } from '../store/tags'
import { usePermissStore } from '../store/permiss'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { adminLogin } from '../api/login'
//如果用户选择记住密码则自动回显账号和密码
const lgStr = localStorage.getItem('login-param')
const defParam = lgStr ? JSON.parse(lgStr) : null
const checked = ref(lgStr ? true : false)

const router = useRouter()
const param = reactive({
  username: defParam ? defParam.username : '',
  password: defParam ? defParam.password : '',
})

const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
const permiss = usePermissStore()
const login = ref()
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const res = await adminLogin(param)
      console.log('res', res)
      const { status } = res
      if (status === 200) {
        ElMessage.success(res.data.message)
        localStorage.setItem('token', res.data.token)
        router.push('/dashboard') // 登录成功后跳转到首页
      } else {
        // 登录失败
        ElMessage.error(res.data.message)
      }
    } else {
      ElMessage.error('请按规则填写表单')
    }
  })
}
const tags = useTagsStore()
tags.clearTags()
</script>

<style scoped>
.login-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/锦江.jpg);
  background-size: 100%;
}
.ms-title {
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #333;
  font-weight: bold;
  padding-top: 10px;
}
.ms-login {
  width: 350px;
  border-radius: 5px;
  background: #fff;
}
.ms-content {
  padding: 10px 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #333;
}
</style>
