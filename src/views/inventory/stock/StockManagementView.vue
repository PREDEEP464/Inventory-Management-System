<template>
  <div class="space-y-6">

    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-slate-900">
        Stock Management
      </h2>

      <p class="mt-1 text-sm text-slate-500">
        View inventory stock and restock products.
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm"
    >
      <p class="text-sm text-slate-500">
        Loading stock...
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

    <!-- Stock Table -->
    <div
      v-else
      class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >

      <div
        v-if="products.length === 0"
        class="p-12 text-center"
      >
        <p class="text-sm text-slate-500">
          No products found.
        </p>
      </div>

      <div
        v-else
        class="overflow-x-auto"
      >
        <table class="min-w-full divide-y divide-slate-200">

          <thead class="bg-slate-50">
            <tr>

              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                ID
              </th>

              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Product
              </th>

              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Product Code
              </th>

              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Total Stock
              </th>

              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Available Stock
              </th>

              <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
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
                  {{ product.categoryId }}
                </p>
              </td>

              <td class="px-6 py-4 text-sm text-slate-600">
                {{ product.productCode }}
              </td>

              <td class="px-6 py-4 text-sm font-semibold text-slate-800">
                {{ product.totalQuantity }}
              </td>

              <td class="px-6 py-4">
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
                  class="mt-1 text-xs text-amber-600"
                >
                  Low stock
                </p>
              </td>

              <td class="px-6 py-4 text-right">

                <button
                  type="button"
                  class="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                  @click="openRestock(product)"
                >
                  Restock
                </button>

              </td>

            </tr>

          </tbody>

        </table>
      </div>

    </div>

    <!-- Restock Modal -->
    <div
      v-if="selectedProduct"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
      @click.self="closeRestock"
    >

      <div class="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-lg font-semibold text-slate-900">
              Restock Product
            </h3>

            <p class="mt-1 text-sm text-slate-500">
              Add stock quantity to this product.
            </p>
          </div>

          <button
            type="button"
            class="text-slate-400 transition hover:text-slate-600"
            @click="closeRestock"
          >
            ✕
          </button>
        </div>

        <!-- Product -->
        <div class="mt-6 rounded-lg bg-slate-50 p-4">

          <p class="text-sm font-semibold text-slate-900">
            {{ selectedProduct.productName }}
          </p>

          <p class="mt-1 text-xs text-slate-500">
            Product ID: #{{ selectedProduct.productId }}
          </p>

          <div class="mt-4 grid grid-cols-2 gap-4">

            <div>
              <p class="text-xs text-slate-500">
                Total Stock
              </p>

              <p class="mt-1 text-lg font-bold text-slate-800">
                {{ selectedProduct.totalQuantity }}
              </p>
            </div>

            <div>
              <p class="text-xs text-slate-500">
                Available Stock
              </p>

              <p class="mt-1 text-lg font-bold text-emerald-600">
                {{ selectedProduct.availableQuantity }}
              </p>
            </div>

          </div>

        </div>

        <!-- Quantity -->
        <div class="mt-6">

          <label
            for="restockQuantity"
            class="block text-sm font-medium text-slate-700"
          >
            Quantity to Add
          </label>

          <input
            id="restockQuantity"
            v-model.number="restockQuantity"
            type="number"
            min="1"
            placeholder="Enter quantity"
            class="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p
            v-if="validationError"
            class="mt-1 text-sm text-red-600"
          >
            {{ validationError }}
          </p>

        </div>

        <!-- Actions -->
        <div class="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">

          <button
            type="button"
            class="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="closeRestock"
          >
            Cancel
          </button>

          <button
            type="button"
            :disabled="isSaving"
            class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            @click="handleRestock"
          >
            {{ isSaving ? 'Restocking...' : 'Restock' }}
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import {
  getProducts,
} from '@/services/productService'

import {
  updateStock,
} from '@/services/stockService'

import type { Product } from '@/types/product'

const products = ref<Product[]>([])

const selectedProduct = ref<Product | null>(null)

const restockQuantity = ref<number | null>(null)

const isLoading = ref(false)
const isSaving = ref(false)

const errorMessage = ref('')
const validationError = ref('')

const loadProducts = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const productPage = await getProducts({
        page: 0,
        size: 100,
        })

        products.value = productPage.content
  } catch (error) {
    console.error('Failed to load products:', error)

    errorMessage.value =
      'Unable to load stock information. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const openRestock = (product: Product) => {
  selectedProduct.value = product
  restockQuantity.value = null
  validationError.value = ''
}

const closeRestock = () => {
  selectedProduct.value = null
  restockQuantity.value = null
  validationError.value = ''
}

const handleRestock = async () => {
  validationError.value = ''

  if (
    restockQuantity.value === null ||
    !Number.isInteger(restockQuantity.value) ||
    restockQuantity.value <= 0
  ) {
    validationError.value =
      'Please enter a valid quantity greater than 0.'
    return
  }

  if (!selectedProduct.value) {
    return
  }

  try {
    isSaving.value = true

    await updateStock([
      {
        productId: selectedProduct.value.productId,
        quantity: restockQuantity.value,
      },
    ])

    closeRestock()

    await loadProducts()
  } catch (error) {
    console.error('Failed to restock product:', error)

    errorMessage.value =
      'Unable to restock product. Please try again.'
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  loadProducts()
})
</script>