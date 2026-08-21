export interface OrderItem {
  productId: number
  productName: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  customerName: string
  items: OrderItem[]
  totalAmount: number
  status: string
}

export interface OrderApiResponse<T> {
  message: string
  data: T
}