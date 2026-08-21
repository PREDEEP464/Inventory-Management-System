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
        Back to Categories
      </button>

      <h2 class="text-2xl font-bold text-slate-900">
        Category Products
      </h2>

      <p class="mt-1 text-sm text-slate-500">
        Products belonging to this category.
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm"
    >
      <p class="text-sm text-slate-500">
        Loading products...
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
        @click="loadProducts"
      >
        Try Again
      </button>
    </div>

    <!-- Products -->
    <div
      v-else
      class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      <div
        v-if="products.length === 0"
        class="p-12 text-center"
      >
        <p class="text-sm text-slate-500">
          No products found in this category.
        </p>
      </div>

      <table
        v-else
        class="min-w-full divide-y divide-slate-200"
      >
        <thead class="bg-slate-50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              ID
            </th>

            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Product
            </th>

            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Code
            </th>

            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Price
            </th>

            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Available Stock
            </th>

            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr
            v-for="product in products"
            :key="product.productId"
            class="transition hover:bg-slate-50"
          >
            <td class="px-6 py-4 text-sm font-medium text-slate-700">
              #{{ product.productId }}
            </td>

            <td class="px-6 py-4">
              <p class="text-sm font-semibold text-slate-900">
                {{ product.productName }}
              </p>

              <p class="mt-1 text-xs text-slate-500">
                {{ product.productDescription || 'No description' }}
              </p>
            </td>

            <td class="px-6 py-4 text-sm text-slate-600">
              {{ product.productCode }}
            </td>

            <td class="px-6 py-4 text-sm font-semibold text-slate-800">
              ₹{{ formatPrice(product.productPrice) }}
            </td>

            <td class="px-6 py-4 text-sm font-semibold text-slate-800">
              {{ product.availableQuantity }}
            </td>

            <td class="px-6 py-4">
              <span
                class="rounded-full px-3 py-1 text-xs font-semibold"
                :class="
                  product.isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'
                "
              >
                {{ product.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
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