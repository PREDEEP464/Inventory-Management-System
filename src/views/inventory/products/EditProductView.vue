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
        Back to Products
      </button>

      <p class="text-sm font-semibold text-blue-600">
        Inventory Management
      </p>

      <h2 class="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        Edit Product
      </h2>

      <p class="mt-2 text-sm text-slate-500">
        Update product information, pricing, inventory, and status.
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
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
      class="mx-auto w-full max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-5"
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

    <!-- Edit Form -->
    <div
      v-else-if="product"
      class="mx-auto w-full max-w-3xl"
    >
      <ProductForm
        :is-edit-mode="true"
        :initial-product="product"
        @cancel="goBack"
        @success="handleSuccess"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

import ProductForm from '@/views/inventory/products/ProductForm.vue'

import {
  getProductById,
} from '@/services/productService'

import type { Product } from '@/types/product'

const route = useRoute()
const router = useRouter()

const product = ref<Product | null>(null)

const isLoading = ref(false)
const errorMessage = ref('')

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

const goBack = () => {
  router.push('/products')
}

const handleSuccess = (updatedProduct: Product) => {
  console.log(
    'Product updated successfully:',
    updatedProduct,
  )

  router.push('/products')
}

onMounted(() => {
  loadProduct()
})
</script>