<template>
  <form
    class="space-y-6"
    @submit.prevent="handleSubmit"
  >
    <!-- Basic Information -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 class="text-lg font-semibold text-slate-900">
        {{ isEditMode ? 'Edit Product' : 'Basic Information' }}
      </h3>

      <div class="mt-6 grid gap-5 md:grid-cols-2">

        <!-- Product Code -->
        <div>
          <label class="block text-sm font-medium text-slate-700">
            Product Code
          </label>

          <input
            v-model="form.productCode"
            type="text"
            placeholder="e.g. IPHONE16PRO"
            class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p
            v-if="errors.productCode"
            class="mt-1 text-xs text-red-600"
          >
            {{ errors.productCode }}
          </p>
        </div>

        <!-- Product Name -->
        <div>
          <label class="block text-sm font-medium text-slate-700">
            Product Name
          </label>

          <input
            v-model="form.productName"
            type="text"
            placeholder="e.g. iPhone 16 Pro"
            class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p
            v-if="errors.productName"
            class="mt-1 text-xs text-red-600"
          >
            {{ errors.productName }}
          </p>
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-medium text-slate-700">
            Category ID
          </label>

          <input
            v-model.number="form.categoryId"
            type="number"
            min="1"
            placeholder="e.g. 1"
            class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p
            v-if="errors.categoryId"
            class="mt-1 text-xs text-red-600"
          >
            {{ errors.categoryId }}
          </p>
        </div>

        <!-- Price -->
        <div>
          <label class="block text-sm font-medium text-slate-700">
            Product Price
          </label>

          <input
            v-model.number="form.productPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 69999"
            class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p
            v-if="errors.productPrice"
            class="mt-1 text-xs text-red-600"
          >
            {{ errors.productPrice }}
          </p>
        </div>
      </div>

      <!-- Description -->
      <div class="mt-5">
        <label class="block text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          v-model="form.productDescription"
          rows="4"
          placeholder="Enter product description..."
          class="mt-2 w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <p
          v-if="errors.productDescription"
          class="mt-1 text-xs text-red-600"
        >
          {{ errors.productDescription }}
        </p>
      </div>
    </div>

    <!-- Inventory - Create only -->
    <div
      v-if="!isEditMode"
      class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h3 class="text-lg font-semibold text-slate-900">
        Inventory
      </h3>

      <div class="mt-6 grid gap-5 md:grid-cols-2">

        <!-- Total Quantity -->
        <div>
          <label class="block text-sm font-medium text-slate-700">
            Total Quantity
          </label>

          <input
            v-model.number="form.totalQuantity"
            type="number"
            min="0"
            placeholder="e.g. 100"
            class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p
            v-if="errors.totalQuantity"
            class="mt-1 text-xs text-red-600"
          >
            {{ errors.totalQuantity }}
          </p>
        </div>

        <!-- Available Quantity -->
        <div>
          <label class="block text-sm font-medium text-slate-700">
            Available Quantity
          </label>

          <input
            v-model.number="form.availableQuantity"
            type="number"
            min="0"
            placeholder="e.g. 100"
            class="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p
            v-if="errors.availableQuantity"
            class="mt-1 text-xs text-red-600"
          >
            {{ errors.availableQuantity }}
          </p>
        </div>
      </div>
    </div>

    <!-- Status -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-semibold text-slate-900">
            Product Status
          </h3>

          <p class="mt-1 text-sm text-slate-500">
            Control whether this product is available in the inventory.
          </p>
        </div>

        <label class="relative inline-flex cursor-pointer items-center">
          <input
            v-model="form.isActive"
            type="checkbox"
            class="peer sr-only"
          />

          <div
            class="relative h-6 w-11 rounded-full bg-slate-300 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-5"
          />
        </label>
      </div>

      <p class="mt-3 text-sm font-medium">
        <span
          :class="
            form.isActive
              ? 'text-emerald-600'
              : 'text-slate-500'
          "
        >
          {{ form.isActive ? 'Active' : 'Inactive' }}
        </span>
      </p>
    </div>

    <!-- Error -->
    <div
      v-if="submitError"
      class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {{ submitError }}
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3">
      <button
        type="button"
        class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        @click="$emit('cancel')"
      >
        Cancel
      </button>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span v-if="isSubmitting">
          {{ isEditMode ? 'Updating...' : 'Creating...' }}
        </span>

        <span v-else>
          {{ isEditMode ? 'Update Product' : 'Create Product' }}
        </span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import {
  createProduct,
  updateProducts,
} from '@/services/productService'

import type { Product } from '@/types/product'

const props = withDefaults(
  defineProps<{
    isEditMode?: boolean
    initialProduct?: Product | null
  }>(),
  {
    isEditMode: false,
    initialProduct: null,
  },
)

const emit = defineEmits<{
  cancel: []
  success: [product: Product]
}>()

const isSubmitting = ref(false)
const submitError = ref('')

const form = reactive({
  productCode: props.initialProduct?.productCode ?? '',
  productName: props.initialProduct?.productName ?? '',
  productDescription:
    props.initialProduct?.productDescription ?? '',
  categoryId: props.initialProduct?.categoryId ?? null,
  productPrice: props.initialProduct?.productPrice ?? null,
  totalQuantity: props.initialProduct?.totalQuantity ?? null,
  availableQuantity:
    props.initialProduct?.availableQuantity ?? null,
  isActive: props.initialProduct?.isActive ?? true,
})

const errors = reactive<Record<string, string>>({})

const validateForm = () => {
  Object.keys(errors).forEach((key) => {
    delete errors[key]
  })

  if (!form.productCode.trim()) {
    errors.productCode = 'Product code is required.'
  } else if (form.productCode.length > 50) {
    errors.productCode =
      'Product code must not exceed 50 characters.'
  }

  if (!form.productName.trim()) {
    errors.productName = 'Product name is required.'
  } else if (form.productName.length > 150) {
    errors.productName =
      'Product name must not exceed 150 characters.'
  }

  if (form.productDescription.length > 500) {
    errors.productDescription =
      'Product description must not exceed 500 characters.'
  }

  if (!form.categoryId || form.categoryId <= 0) {
    errors.categoryId = 'Category ID is required.'
  }

  if (
    form.productPrice === null ||
    form.productPrice <= 0
  ) {
    errors.productPrice =
      'Product price must be greater than 0.'
  }

  if (!props.isEditMode) {
    if (
      form.totalQuantity === null ||
      form.totalQuantity < 0
    ) {
      errors.totalQuantity =
        'Total quantity cannot be negative.'
    }

    if (
      form.availableQuantity === null ||
      form.availableQuantity < 0
    ) {
      errors.availableQuantity =
        'Available quantity cannot be negative.'
    }
  }

  return Object.keys(errors).length === 0
}

const handleSubmit = async () => {
  submitError.value = ''

  if (!validateForm()) {
    return
  }

  try {
    isSubmitting.value = true

    if (props.isEditMode) {
      const updatedProducts = await updateProducts([
        {
          productId: props.initialProduct!.productId,
          productCode: form.productCode.trim(),
          productName: form.productName.trim(),
          productDescription:
            form.productDescription.trim() || null,
          categoryId: form.categoryId!,
          productPrice: form.productPrice!,
          isActive: form.isActive,
        },
      ])

      const updatedProduct = updatedProducts[0]

      if (!updatedProduct) {
        throw new Error('Product update returned no product')
      }

      emit('success', updatedProduct)
      return
    }

    const product = await createProduct({
      productCode: form.productCode.trim(),
      productName: form.productName.trim(),
      productDescription:
        form.productDescription.trim() || null,
      categoryId: form.categoryId!,
      productPrice: form.productPrice!,
      totalQuantity: form.totalQuantity!,
      availableQuantity: form.availableQuantity!,
      isActive: form.isActive,
    })

    emit('success', product)
  } catch (error) {
    console.error(
      props.isEditMode
        ? 'Failed to update product:'
        : 'Failed to create product:',
      error,
    )

    submitError.value = props.isEditMode
      ? 'Unable to update product. Please check the details and try again.'
      : 'Unable to create product. Please check the details and try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>