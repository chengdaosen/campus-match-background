<template>
  <el-table ref="multipleTableRef" :data="tableData" style="width: 100%">
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
    <el-table-column prop="openId" label="openId" />
    <el-table-column prop="total" label="违规次数" />
  </el-table>
</template>

<script setup>
import { getBlacklist } from '../api/blacklist'
import { ref, onMounted } from 'vue'
const tableData = ref([])
const getBlacklistInfo = () => {
  getBlacklist().then((res) => {
    tableData.value = res.data
  })
}
onMounted(() => {
  getBlacklistInfo()
})
</script>

<style></style>
