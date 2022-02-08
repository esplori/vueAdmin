import { get } from '@/utils/axios.js'
import contextPath from '@/config/context-path.js'

export async function getWebStatisticsApi (data) {
  const url = `${contextPath}/stats/getWebStatistics`
  const options = {}
  return get(url, {}, options)
}
