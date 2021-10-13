import router from '../../router'
import { isObject } from '../../utils'

interface Options {
  // 跳转的路径
  path?: string,
  // 路由的name
  name?: string,
  // 跳转的方式
  method?: 'query' | 'params',
  // 传递的数据
  data?: any
}

export const useRouterPush = (options: Options) => {
  let { path, name, method, data } = options
  if (!method) method = 'query'
  if (data) {
    data = isObject(data) ? JSON.stringify(data) : data
  }
  if (method === 'params') {
    router.push({
      name,
      [method]: {
        data
      }
    })
  } else {
    router.push({
      path,
      [method]: {
        data
      }
    })
  }
}