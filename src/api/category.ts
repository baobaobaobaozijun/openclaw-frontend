import request from '@/utils/request'

export const categoryApi = {
  /**
   * 获取分类列表
   */
  getList() {
    return request({
      url: '/api/categories',
      method: 'get'
    })
  },

  /**
   * 根据ID获取分类详情
   */
  getCategoryById(id: number | string) {
    return request({
      url: `/api/categories/${id}`,
      method: 'get'
    })
  },

  /**
   * 创建分类
   */
  createCategory(data: any) {
    return request({
      url: '/api/categories',
      method: 'post',
      data
    })
  },

  /**
   * 更新分类
   */
  updateCategory(id: number | string, data: any) {
    return request({
      url: `/api/categories/${id}`,
      method: 'put',
      data
    })
  },

  /**
   * 删除分类
   */
  deleteCategory(id: number | string) {
    return request({
      url: `/api/categories/${id}`,
      method: 'delete'
    })
  }
}
