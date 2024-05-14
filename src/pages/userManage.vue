<template>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column align="center" prop="username" label="昵称" width="180" />
    <el-table-column prop="" label="头像" width="180">
      <template #default="scope">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            marging-left: 20px;
          "
        >
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
    <el-table-column prop="total" label="违规次数" />
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleClick(scope.row)"
          >加入黑名单</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getUsers } from '../api/user'
import { setBlacklist } from '../api/blacklist'

const tableData = ref([])
const handleClick = (row) => {
  const params = {
    username: row.username,
    head_pic: row.head_pic,
    openId: row.openId,
    total: row.total,
  }
  setBlacklist(params).then((res) => {
    console.log(res)
  })
}
const getPostInfo = () => {
  getUsers()
    .then((res) => {
      tableData.value = res.data
    })
    .catch((error) => {
      console.error('Error fetching post:', error)
    })
}

onMounted(() => {
  getPostInfo()
})
const handleSelectionChange = () => {
  multipleSelection.value = val
}

onUnmounted(() => {
  console.log('组件卸载前执行的逻辑')
})
</script>

<style></style>
