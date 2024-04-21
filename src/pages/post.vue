<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column align="center" prop="username" label="发帖人" width="100" />
    <el-table-column prop="head_pic" label="头像" width="100">
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
    <el-table-column prop="createTime" width="180" label="发帖时间" />
    <el-table-column prop="tag" width="100" label="标签" />
    <el-table-column align="center" prop="likeTotal" width="100" label="点赞数" />
    <el-table-column prop="content" label="内容" />
  </el-table>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getPost } from '../api/post'

const tableData = ref([])

const getPostInfo = () => {
  getPost()
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

// 如果你需要在组件卸载前执行一些逻辑，你可以使用 onUnmounted
// 在这个例子中，我们没有使用到这个钩子，所以它是可选的
onUnmounted(() => {
  console.log('组件卸载前执行的逻辑')
})
</script>

<style></style>
