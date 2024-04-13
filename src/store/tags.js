import { defineStore } from 'pinia'

export const useTagsStore = defineStore('tags', {
  state: () => {
    return {
      list: [],
    }
  },
  getters: {
    show: function (state) {
      return state.list.length > 0
    },
    nameList: function (state) {
      return state.list.map(function (item) {
        return item.name
      })
    },
  },
  actions: {
    delTagsItem: function (index) {
      this.list.splice(index, 1)
    },
    setTagsItem: function (data) {
      this.list.push(data)
    },
    clearTags: function () {
      this.list = []
    },
    closeTagsOther: function (data) {
      this.list = data
    },
    closeCurrentTag: function (data) {
      for (var i = 0, len = this.list.length; i < len; i++) {
        var item = this.list[i]
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data.$router.push(this.list[i + 1].path)
          } else if (i > 0) {
            data.$router.push(this.list[i - 1].path)
          } else {
            data.$router.push('/')
          }
          this.list.splice(i, 1)
          break
        }
      }
    },
  },
})
