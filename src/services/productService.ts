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

export const getProductById = async (
  productId: number,
): Promise<Product> => {
  const response = await api.get<ApiResponse<Product>>(
    `/api/products/${productId}`,
  )

  return response.data.data
}

export const createProduct = async (
  product: Omit<Product, 'productId'>,
): Promise<Product> => {
  const response = await api.post<ApiResponse<Product>>(
    '/api/products',
    product,
  )

  return response.data.data
}

export interface ProductUpdateRequest {
  productId: number
  productCode?: string
  productName?: string
  productDescription?: string | null
  categoryId?: number
  productPrice?: number
  isActive?: boolean
}

export const updateProducts = async (
  products: ProductUpdateRequest[],
): Promise<Product[]> => {
  const response = await api.patch<ApiResponse<Product[]>>(
    '/api/products',
    products,
  )

  return response.data.data
}

export const getProductsByCategory = async (
  categoryId: number,
): Promise<Product[]> => {
  const response = await api.get<ApiResponse<Product[]>>(
    `/api/products/category/${categoryId}`,
  )

  return response.data.data
}