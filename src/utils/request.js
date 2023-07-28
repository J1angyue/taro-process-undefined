import { request as taroRequest } from '@tarojs/taro'

const API_BASE_URL = process.env.TARO_APP_BASE_URL + process.env.TARO_APP_API_BASE_URL

function requestPromisely(option) {
  return new Promise((resolve, reject) => {
    option.success = resolve
    option.fail = reject
    taroRequest(option)
  })
}

function createRequester(method) {
  return function commonRequester (url, data) {

    let option = {}
    if (url && typeof url === 'object') {
      option = Object.assign(option, url)
      option.url = API_BASE_URL + url
      option.method = method
    } else if (typeof url === 'string') {
      option.url = API_BASE_URL + url
      option.method = method,
      option.data = data
    } else {
      return Promise.reject(new Error('Invalid requet option'))
    }

    return requestPromisely(option)
      .then(({ data: { code, data, msg } }) => {
        if (code !== 0) {
          const title = msg + '(' + code + ')'
          toast.error(title)
          throw new Error(title)
        }
        return data
      })
      .catch(({ errMsg }) => {
        if (errMsg) {
          toast.error(errMsg)
          throw new Error(errMsg)
        }
      })
  }
}

export const request = {
  get: createRequester('GET'),
  post: createRequester('POST'),
  put: createRequester('PUT'),
  patch: createRequester('PATCH'),
  del: createRequester('DELETE'),
}
