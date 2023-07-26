import axios from 'axios'
class Request {
  instance
  constructor(config) {
    this.instance = axios.create(config)
    //   全局请求拦截
    this.instance.interceptors.request.use(
      config => {
        return config
      },
      err => {
        return err
      }
    )
    //   全局响应拦截
    this.instance.interceptors.response.use(
      res => {
        return res.data
      },
      err => {
        return err
      }
    )
    //   针对特定实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccess,
      config.interceptors?.requestFailure
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccess,
      config.interceptors?.responseFailure
    )
  }
  // 通用请求封装
  request(config) {
    //   单次请求的成功处理
    if (config.interceptors?.requestSuccess) {
      config = config.interceptors.requestSuccess(config)
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then(res => {
          // 单次响应成功的处理
          if (config.interceptors?.responseSuccess) {
            res = config.interceptors?.responseSuccess(res)
          }
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  // get 请求封装
  get(config) {
    return this.request({ ...config, method: 'GET' })
  }
  // post请求封装
  post(config) {
    return this.request({ ...config, method: 'POST' })
  }

  // delete请求封装
  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }
  // put方法封装
  put(config) {
    return this.request({ ...config, method: 'PUT' })
  }
}

export default Request
