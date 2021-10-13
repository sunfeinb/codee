import { useRoute } from 'vue-router'

export const useRouteState = (method?: 'query' | 'params') => {
  let route = useRoute()
  if (!method) method = 'query'
  let value: any = route[method!]
  let data: any = value.data && JSON.parse(value.data)

  return {
    data
  }
}