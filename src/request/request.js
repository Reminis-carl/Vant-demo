import { BASE_URL, TIME_OUT } from './config'
import Request from '.'

const _axios = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default _axios
