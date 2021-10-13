import axios, {AxiosError, AxiosRequestConfig} from 'axios'
import router from '../router/index'

const http = axios.create({
  baseURL: 'http://localhost:7001',
  timeout: 10000
})


// 请求拦截
// 每一次发请求前做的事情
http.interceptors.request.use((config: AxiosRequestConfig) => {
  // 验证用户身份 
  // token: 令牌
  // 在登录成功之后后端签发令牌
  // 每一次发请求的时候 加上这个令牌
  let token = localStorage.getItem('token')
  if (token) {
    // headers属性是后端约定的
    config.headers['Authorization'] = token
  }
  return config
}, (err: AxiosError) => {
  return Promise.reject(err)
})


// 响应拦截
// 响应拦截每一次请求结束做的事情
http.interceptors.response.use((res: any) => {
  return res.data
}, (err: AxiosError) => {
  let stutas: number = err.response! && err.response.status
  if (stutas === 401) {
    // token是有过期时间的
    // 登录过期
    // 跳转到登录页
    router.push('/')
  }
  if(stutas===400){
    // Toast.fail('参数错误')
  }
  if(stutas===401){
    // Toast.fail('登录过期')
  }
  if(stutas===403){
    // Toast.fail('没有全选')
  }
  if(stutas===404){
    // Toast.fail('路径错误')
  }
  if(stutas===500){
    // Toast.fail('服务器错误')
  }
  if(stutas===503){
    // Toast.fail('服务器错误')
  }
  return Promise.reject(err)
})
export default http