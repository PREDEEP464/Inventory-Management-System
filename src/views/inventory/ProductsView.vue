<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">
          Products
        </h2>

        <p class="mt-1 text-sm text-slate-500">
          Manage and monitor inventory products.
        </p>
      </div>

      <button
        type="button"
        @click="goToCreateProduct"
        class="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        + Add Product
      </button>
    </div>

    <!-- Filters -->
    <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <!-- Row 1 -->
      <div class="grid gap-4 md:grid-cols-2">

        <!-- Search -->
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">
            Search Product
          </label>

          <div class="relative">
            <Search
              :size="18"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              v-model="filters.name"
              type="text"
              placeholder="Search by product name..."
              class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              @keyup.enter="applyFilters"
            />
          </div>
        </div>

        <!-- Category -->
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">
            Category ID
          </label>

          <input
            v-model.number="filters.categoryId"
            type="number"
            min="1"
            placeholder="Category ID"
            class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

      </div>

      <!-- Row 2 - Price Range -->
      <div class="mt-4 grid gap-4 md:grid-cols-2">

        <!-- Min Price -->
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">
            Min Price
          </label>

          <input
            v-model.number="filters.minPrice"
            type="number"
            min="0"
            placeholder="Minimum price"
            class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <!-- Max Price -->
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700">
            Max Price
          </label>

          <input
            v-model.number="filters.maxPrice"
            type="number"
            min="0"
            placeholder="Maximum price"
            class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

      </div>

      <!-- Actions -->
      <div class="mt-5 flex justify-end gap-3">

        <button
          type="button"
          class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          @click="clearFilters"
        >
          Clear
        </button>

        <button
          type="button"
          class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          @click="applyFilters"
        >
          Apply Filters
        </button>

      </div>

    </div>

    <!-- Error -->
    <div
      v-if="errorMessage"
      class="rounded-lg border border-red-200 bg-red-50 p-4"
    >
      <p class="text-sm font-medium text-red-700">
        {{ errorMessage }}
      </p>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

      <div class="overflow-x-auto">

        <table class="min-w-full divide-y divide-slate-200">

          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Product
              </th>

              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>

              <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Price
              </th>

              <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Total Stock
              </th>

              <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Available
              </th>

              <th class="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">

            <!-- Loading -->
            <tr v-if="isLoading">
              <td
                colspan="7"
                class="px-6 py-12 text-center text-sm text-slate-500"
              >
                Loading products...
              </td>
            </tr>

            <!-- Empty -->
            <tr v-else-if="products.length === 0">
              <td
                colspan="7"
                class="px-6 py-12 text-center text-sm text-slate-500"
              >
                No products found.
              </td>
            </tr>

            <!-- Products -->
            <tr
              v-for="product in products"
              v-else
              :key="product.productId"
              class="transition hover:bg-slate-50"
            >
              <td class="px-6 py-4">
                <div>
                  <p class="font-medium text-slate-900">
                    {{ product.productName }}
                  </p>

                  <p class="mt-1 text-xs text-slate-500">
                    {{ product.productCode }}
                  </p>
                </div>
              </td>

              <td class="px-6 py-4 text-sm text-slate-600">
                {{ product.categoryId }}
              </td>

              <td class="px-6 py-4 text-right text-sm font-medium text-slate-900">
                ₹{{ product.productPrice.toLocaleString('en-IN') }}
              </td>

              <td class="px-6 py-4 text-right text-sm text-slate-700">
                {{ product.totalQuantity }}
              </td>

              <td class="px-6 py-4 text-right text-sm font-semibold">
                <span
                  :class="
                    product.availableQuantity <= 10
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  "
                >
                  {{ product.availableQuantity }}
                </span>
              </td>

              <td class="px-6 py-4 text-center">
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

              <td class="px-6 py-4 text-right">
                <button
                  type="button"
                  class="text-sm font-semibold text-blue-600 hover:text-blue-800"
                  @click="viewProduct(product.productId)"
                >
                  View
                </button>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

      <!-- Pagination -->
      <div
        v-if="!isLoading && totalElements > 0"
        class="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="text-sm text-slate-500">
          Showing page
          <span class="font-medium text-slate-700">
            {{ currentPage + 1 }}
          </span>
          of
          <span class="font-medium text-slate-700">
            {{ totalPages }}
          </span>
          ·
          {{ totalElements }} products
        </p>

        <div class="flex gap-2">

          <button
            type="button"
            :disabled="currentPage === 0"
            class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            @click="goToPage(currentPage - 1)"
          >
            Previous
          </button>

          <button
            type="button"
            :disabled="currentPage >= totalPages - 1"
            class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            @click="goToPage(currentPage + 1)"
          >
            Next
          </button>

        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Search } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

import {
  getProducts,
  type ProductFilters,
} from '@/services/productService'

import type { Product } from '@/types/product'

const router = useRouter()

const products = ref<Product[]>([])


const goToCreateProduct = () => {
  router.push('/products/create')
}

const isLoading = ref(false)
const errorMessage = ref('')

const currentPage = ref(0)
const totalPages = ref(0)
const totalElements = ref(0)

const PAGE_SIZE = 10

const filters = reactive<ProductFilters>({
  name: '',
  categoryId: undefined,
  minPrice: undefined,
  maxPrice: undefined,
})

const loadProducts = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await getProducts({
      name: filters.name || undefined,
      categoryId: filters.categoryId,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      page: currentPage.value,
      size: PAGE_SIZE,
    })

    products.value = response.content
    totalPages.value = response.totalPages
    totalElements.value = response.totalElements
  } catch (error) {
    console.error('Failed to load products:', error)

    errorMessage.value =
      'Unable to load products. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const applyFilters = () => {
  currentPage.value = 0
  loadProducts()
}

const clearFilters = () => {
  filters.name = ''
  filters.categoryId = undefined
  filters.minPrice = undefined
  filters.maxPrice = undefined

  currentPage.value = 0

  loadProducts()
}

const goToPage = (page: number) => {
  if (page < 0 || page >= totalPages.value) {
    return
  }

  currentPage.value = page
  loadProducts()
}

const viewProduct = (productId: number) => {
  router.push(`/products/${productId}`)
}

onMounted(() => {
  loadProducts()
})
</script>