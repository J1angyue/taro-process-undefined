import { hideToast, showToast } from '@tarojs/taro'

export const toast = new Proxy({}, {
  get(_, icon) {
    return (title) => {

      let option = {}
      if (title && typeof title === 'object') {
        option = Object.assign(option, title)
      } else if (typeof title === 'string') {
        option.title = title
      }
      option.icon = option.title.length > 7 ? 'none' : icon

      hideToast()
      showToast(option)
    }
  }
})