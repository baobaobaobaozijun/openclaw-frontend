import request from '@/utils/request'

interface LoginResponse {
  token: string
  user?: { id: number; phone: string; nickname: string }
}

interface RegisterRequest {
  phone: string
  password: string
  nickname?: string
}

export const authApi = {
  login: (phone: string, password: string): Promise<LoginResponse> => {
    return request.post('/auth/login', { phone, password })
  },
  register: (data: RegisterRequest): Promise<LoginResponse> => {
    return request.post('/auth/register', data)
  },
  getUserInfo: (): Promise<any> => {
    return request.get('/auth/me')
  }
}