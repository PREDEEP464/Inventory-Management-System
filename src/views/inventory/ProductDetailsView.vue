<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <button
          type="button"
          class="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          @click="goBack"
        >
          <ArrowLeft :size="17" />
          Back to Products
        </button>

        <h2 class="text-2xl font-bold text-slate-900">
          Product Details
        </h2>

        <p class="mt-1 text-sm text-slate-500">
          View product and inventory information.
        </p>
      </div>

      <button
        v-if="product"
        type="button"
        class="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        @click="goToEdit"
      >
        <Pencil :size="17" />
        Edit Product
      </button>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm"
    >
      <p class="text-sm text-slate-500">
        Loading product details...
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
        @click="loadProduct"
      >
        Try Again
      </button>
    </div>

    <!-- Product -->
    <template v-else-if="product">

      <!-- Main Information -->
      <div class="grid gap-6 lg:grid-cols-3">

        <!-- Product Information -->
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

          <div class="flex items-start justify-between gap-4">

            <div>
              <p class="text-sm font-medium text-slate-500">
                Product
              </p>

              <h3 class="mt-1 text-2xl font-bold text-slate-900">
                {{ product.productName }}
              </h3>

              <p class="mt-1 text-sm text-slate-500">
                {{ product.productCode }}
              </p>
            </div>

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

          </div>

          <div class="mt-8 grid gap-6 sm:grid-cols-2">

            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
                Product ID
              </p>

              <p class="mt-1 font-medium text-slate-800">
                #{{ product.productId }}
              </p>
            </div>

            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
                Category
              </p>

              <p class="mt-1 font-medium text-slate-800">
                {{ product.categoryId }}
              </p>
            </div>

            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
                Product Price
              </p>

              <p class="mt-1 text-xl font-bold text-slate-900">
                ₹{{ formatPrice(product.productPrice) }}
              </p>
            </div>

          </div>

          <div class="mt-8 border-t border-slate-100 pt-6">

            <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
              Description
            </p>

            <p class="mt-2 text-sm leading-6 text-slate-600">
              {{ product.productDescription || 'No description available.' }}
            </p>

          </div>

        </div>

        <!-- Inventory Summary -->
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div class="flex items-center gap-2">
            <Package :size="19" class="text-blue-600" />

            <h3 class="font-semibold text-slate-900">
              Inventory
            </h3>
          </div>

          <div class="mt-6 space-y-5">

            <div>
              <p class="text-sm text-slate-500">
                Total Quantity
              </p>

              <p class="mt-1 text-2xl font-bold text-slate-900">
                {{ product.totalQuantity }}
              </p>
            </div>

            <div class="border-t border-slate-100 pt-5">
              <p class="text-sm text-slate-500">
                Available Quantity
              </p>

              <p
                class="mt-1 text-2xl font-bold"
                :class="
                  product.availableQuantity <= 10
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                "
              >
                {{ product.availableQuantity }}
              </p>

              <p
                v-if="product.availableQuantity <= 10"
                class="mt-1 text-xs font-medium text-amber-600"
              >
                Low stock
              </p>
            </div>

          </div>

        </div>

      </div>

      <!-- Product Information Card -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h3 class="font-semibold text-slate-900">
          Product Information
        </h3>

        <div class="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
              Product Code
            </p>

            <p class="mt-1 text-sm font-medium text-slate-800">
              {{ product.productCode }}
            </p>
          </div>

          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
              Category ID
            </p>

            <p class="mt-1 text-sm font-medium text-slate-800">
              {{ product.categoryId }}
            </p>
          </div>

          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
              Total Stock
            </p>

            <p class="mt-1 text-sm font-medium text-slate-800">
              {{ product.totalQuantity }}
            </p>
          </div>

          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
              Available Stock
            </p>

            <p class="mt-1 text-sm font-medium text-slate-800">
              {{ product.availableQuantity }}
            </p>
          </div>

        </div>

      </div>

    </template>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft,
  Package,
  Pencil,
} from 'lucide-vue-next'

import {
  getProductById,
} from '@/services/productService'

import type { Product } from '@/types/product'

const route = useRoute()
const router = useRouter()

const product = ref<Product | null>(null)

const isLoading = ref(false)
const errorMessage = ref('')

const goToEdit = () => {
  if (!product.value) {
    return
  }

  router.push(`/products/${product.value.productId}/edit`)
}

const loadProduct = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const productId = Number(route.params.productId)

    if (!Number.isInteger(productId) || productId <= 0) {
      throw new Error('Invalid product ID')
    }

    product.value = await getProductById(productId)
  } catch (error) {
    console.error('Failed to load product:', error)

    errorMessage.value =
      'Unable to load product details. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const formatPrice = (price: number) => {
  return price.toLocaleString('en-IN')
}

const goBack = () => {
  router.push('/products')
}

onMounted(() => {
  loadProduct()
})
</script>