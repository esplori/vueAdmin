import { post } from '@/utils/axios.js'
import contextPath from '@/config/context-path.js'

export async function deployApi (data) {
  const url = `${contextPath}/tools/deploy`
  const options = {}
  return post(url, data, options)
}
