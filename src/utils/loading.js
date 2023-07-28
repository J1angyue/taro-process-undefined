import { showLoading, hideLoading } from '@tarojs/taro'

export default {
  show(title, loadingRef) {
    let option = {}
    if (title && typeof title === 'object') {
      option = Object.assign(option, title)
    } else if (typeof title === 'string') {
      option.title = title
    }
    if (isRef(loadingRef.value)) {
      loadingRef.value = true
    }
    showLoading(options)
  },
  hide(loadingRef) {
    if (isRef(loadingRef.value)) {
      loadingRef.value = false
    }
    hideLoading()
  }
}