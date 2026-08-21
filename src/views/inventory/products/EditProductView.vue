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
        Back to Products
      </button>

      <h2 class="text-2xl font-bold text-slate-900">
        Edit Product
      </h2>

      <p class="mt-1 text-sm text-slate-500">
        Update product information and status.
      </p>
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

    <!-- Edit Form -->
    <ProductForm
      v-else-if="product"
      :is-edit-mode="true"
      :initial-product="product"
      @cancel="goBack"
      @success="handleSuccess"
    />

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

import ProductForm from '@/components/products/ProductForm.vue'

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