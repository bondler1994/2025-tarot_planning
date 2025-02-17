import axios from 'axios'

const API_URL = 'https://virtserver.swaggerhub.com/fufu/PublicTarotDiaryAPI/1.0.0'

const apiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

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
