import { defineStore } from 'pinia';
import { ref } from 'vue';

interface UserInfo {
  id: number;
  username: string;
  email: string;
  [key: string]: any;
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string>(localStorage.getItem('token') || '');
  const userInfo = ref<UserInfo | null>(null);
  const isLoggedIn = ref<boolean>(!!token.value);

  // Actions
  const login = (userToken: string) => {
    token.value = userToken;
    isLoggedIn.value = true;
    localStorage.setItem('token', userToken);
  };

  const register = (userToken: string) => {
    token.value = userToken;
    isLoggedIn.value = true;
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    token.value = '';
    userInfo.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem('token');
  };

  const getUserInfo = (info: UserInfo) => {
    userInfo.value = info;
  };

  return {
    token,
    userInfo,
    isLoggedIn,
    login,
    register,
    logout,
    getUserInfo
  };
});