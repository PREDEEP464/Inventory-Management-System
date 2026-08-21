export interface Product {
  productId: number
  productCode: string
  productName: string
  productDescription: string | null
  categoryId: number
  productPrice: number
  totalQuantity: number
  availableQuantity: number
  isActive: boolean
}

export interface InventoryStatistics {
  totalProducts: number
  activeProducts: number
  inactiveProducts: number
  totalStock: number
  availableStock: number
  lowStockProducts: number
}

export interface ApiResponse<T> {
  message: string
  data: T
}

export interface ProductPage {
  content: Product[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
  empty: boolean
}