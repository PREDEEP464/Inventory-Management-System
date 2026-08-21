<template>
  <div class="space-y-8">

    <!-- Page Header -->
    <div>
      <p class="text-sm font-semibold text-blue-600">
        Inventory Management
      </p>

      <h2 class="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        Inventory Dashboard
      </h2>

      <p class="mt-2 text-sm text-slate-500">
        Overview of your products, stock levels, and inventory activity.
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
    >
      <div
        class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
      ></div>

      <p class="text-sm font-medium text-slate-700">
        Loading inventory statistics...
      </p>
    </div>

    <!-- Error -->
    <div
      v-else-if="errorMessage"
      class="rounded-2xl border border-red-200 bg-red-50 p-5"
    >
      <div class="flex items-center gap-3">
        <div class="rounded-lg bg-red-100 p-2">
          <TriangleAlert
            :size="20"
            class="text-red-600"
          />
        </div>

        <div>
          <p class="font-semibold text-red-800">
            Unable to load inventory
          </p>

          <p class="mt-1 text-sm text-red-700">
            {{ errorMessage }}
          </p>
        </div>
      </div>
    </div>

    <template v-else>

      <!-- Statistics Cards -->
      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <!-- Total Products -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="flex items-start justify-between">

            <div>
              <p class="text-sm font-medium text-slate-500">
                Total Products
              </p>

              <p class="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {{ statistics?.totalProducts ?? 0 }}
              </p>

              <p class="mt-2 text-xs text-slate-400">
                Products in catalog
              </p>
            </div>

            <div class="rounded-xl bg-blue-50 p-3">
              <Package
                :size="22"
                class="text-blue-600"
              />
            </div>

          </div>
        </div>

        <!-- Active Products -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="flex items-start justify-between">

            <div>
              <p class="text-sm font-medium text-slate-500">
                Active Products
              </p>

              <p class="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {{ statistics?.activeProducts ?? 0 }}
              </p>

              <p class="mt-2 text-xs text-emerald-600">
                Currently active
              </p>
            </div>

            <div class="rounded-xl bg-emerald-50 p-3">
              <CircleCheck
                :size="22"
                class="text-emerald-600"
              />
            </div>

          </div>
        </div>

        <!-- Low Stock -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="flex items-start justify-between">

            <div>
              <p class="text-sm font-medium text-slate-500">
                Low Stock
              </p>

              <p class="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {{ statistics?.lowStockProducts ?? 0 }}
              </p>

              <p class="mt-2 text-xs text-amber-600">
                Requires attention
              </p>
            </div>

            <div class="rounded-xl bg-amber-50 p-3">
              <TriangleAlert
                :size="22"
                class="text-amber-600"
              />
            </div>

          </div>
        </div>

        <!-- Available Stock -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="flex items-start justify-between">

            <div>
              <p class="text-sm font-medium text-slate-500">
                Available Stock
              </p>

              <p class="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {{ statistics?.availableStock ?? 0 }}
              </p>

              <p class="mt-2 text-xs text-violet-600">
                Units available
              </p>
            </div>

            <div class="rounded-xl bg-violet-50 p-3">
              <Warehouse
                :size="22"
                class="text-violet-600"
              />
            </div>

          </div>
        </div>

      </div>

      <!-- Inventory Overview -->
      <div class="grid gap-6 lg:grid-cols-2">

        <!-- Stock Overview -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          <div class="flex items-start justify-between">

            <div>
              <h3 class="text-lg font-semibold text-slate-900">
                Stock Overview
              </h3>

              <p class="mt-1 text-sm text-slate-500">
                Current inventory quantity summary.
              </p>
            </div>

            <div class="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
              Inventory
            </div>

          </div>

          <!-- Main Stock -->
          <div class="mt-8 rounded-xl bg-slate-50 p-5">

            <div class="flex items-end justify-between">

              <div>
                <p class="text-sm font-medium text-slate-500">
                  Total Stock
                </p>

                <p class="mt-2 text-3xl font-bold text-slate-900">
                  {{ statistics?.totalStock ?? 0 }}
                </p>
              </div>

              <p class="text-sm text-slate-400">
                units
              </p>

            </div>

            <!-- Stock Progress -->
            <div class="mt-5">

              <div class="mb-2 flex items-center justify-between">
                <span class="text-xs font-medium text-slate-500">
                  Available stock
                </span>

                <span class="text-xs font-semibold text-emerald-600">
                  {{
                    statistics?.totalStock
                      ? Math.round(
                          ((statistics?.availableStock ?? 0) /
                            statistics.totalStock) *
                            100
                        )
                      : 0
                  }}%
                </span>
              </div>

              <div class="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  class="h-full rounded-full bg-emerald-500 transition-all"
                  :style="{
                    width: `${
                      statistics?.totalStock
                        ? Math.min(
                            100,
                            ((statistics?.availableStock ?? 0) /
                              statistics.totalStock) *
                              100
                          )
                        : 0
                    }%`,
                  }"
                ></div>
              </div>

            </div>

          </div>

          <!-- Stock Details -->
          <div class="mt-5 grid grid-cols-2 gap-4">

            <div class="rounded-xl border border-slate-100 p-4">
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-emerald-500"></span>

                <span class="text-xs font-medium text-slate-500">
                  Available
                </span>
              </div>

              <p class="mt-3 text-xl font-bold text-emerald-600">
                {{ statistics?.availableStock ?? 0 }}
              </p>

              <p class="mt-1 text-xs text-slate-400">
                Units available
              </p>
            </div>

            <div class="rounded-xl border border-slate-100 p-4">
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-slate-400"></span>

                <span class="text-xs font-medium text-slate-500">
                  Inactive
                </span>
              </div>

              <p class="mt-3 text-xl font-bold text-slate-700">
                {{ statistics?.inactiveProducts ?? 0 }}
              </p>

              <p class="mt-1 text-xs text-slate-400">
                Inactive products
              </p>
            </div>

          </div>

        </div>

        <!-- Low Stock Products -->
        <div
          class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          <!-- Header -->
          <div
            class="border-b border-slate-100 p-6"
          >

            <div class="flex items-start justify-between gap-4">

              <div>
                <h3 class="text-lg font-semibold text-slate-900">
                  Low Stock Products
                </h3>

                <p class="mt-1 text-sm text-slate-500">
                  Products requiring stock attention.
                </p>
              </div>

              <span
                class="shrink-0 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700"
              >
                {{ lowStockProducts.length }}
              </span>

            </div>

          </div>

          <!-- Empty State -->
          <div
            v-if="lowStockProducts.length === 0"
            class="p-10 text-center"
          >

            <div
              class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50"
            >
              <CircleCheck
                :size="24"
                class="text-emerald-600"
              />
            </div>

            <p class="mt-4 text-sm font-semibold text-slate-900">
              No low-stock products
            </p>

            <p class="mt-1 text-sm text-slate-500">
              All products are currently above the stock threshold.
            </p>

          </div>

          <!-- Product List -->
          <div
            v-else
            class="divide-y divide-slate-100"
          >

            <div
              v-for="product in lowStockProducts"
              :key="product.productId"
              class="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-slate-50"
            >

              <!-- Product Info -->
              <div class="flex min-w-0 items-center gap-3">

                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50"
                >
                  <Package
                    :size="18"
                    class="text-amber-600"
                  />
                </div>

                <div class="min-w-0">
                  <p class="truncate text-sm font-semibold text-slate-900">
                    {{ product.productName }}
                  </p>

                  <p class="mt-1 text-xs text-slate-500">
                    {{ product.productCode }}
                  </p>
                </div>

              </div>

              <!-- Quantity -->
              <div class="shrink-0 text-right">

                <p class="text-sm font-bold text-amber-600">
                  {{ product.availableQuantity }}
                </p>

                <p class="mt-0.5 text-xs text-slate-400">
                  available
                </p>

              </div>

            </div>

          </div>

          <!-- Threshold -->
          <div
            class="border-t border-slate-100 bg-slate-50 px-6 py-3"
          >
            <p class="text-xs text-slate-500">
              Low stock threshold:
              <span class="font-semibold text-slate-700">
                {{ LOW_STOCK_THRESHOLD }} units
              </span>
            </p>
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