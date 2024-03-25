import axios from 'axios'

const apiClient = axios.create({
  // baseURL: 'http://localhost:8000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Yype': 'application/json'
  }
})


export default {
  getActiveUsers () {
    return apiClient.get('/api/v1/active-users')
  },
  getUser(id) {
    return apiClient.get('/api/v1/users/' + id)
  },
  getPaints () {
    return apiClient.get('/api/v1/paints')
  },
  getUsers () {
    return apiClient.get('/api/v1/users')
  },
  putPaints (paintId, action) {
    return apiClient.put('/api/v1/paints', {id: paintId, action: action})
  },
  putUser (userId, userName, userRole, userIsActive) {
    return apiClient.put('/api/v1/users', {id: userId, name: userName, role: userRole, isActive: userIsActive})
  }
}