<template>
  <div class="space-y-8">

    <!-- Page Header -->
    <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

      <div>
        <button
          type="button"
          class="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          @click="goBack"
        >
          <ArrowLeft :size="17" />
          Back to Products
        </button>

        <p class="text-sm font-semibold text-blue-600">
          Inventory Management
        </p>

        <h2 class="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Product Details
        </h2>

        <p class="mt-2 text-sm text-slate-500">
          View product information, pricing, and inventory details.
        </p>
      </div>

      <!-- Edit Button -->
      <button
        v-if="product"
        type="button"
        class="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
        @click="goToEdit"
      >
        <Pencil :size="17" />
        Edit Product
      </button>

    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
    >
      <div
        class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
      ></div>

      <p class="text-sm font-semibold text-slate-700">
        Loading product details...
      </p>

      <p class="mt-1 text-xs text-slate-400">
        Please wait while we load the product information.
      </p>
    </div>

    <!-- Error -->
    <div
      v-else-if="errorMessage"
      class="mx-auto w-full max-w-5xl rounded-2xl border border-red-200 bg-red-50 p-5"
    >
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >

        <div>
          <p class="font-semibold text-red-800">
            Unable to load product
          </p>

          <p class="mt-1 text-sm text-red-700">
            {{ errorMessage }}
          </p>
        </div>

        <button
          type="button"
          class="w-fit rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
          @click="loadProduct"
        >
          Try Again
        </button>

      </div>
    </div>

    <!-- Product Details -->
    <template v-else-if="product">

      <div class="mx-auto w-full max-w-5xl space-y-6">

        <!-- Main Product Card -->
        <div
          class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          <!-- Product Header -->
          <div class="border-b border-slate-100 bg-slate-50/50 p-6 sm:p-8">

            <div
              class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
            >

              <div class="flex items-start gap-4">

                <div>
                  <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Product
                  </p>

                  <h3 class="mt-1 text-2xl font-bold text-slate-900">
                    {{ product.productName }}
                  </h3>

                  <p class="mt-1 text-sm text-slate-500">
                    {{ product.productCode }}
                  </p>
                </div>

              </div>

              <!-- Status -->
              <span
                class="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
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

            </div>

          </div>

          <!-- Product Details -->
          <div class="p-6 sm:p-8">

            <div class="grid gap-6 sm:grid-cols-3">

              <!-- Product ID -->
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Product ID
                </p>

                <p class="mt-2 text-sm font-semibold text-slate-800">
                  #{{ product.productId }}
                </p>
              </div>

              <!-- Category -->
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Category
                </p>

                <p class="mt-2 text-sm font-semibold text-slate-800">
                  {{ product.categoryId }}
                </p>
              </div>

              <!-- Price -->
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Product Price
                </p>

                <p class="mt-1 text-xl font-bold text-slate-900">
                  ₹{{ formatPrice(product.productPrice) }}
                </p>
              </div>

            </div>

            <!-- Description -->
            <div class="mt-8 border-t border-slate-100 pt-6">

              <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Description
              </p>

              <p class="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                {{ product.productDescription || 'No description available.' }}
              </p>

            </div>

          </div>

        </div>

        <!-- Inventory Section -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          <div class="flex items-center justify-between">

            <div>
              <h3 class="text-lg font-semibold text-slate-900">
                Inventory
              </h3>

              <p class="mt-1 text-sm text-slate-500">
                Current stock levels for this product.
              </p>
            </div>

          </div>

          <div class="mt-6 grid gap-4 sm:grid-cols-2">

            <!-- Total Stock -->
            <div
              class="rounded-xl border border-slate-100 bg-slate-50 p-5"
            >
              <p class="text-sm font-medium text-slate-500">
                Total Quantity
              </p>

              <p class="mt-2 text-3xl font-bold text-slate-900">
                {{ product.totalQuantity }}
              </p>

              <p class="mt-1 text-xs text-slate-400">
                Total units in inventory
              </p>
            </div>

            <!-- Available Stock -->
            <div
              class="rounded-xl border p-5"
              :class="
                product.availableQuantity <= 10
                  ? 'border-amber-100 bg-amber-50/50'
                  : 'border-emerald-100 bg-emerald-50/50'
              "
            >
              <p class="text-sm font-medium text-slate-500">
                Available Quantity
              </p>

              <p
                class="mt-2 text-3xl font-bold"
                :class="
                  product.availableQuantity <= 10
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                "
              >
                {{ product.availableQuantity }}
              </p>

              <p
                class="mt-1 text-xs"
                :class="
                  product.availableQuantity <= 10
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                "
              >
                {{
                  product.availableQuantity <= 10
                    ? 'Stock requires attention'
                    : 'Stock level is healthy'
                }}
              </p>
            </div>

          </div>

        </div>

        <!-- Additional Information -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          <div>
            <h3 class="text-lg font-semibold text-slate-900">
              Additional Information
            </h3>

            <p class="mt-1 text-sm text-slate-500">
              Reference information for this product.
            </p>
          </div>

          <div
            class="mt-6 grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0"
          >

            <!-- Product Code -->
            <div class="pb-5 sm:pb-0 sm:pr-6">
              <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Product Code
              </p>

              <p class="mt-2 text-sm font-semibold text-slate-800">
                {{ product.productCode }}
              </p>
            </div>

            <!-- Category ID -->
            <div class="pt-5 sm:pl-6 sm:pt-0">
              <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Category ID
              </p>

              <p class="mt-2 text-sm font-semibold text-slate-800">
                #{{ product.categoryId }}
              </p>
            </div>

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