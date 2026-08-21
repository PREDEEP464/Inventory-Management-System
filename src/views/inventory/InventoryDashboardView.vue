<template>
  <div class="space-y-6">

    <!-- Page Header -->
    <div>
      <h2 class="text-2xl font-bold text-slate-900">
        Inventory Dashboard
      </h2>

      <p class="mt-1 text-sm text-slate-500">
        Overview of your inventory and current stock levels.
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="rounded-xl border border-slate-200 bg-white p-8 text-center"
    >
      <p class="text-sm text-slate-500">
        Loading inventory statistics...
      </p>
    </div>

    <!-- Error -->
    <div
      v-else-if="errorMessage"
      class="rounded-xl border border-red-200 bg-red-50 p-4"
    >
      <p class="text-sm font-medium text-red-700">
        {{ errorMessage }}
      </p>
    </div>

    <template v-else>

      <!-- Statistics Cards -->
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <!-- Total Products -->
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">
                Total Products
              </p>

              <p class="mt-2 text-3xl font-bold text-slate-900">
                {{ statistics?.totalProducts ?? 0 }}
              </p>
            </div>

            <div class="rounded-lg bg-blue-50 p-3">
              <Package class="text-blue-600" :size="22" />
            </div>
          </div>
        </div>

        <!-- Active Products -->
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">
                Active Products
              </p>

              <p class="mt-2 text-3xl font-bold text-slate-900">
                {{ statistics?.activeProducts ?? 0 }}
              </p>
            </div>

            <div class="rounded-lg bg-emerald-50 p-3">
              <CircleCheck class="text-emerald-600" :size="22" />
            </div>
          </div>
        </div>

        <!-- Low Stock -->
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">
                Low Stock
              </p>

              <p class="mt-2 text-3xl font-bold text-slate-900">
                {{ statistics?.lowStockProducts ?? 0 }}
              </p>
            </div>

            <div class="rounded-lg bg-amber-50 p-3">
              <TriangleAlert class="text-amber-600" :size="22" />
            </div>
          </div>
        </div>

        <!-- Available Stock -->
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">
                Available Stock
              </p>

              <p class="mt-2 text-3xl font-bold text-slate-900">
                {{ statistics?.availableStock ?? 0 }}
              </p>
            </div>

            <div class="rounded-lg bg-violet-50 p-3">
              <Warehouse class="text-violet-600" :size="22" />
            </div>
          </div>
        </div>

      </div>

      <!-- Inventory Overview -->
      <div class="grid gap-6 lg:grid-cols-2">

        <!-- Stock Overview -->
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-slate-900">
              Stock Overview
            </h3>

            <p class="mt-1 text-sm text-slate-500">
              Current inventory quantity summary.
            </p>
          </div>

          <div class="space-y-5">

            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-600">
                Total Stock
              </span>

              <span class="font-semibold text-slate-900">
                {{ statistics?.totalStock ?? 0 }}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-600">
                Available Stock
              </span>

              <span class="font-semibold text-emerald-600">
                {{ statistics?.availableStock ?? 0 }}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-600">
                Inactive Products
              </span>

              <span class="font-semibold text-slate-600">
                {{ statistics?.inactiveProducts ?? 0 }}
              </span>
            </div>

          </div>
        </div>

        <!-- Low Stock Products -->
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div class="mb-6 flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-slate-900">
                Low Stock Products
              </h3>

              <p class="mt-1 text-sm text-slate-500">
                Products requiring stock attention.
              </p>
            </div>

            <span class="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              Threshold: {{ LOW_STOCK_THRESHOLD }}
            </span>
          </div>

          <div
            v-if="lowStockProducts.length === 0"
            class="rounded-lg bg-slate-50 p-6 text-center"
          >
            <p class="text-sm text-slate-500">
              No low-stock products found.
            </p>
          </div>

          <div
            v-else
            class="divide-y divide-slate-100"
          >
            <div
              v-for="product in lowStockProducts"
              :key="product.productId"
              class="flex items-center justify-between py-4"
            >
              <div>
                <p class="text-sm font-medium text-slate-900">
                  {{ product.productName }}
                </p>

                <p class="mt-1 text-xs text-slate-500">
                  {{ product.productCode }}
                </p>
              </div>

              <div class="text-right">
                <p class="text-sm font-semibold text-amber-600">
                  {{ product.availableQuantity }}
                </p>

                <p class="text-xs text-slate-500">
                  available
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  CircleCheck,
  Package,
  TriangleAlert,
  Warehouse,
} from 'lucide-vue-next'

import {
  getInventoryStatistics,
  getLowStockProducts,
} from '@/services/productService'

import type {
  InventoryStatistics,
  Product,
} from '@/types/product'

const LOW_STOCK_THRESHOLD = 10

const statistics = ref<InventoryStatistics | null>(null)
const lowStockProducts = ref<Product[]>([])

const isLoading = ref(true)
const errorMessage = ref('')

const loadDashboard = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const [statisticsData, lowStockData] = await Promise.all([
      getInventoryStatistics(),
      getLowStockProducts(LOW_STOCK_THRESHOLD),
    ])

    statistics.value = statisticsData
    lowStockProducts.value = lowStockData
  } catch (error) {
    console.error('Failed to load inventory dashboard:', error)

    errorMessage.value =
      'Unable to load inventory information. Please try again.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadDashboard()
})
</script>