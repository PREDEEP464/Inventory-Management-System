<template>
  <div class="space-y-6">

    <!-- Header -->
    <div>
      <button
        type="button"
        class="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        @click="goBack"
      >
        <ArrowLeft :size="17" />
        Back to Orders
      </button>

      <h2 class="text-2xl font-bold text-slate-900">
        Order Details
      </h2>

      <p class="mt-1 text-sm text-slate-500">
        View complete order information.
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm"
    >
      <p class="text-sm text-slate-500">
        Loading order details...
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
        @click="loadOrder"
      >
        Try Again
      </button>
    </div>

    <!-- Order -->
    <template v-else-if="order">

      <!-- Summary -->
      <div class="grid gap-6 lg:grid-cols-4">

        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
            Order ID
          </p>

          <p class="mt-2 break-all text-sm font-semibold text-slate-800">
            {{ order.id }}
          </p>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
            Customer
          </p>

          <p class="mt-2 text-lg font-semibold text-slate-900">
            {{ order.customerName }}
          </p>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
            Total Amount
          </p>

          <p class="mt-2 text-xl font-bold text-slate-900">
            ₹{{ formatAmount(order.totalAmount) }}
          </p>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
            Status
          </p>

          <span
            class="mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
            :class="getStatusClass(order.status)"
          >
            {{ order.status }}
          </span>
        </div>

      </div>

      <!-- Items -->
      <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div class="border-b border-slate-100 p-6">
          <h3 class="font-semibold text-slate-900">
            Ordered Products
          </h3>

          <p class="mt-1 text-sm text-slate-500">
            {{ order.items.length }} product(s) in this order.
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">

            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Product
                </th>

                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Product ID
                </th>

                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Quantity
                </th>

                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Price
                </th>

                <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Item Total
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">

              <tr
                v-for="item in order.items"
                :key="item.productId"
                class="hover:bg-slate-50"
              >
                <td class="px-6 py-4 text-sm font-semibold text-slate-900">
                  {{ item.productName }}
                </td>

                <td class="px-6 py-4 text-sm text-slate-600">
                  #{{ item.productId }}
                </td>

                <td class="px-6 py-4 text-sm text-slate-600">
                  {{ item.quantity }}
                </td>

                <td class="px-6 py-4 text-sm text-slate-600">
                  ₹{{ formatAmount(item.price) }}
                </td>

                <td class="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                  ₹{{ formatAmount(item.price * item.quantity) }}
                </td>
              </tr>

            </tbody>

          </table>
        </div>

      </div>

    </template>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

import {
  getOrderById,
} from '@/services/orderService'

import type { Order } from '@/types/order'

const route = useRoute()
const router = useRouter()

const order = ref<Order | null>(null)

const isLoading = ref(false)
const errorMessage = ref('')

const loadOrder = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const orderId = String(route.params.orderId)

    if (!orderId) {
      throw new Error('Invalid order ID')
    }

    order.value = await getOrderById(orderId)
  } catch (error) {
    console.error('Failed to load order:', error)

    errorMessage.value =
      'Unable to load order details. Please try again.'
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

const goBack = () => {
  router.push('/orders')
}

onMounted(() => {
  loadOrder()
})
</script>