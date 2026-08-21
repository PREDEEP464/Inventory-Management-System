<template>
  <div class="space-y-8">

    <!-- Page Header -->
    <div>
      <button
        type="button"
        class="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        @click="goBack"
      >
        <ArrowLeft :size="17" />
        Back to Categories
      </button>

      <p class="text-sm font-semibold text-blue-600">
        Product Management
      </p>

      <h2 class="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        Category Products
      </h2>

      <p class="mt-2 text-sm text-slate-500">
        View and manage products belonging to this category.
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
    >
      <div
        class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
      ></div>

      <p class="text-sm font-semibold text-slate-700">
        Loading products...
      </p>

      <p class="mt-1 text-xs text-slate-400">
        Please wait while we load the category products.
      </p>
    </div>

    <!-- Error -->
    <div
      v-else-if="errorMessage"
      class="mx-auto w-full max-w-6xl rounded-2xl border border-red-200 bg-red-50 p-5"
    >
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >

        <div>
          <p class="font-semibold text-red-800">
            Unable to load products
          </p>

          <p class="mt-1 text-sm text-red-700">
            {{ errorMessage }}
          </p>
        </div>

        <button
          type="button"
          class="w-fit rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
          @click="loadProducts"
        >
          Try Again
        </button>

      </div>
    </div>

    <!-- Products -->
    <div
      v-else
      class="mx-auto w-full max-w-6xl"
    >

      <!-- Empty State -->
      <div
        v-if="products.length === 0"
        class="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
      >

        <h3 class="mt-4 text-sm font-semibold text-slate-900">
          No products found
        </h3>

        <p class="mt-1 text-sm text-slate-500">
          There are currently no products assigned to this category.
        </p>
      </div>

      <!-- Product Table -->
      <div
        v-else
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >

        <div class="overflow-x-auto">

          <table class="min-w-full divide-y divide-slate-200">

            <thead class="bg-slate-50/80">
              <tr>

                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  ID
                </th>

                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Product
                </th>

                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Code
                </th>

                <th
                  class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Price
                </th>

                <th
                  class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Available Stock
                </th>

                <th
                  class="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Status
                </th>

              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">

              <tr
                v-for="product in products"
                :key="product.productId"
                class="transition-colors hover:bg-blue-50/40"
              >

                <!-- ID -->
                <td class="whitespace-nowrap px-6 py-4">
                  <span class="text-sm font-semibold text-slate-700">
                    #{{ product.productId }}
                  </span>
                </td>

                <!-- Product -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">

                    <div>
                      <p class="text-sm font-semibold text-slate-900">
                        {{ product.productName }}
                      </p>

                      <p class="mt-1 max-w-xs truncate text-xs text-slate-500">
                        {{ product.productDescription || 'No description' }}
                      </p>
                    </div>

                  </div>
                </td>

                <!-- Code -->
                <td class="whitespace-nowrap px-6 py-4">
                  <span class="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {{ product.productCode }}
                  </span>
                </td>

                <!-- Price -->
                <td class="whitespace-nowrap px-6 py-4 text-right">
                  <span class="text-sm font-semibold text-slate-900">
                    ₹{{ formatPrice(product.productPrice) }}
                  </span>
                </td>

                <!-- Available Stock -->
                <td class="whitespace-nowrap px-6 py-4 text-right">

                  <span
                    class="text-sm font-semibold"
                    :class="
                      product.availableQuantity <= 10
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    "
                  >
                    {{ product.availableQuantity }}
                  </span>

                  <p
                    v-if="product.availableQuantity <= 10"
                    class="mt-0.5 text-xs text-amber-500"
                  >
                    Low stock
                  </p>

                </td>

                <!-- Status -->
                <td class="whitespace-nowrap px-6 py-4 text-center">

                  <span
                    class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                    :class="
                      product.isActive
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    "
                  >
                    <span
                      class="h-1.5 w-1.5 rounded-full"
                      :class="
                        product.isActive
                          ? 'bg-emerald-500'
                          : 'bg-slate-400'
                      "
                    ></span>

                    {{ product.isActive ? 'Active' : 'Inactive' }}
                  </span>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

import {
  getProductsByCategory,
} from '@/services/productService'

import type { Product } from '@/types/product'

const route = useRoute()
const router = useRouter()

const products = ref<Product[]>([])

const isLoading = ref(false)
const errorMessage = ref('')

const loadProducts = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const categoryId = Number(route.params.categoryId)

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      throw new Error('Invalid category ID')
    }

    products.value = await getProductsByCategory(categoryId)
  } catch (error) {
    console.error('Failed to load category products:', error)

    errorMessage.value =
      'Unable to load products for this category. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const formatPrice = (price: number) => {
  return price.toLocaleString('en-IN')
}

const goBack = () => {
  router.push('/categories')
}

onMounted(() => {
  loadProducts()
})
</script>