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
        Add Product
      </h2>

      <p class="mt-2 text-sm text-slate-500">
        Create a new product and add it to your inventory.
      </p>
    </div>

    <!-- Product Form -->
    <div class="mx-auto w-full max-w-3xl">

      <ProductForm
        @cancel="goBack"
        @success="handleSuccess"
      />

    </div>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

import ProductForm from '@/views/inventory/products/ProductForm.vue'

import type { Product } from '@/types/product'

const router = useRouter()

const goBack = () => {
  router.push('/products')
}

const handleSuccess = (product: Product) => {
  console.log('Product created successfully:', product)

  router.push('/products')
}
</script>