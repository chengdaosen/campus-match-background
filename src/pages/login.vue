<template>
  <el-row class="login-container">
    <!--响应式布局 宽屏占16:8 中屏占12:12-->
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>这里是--------------------------</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <!--登录表单部分-->
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            color="#626aef"
            class="w-[250px]"
            type="primary"
            @click="onSubmit"
            :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

// do not use same name with ref
const form = reactive({
  username: '',
  password: '',
})

// 验证规则
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
}

const formRef = ref(null)
const loading = ref(false)
// const onSubmit = () => {
//   formRef.value.validate((valid) => {
//     if (!valid) {
//       return false
//     }
//     loading.value = true

//     store
//       .dispatch('login', form)
//       .then((res) => {
//         toast('登录成功')
//         // 登录成功路由跳转到首页
//         router.push('/')
//       })
//       .finally(() => {
//         loading.value = false
//       })
//   })
// }

// 监听回车事件
function onKeyUp(e) {
  // 按下回车提交表单
  if (e.key === 'Enter') onSubmit()
}

// 添加键盘监听
onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})
// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})
</script>

<style scoped lang="scss">
.login-container {
  background-color: #3f51b5;
  height: 100vh;
}
.login-container .left,
.login-container .right {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container .right {
  background-color: #f8f9fa;
  flex-direction: column;
}

.left > div > div:first-child {
  font-weight: bold;
  font-size: 5xl;
  color: #f8f9fa;
  margin-bottom: 4px;
}

.left > div > div:last-child {
  color: #718096;
  font-size: small;
}

.right .title {
  font-weight: bold;
  font-size: 3xl;
  color: #1a202c;
}

.right > div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  color: #a0aec0;
  gap: 0.5rem;
}

.right .line {
  height: 1px;
  width: 16rem;
  background-color: #cbd5e0;
}
</style>
