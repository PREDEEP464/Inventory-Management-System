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
        Add Category
      </h2>

      <p class="mt-1 text-sm text-slate-500">
        Create a new product category.
      </p>
    </div>

    <!-- Form -->
    <div
      class="mx-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <form
        class="space-y-6"
        @submit.prevent="handleSubmit"
      >

        <!-- Category Name -->
        <div>
          <label
            for="categoryName"
            class="block text-sm font-medium text-slate-700"
          >
            Category Name
          </label>

          <input
            id="categoryName"
            v-model="form.categoryName"
            type="text"
            maxlength="100"
            placeholder="Enter category name"
            class="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <!-- Description -->
        <div>
          <label
            for="description"
            class="block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            maxlength="255"
            placeholder="Enter category description"
            class="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <!-- Error -->
        <div
          v-if="errorMessage"
          class="rounded-lg border border-red-200 bg-red-50 p-3"
        >
          <p class="text-sm font-medium text-red-700">
            {{ errorMessage }}
          </p>
        </div>

        <!-- Actions -->
        <div
          class="flex justify-end gap-3 border-t border-slate-100 pt-6"
        >
          <button
            type="button"
            class="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="goBack"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="isSaving"
            class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ isSaving ? 'Creating...' : 'Create Category' }}
          </button>
        </div>

      </form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

import {
  createCategory,
} from '@/services/categoryService'

const router = useRouter()

const form = reactive({
  categoryName: '',
  description: '',
})

const isSaving = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  errorMessage.value = ''

  const categoryName = form.categoryName.trim()

  if (!categoryName) {
    errorMessage.value = 'Category name is required.'
    return
  }

  try {
    isSaving.value = true

    await createCategory({
      categoryName,
      description: form.description.trim() || null,
    })

    router.push('/categories')
  } catch (error) {
    console.error('Failed to create category:', error)

    errorMessage.value =
      'Unable to create category. Please try again.'
  } finally {
    isSaving.value = false
  }
}

const goBack = () => {
  router.push('/categories')
}
</script>