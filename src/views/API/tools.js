import { get } from '@/utils/axios.js'
import contextPath from '@/config/context-path.js'

export async function getCompressJsApi (data) {
  const url = `${contextPath}/tools/getCompressJs`
  const options = {}
  return get(url, {}, options)
}
