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
    <el-table-column align="center" prop="postId" width="120" label="被举报帖子Id" />
    <el-table-column width="400" align="center" prop="content" label="举报内容" />
    <el-table-column prop="tag" width="100" label="举报标签" />
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleClick(scope.row.postId, scope.row.reported_id)"
          >确认违规</el-button
        >
        <el-button
          link
          type="primary"
          size="small"
          @click="handleDelete(scope.row.postId)"
          >没有违规</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getComplain, deleteComplain, deletePost, addRepotedTotal } from '../api/complain'
import { ElMessageBox, ElMessage } from 'element-plus'
const tableData = ref([])
const handleDelete = (postId) => {
  ElMessageBox.confirm('确定该违规帖子无违规并且删除记录？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      const params = { postId }
      // 删除举报表中的帖子
      deletePost(params)
        .then((res) => {
          getcomplain()
          ElMessage.success('删除成功')
        })
        .catch((error) => {
          console.error('删除失败', error)
        })
    })
    .catch((error) => {
      console.error('删除失败', error)
    })
}

const handleClick = (postId, reported_id) => {
  ElMessageBox.confirm('删除该违规帖子并且记录此人的违规次数？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      const params = { postId }
      //删除前端的帖子
      deleteComplain(params)
        .then((res) => {
          //删除举报表中的帖子
          deletePost(params).then((res) => {
            //举报人加一
            const param = { reported_id }
            addRepotedTotal(param)
              .then((res) => {
                getcomplain()
              })
              .catch((error) => {
                console.error('删除失败', error)
              })
          })

          ElMessage.success('删除成功')
        })
        .catch((error) => {
          console.error('删除失败', error)
        })
    })
    .catch(() => {
      // 用户点击取消按钮时的操作，可以不做任何处理
    })
}

const getcomplain = () => {
  getComplain()
    .then((res) => {
      tableData.value = res.data
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
