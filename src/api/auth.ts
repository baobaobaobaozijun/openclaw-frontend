import request from '@/utils/request'

interface LoginResponse {
  code: number
  message: string
  data: {
    id: number
    username: string
    email: string
    avatar: string | null
    token: string
  }
  timestamp: number
}

interface RegisterRequest {
  username: string
  email: string
  password: string
  nickname?: string
}

export const authApi = {
  login: (username: string, password: string): Promise<LoginResponse> => {
    return request.post('/auth/login', { username, password })
  },
  register: (data: RegisterRequest): Promise<LoginResponse> => {
    return request.post('/auth/register', data)
  },
  getUserInfo: (): Promise<any> => {
    return request.get('/auth/me')
  }
}