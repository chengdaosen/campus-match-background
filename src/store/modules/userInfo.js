import { defineStore } from 'pinia'
import { reactive } from 'vue'

const useUserStore = defineStore(
  'user',
  () => {
    const user = reactive({})
    return {
      user,
    }
  },
  {
    persist: true, // 持久化状态，此时会将状态缓存在 localStorage 中，该 localStorage 的 key 为模块名（defineStore 的第一个参数）,value 为该模块的状态对象，如果需要将其存储在 sessionStorage 中，就需要设置 persist 的值为一个对象
  }
)

export default useUserStore
