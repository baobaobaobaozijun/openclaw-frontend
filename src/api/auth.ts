import request from '@/utils/request'
import { User } from './types'

interface LoginResponse {
  token: string
  refreshToken?: string
}

interface RegisterRequest {
  username: string
  password: string
  email: string
}

/**
 * API 接口定义
 * - login(username, password): POST /auth/login
 * - register(username, password, email): POST /auth/register
 * - getUserInfo(): GET /auth/me
 */
export const authApi = {
  /**
   * 用户登录
   * @param username 用户名
   * @param password 密码
   * @returns 登录响应数据
   */
  login: (username: string, password: string): Promise<LoginResponse> => {
    return request.post('/auth/login', {
      username,
      password
    })
  },

  /**
   * 用户注册
   * @param data 注册数据
   * @returns 注册响应数据
   */
  register: (data: RegisterRequest): Promise<LoginResponse> => {
    return request.post('/auth/register', data)
  },

  /**
   * 获取用户信息
   * @returns 用户信息
   */
  getUserInfo: (): Promise<User> => {
    return request.get('/auth/me')
  }
}