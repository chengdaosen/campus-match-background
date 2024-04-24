<template>
  <div>
    <el-row>
      <el-col :span="12"
        ><el-button type="primary" @click="dialogFormVisible = true"
          >新增公告</el-button
        ></el-col
      >
      <el-col :span="12"> </el-col>
    </el-row>
    <el-dialog v-model="dialogFormVisible" title="新增公告" width="500">
      <el-form :model="form">
        <el-form-item label="公告内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请输入公告内容"
            :rows="2"
            v-model="form.content"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addNotice"> 添加</el-button>
        </div>
      </template>
    </el-dialog>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column align="center" prop="username" label="发布人" width="130" />
      <el-table-column align="center" prop="content" label="发布内容" />
      <el-table-column align="center" prop="createTime" width="180" label="发布时间" />
      <el-table-column prop="submit" width="100" label="发布状态">
        <template v-slot="{ row }">
          <el-tag v-if="row.submit === 0" type="info">未发布</el-tag>
          <el-tag v-else type="success">已发布</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleClick(scope.row.id)">
            发布
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="handleDeleteClick(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup name="notice">
import { onMounted, reactive, ref } from 'vue'
import getCurrentDateTime from '../util/formatTime'
import { addNoticeApi, getAllNotice, setNotice, deleteNotice } from '../api/notice'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  content: '',
})
const tableData = ref([])
const getNotice = () => {
  getAllNotice().then((res) => {
    console.log('13214213', res)
    tableData.value = res.data
  })
}
const addNotice = () => {
  const createTime = getCurrentDateTime()
  const params = {
    content: form.content,
    username: 'admin',
    createTime,
  }
  addNoticeApi(params).then((res) => {
    getNotice()
  })
  dialogFormVisible.value = false
  console.log('添加公告')
}
const handleClick = (id) => {
  const params = {
    id,
  }
  setNotice(params).then((res) => {
    getNotice()
  })
}
const handleDeleteClick = (id) => {
  const params = {
    id,
  }
  deleteNotice(params).then((res) => {
    getNotice()
  })
}
onMounted(() => {
  getNotice() // 直接调用函数即可
})
</script>

<style scope>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
