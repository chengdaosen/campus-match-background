<template>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column align="center" prop="id" label="序号" width="70" />
    <el-table-column align="center" prop="username" label="举报人" width="100" />
    <el-table-column align="center" prop="head_pic" label="举报人头像" width="100">
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
    <el-table-column align="center" prop="postId" width="100" label="举报帖子Id" />
    <el-table-column width="400" align="center" prop="content" label="举报内容" />
    <el-table-column prop="tag" width="100" label="举报标签" />
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleClick(scope.row.postId)"
          >删除该帖子</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getComplain, deleteComplain } from '../api/complain'

const tableData = ref([])
const handleClick = (postId) => {
  const params = { postId }
  deleteComplain(params)
    .then((res) => {
      getComplain()
    })
    .catch((error) => {
      console.error('删除失败', error)
    })
}

const getcomplain = () => {
  getComplain()
    .then((res) => {
      tableData.value.push(...res.data)
    })
    .catch((error) => {
      console.error('Error fetching post:', error)
    })
}

onMounted(() => {
  getcomplain() // 直接调用函数即可
})
const handleSelectionChange = () => {
  multipleSelection.value = val
}

onUnmounted(() => {
  console.log('组件卸载前执行的逻辑')
})
</script>

<style></style>
