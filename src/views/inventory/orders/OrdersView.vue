<template>
  <div class="space-y-6">

    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-slate-900">
        Orders
      </h2>

      <p class="mt-1 text-sm text-slate-500">
        View all customer orders.
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm"
    >
      <p class="text-sm text-slate-500">
        Loading orders...
      </p>
    </div>

    <!-- Error -->
    <div
      v-else-if="errorMessage"
      class="rounded-xl border border-red-200 bg-red-50 p-5"
    >
      <p class="font-medium text-red-700">
        {{ errorMessage }}
      </p>

      <button
        type="button"
        class="mt-3 text-sm font-semibold text-red-700 underline"
        @click="loadOrders"
      >
        Try Again
      </button>
    </div>

    <!-- Orders -->
    <div
      v-else
      class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >

      <!-- Empty -->
      <div
        v-if="orders.length === 0"
        class="p-12 text-center"
      >
        <p class="text-sm text-slate-500">
          No orders found.
        </p>
      </div>

      <!-- Table -->
      <div
        v-else
        class="overflow-x-auto"
      >
        <table class="min-w-full divide-y divide-slate-200">

          <thead class="bg-slate-50">
            <tr>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Order ID
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Customer
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Items
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Total
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Status
              </th>
              <th
                class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                Actions
                </th>

            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">

            <tr
              v-for="order in orders"
              :key="order.id"
              class="transition hover:bg-slate-50"
            >

              <!-- Order ID -->
              <td class="px-6 py-4">
                <p class="truncate text-sm font-medium text-slate-700">
                  {{ order.id }}
                </p>
              </td>

              <!-- Customer -->
              <td class="px-6 py-4 text-sm font-semibold text-slate-900">
                {{ order.customerName }}
              </td>

              <!-- Items -->
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ order.items?.length ?? 0 }}
              </td>

              <!-- Total -->
              <td class="px-6 py-4 text-sm font-semibold text-slate-900">
                ₹{{ formatAmount(order.totalAmount) }}
              </td>

              <!-- Status -->
              <td class="px-6 py-4">
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :class="getStatusClass(order.status)"
                >
                  {{ order.status }}
                </span>
              </td>

              <td class="px-6 py-4 text-right">
                <button
                    type="button"
                    class="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    title="View order details"
                    @click="viewOrder(order.id)"
                >
                    <Eye :size="17" />
                </button>
            </td>

            </tr>

          </tbody>

        </table>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import {
  getAllOrders,
} from '@/services/orderService'

import type { Order } from '@/types/order'

import { Eye } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const orders = ref<Order[]>([])

const router = useRouter()

const isLoading = ref(false)
const errorMessage = ref('')

const viewOrder = (orderId: string) => {
  router.push(`/orders/${orderId}`)
}

const loadOrders = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    orders.value = await getAllOrders()
  } catch (error) {
    console.error('Failed to load orders:', error)

    errorMessage.value =
      'Unable to load orders. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const formatAmount = (amount: number) => {
  return amount.toLocaleString('en-IN')
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'PLACED':
      return 'bg-emerald-50 text-emerald-700'

    case 'PROGRESS':
      return 'bg-blue-50 text-blue-700'

    case 'FAILED':
      return 'bg-red-50 text-red-700'

    case 'CANCELLED':
      return 'bg-slate-100 text-slate-600'

    default:
      return 'bg-slate-100 text-slate-600'
  }
}

onMounted(() => {
  loadOrders()
})
</script>