import api from '@/config/api'

import type { ApiResponse, Product } from '@/types/product'

export interface StockUpdate {
  productId: number
  quantity: number
}

export const updateStock = async (
  stockUpdates: StockUpdate[],
): Promise<Product[]> => {
  const response = await api.patch<ApiResponse<Product[]>>(
    '/api/products/re-stock',
    stockUpdates,
    )

  return response.data.data
}