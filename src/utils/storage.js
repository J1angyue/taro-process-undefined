import { setStorageSync, getStorageSync, clearStorageSync } from "@tarojs/taro"

export default {
  set(key, data) {
    setStorageSync(key, data)
  },
  get(key) {
    return getStorageSync(key)
  },
  clear() {
    clearStorageSync()
  }
}
