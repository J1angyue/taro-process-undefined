import { defineStore } from 'pinia'
import storage from '@/u/storage'
import { login } from '@/a/user'
import { encrypt } from '@/u/encrypt'

export const useUserStore = defineStore('user', {
  state() {
    return {
      isLoading: false,
      id: 0,
      permissions: [],
      roles: [],
      postName: '',
      nickname: ''
    }
  },
  getters: {
    accessToken() {
      return storage.get('USER_ACCESS_TOKEN')
    },
    refreshToken() {
      return storage.get('USER_REFRESH_TOKEN')
    }
  },
  actions: {
    initTokens(loginData) {
      if (this.isLoading) {
        return Promise.reject('Loading...')
      }
      this.isLoading = true
      return login(encrypt(JSON.stringify(loginData)))
        .then(({ accessToken, refreshToken }) => {
          storage.set('USER_ACCESS_TOKEN', accessToken)
          storage.set('USER_REFRESH_TOKEN', refreshToken)
        })
        .finally(() => this.isLoading = false)
    }
  },
})
