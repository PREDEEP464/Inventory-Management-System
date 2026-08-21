<template>
  <div class="space-y-6">

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
        Add Product
      </h2>

      <p class="mt-1 text-sm text-slate-500">
        Create a new product in the inventory.
      </p>
    </div>

    <ProductForm
      @cancel="goBack"
      @success="handleSuccess"
    />

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