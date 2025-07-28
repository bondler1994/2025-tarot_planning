import router from '@/router'
import { apiClient, refreshClient } from '@/lib/http'

export default {
  async GET(url) {
    const res = await apiClient.get(url)
    return res.data
  },
  async POST(url, data) {
    const res = await apiClient.post(url, data)
    return res.data
  },
  async PUT(url, data) {
    const res = await apiClient.put(url, data)
    return res.data
  },
}
