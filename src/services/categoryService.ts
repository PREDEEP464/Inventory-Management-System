import api from '@/config/api'

import type { ApiResponse } from '@/types/product'
import type { Category } from '@/types/category'

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await api.get<ApiResponse<Category[]>>(
    '/api/categories',
  )

  return response.data.data
}

export const getCategoryById = async (
  categoryId: number,
): Promise<Category> => {
  const response = await api.get<ApiResponse<Category>>(
    `/api/categories/${categoryId}`,
  )

  return response.data.data
}