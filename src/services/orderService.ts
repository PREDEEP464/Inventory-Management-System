import api from '@/config/api'

import type {
  Order,
  OrderApiResponse,
} from '@/types/order'

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await api.get<OrderApiResponse<Order[]>>(
    'http://localhost:8082/api/orders'
  )

  return response.data.data
}

export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await api.get<OrderApiResponse<Order>>(
    `http://localhost:8082/api/orders/${orderId}`
  )

  return response.data.data
}