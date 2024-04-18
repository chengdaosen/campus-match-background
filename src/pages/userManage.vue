<template>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column align="center" prop="username" label="昵称" width="180" />
    <el-table-column prop="head_pic" label="头像" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-image
            :src="scope.row.head_pic"
            :preview-src-list="[scope.row.head_pic]"
            preview-teleported
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="sex" width="100" label="性别" />
    <el-table-column prop="wechat" width="100" label="微信" />
    <el-table-column prop="qq" width="100" label="QQ" />
    <el-table-column prop="openId" label="openId" />
    <el-table-column fixed="right" label="操作">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick"
          >加入黑名单</el-button
        >
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getUsers } from '../api/user'

const tableData = ref([])
const handleClick = () => {
  console.log('click')
}
const getPostInfo = () => {
  getUsers()
    .then((res) => {
      tableData.value.push(...res.data)
    })
    .catch((error) => {
      console.error('Error fetching post:', error)
    })
}

onMounted(() => {
  getPostInfo() // 直接调用函数即可
})
const handleSelectionChange = () => {
  multipleSelection.value = val
}

onUnmounted(() => {
  console.log('组件卸载前执行的逻辑')
})
</script>

<style></style>
