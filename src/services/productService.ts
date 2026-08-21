import api from '@/config/api'

import type {
  ApiResponse,
  InventoryStatistics,
  Product,
  ProductPage,
} from '@/types/product'

export const getInventoryStatistics = async (): Promise<InventoryStatistics> => {
  const response = await api.get<ApiResponse<InventoryStatistics>>(
    '/api/products/statistics',
  )

  return response.data.data
}

export const getLowStockProducts = async (
  threshold: number,
): Promise<Product[]> => {
  const response = await api.get<ApiResponse<Product[]>>(
    '/api/products/low-stock',
    {
      params: {
        threshold,
      },
    },
  )

  return response.data.data
}

export interface ProductFilters {
  categoryId?: number
  minPrice?: number
  maxPrice?: number
  name?: string
  page?: number
  size?: number
}

export const getProducts = async (
  filters: ProductFilters = {},
): Promise<ProductPage> => {
  const response = await api.get<ApiResponse<ProductPage>>(
    '/api/products',
    {
      params: {
        ...filters,
      },
    },
  )

  return response.data.data
}