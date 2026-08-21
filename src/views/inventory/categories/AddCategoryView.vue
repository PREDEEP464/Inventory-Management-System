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
        Back to Categories
      </button>

      <p class="text-sm font-semibold text-blue-600">
        Product Management
      </p>

      <h2 class="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        Add Category
      </h2>

      <p class="mt-2 text-sm text-slate-500">
        Create a new category to organize your products.
      </p>
    </div>

    <!-- Form -->
    <div class="mx-auto w-full max-w-2xl">

      <div
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >

        <!-- Form Header -->
        <div
          class="border-b border-slate-100 bg-slate-50/50 px-6 py-5 sm:px-8"
        >
          <div class="flex items-center gap-4">

            <div>
              <h3 class="text-base font-semibold text-slate-900">
                Category Details
              </h3>

              <p class="mt-1 text-sm text-slate-500">
                Enter the information for your new category.
              </p>
            </div>

          </div>
        </div>

        <!-- Form Body -->
        <form
          class="space-y-6 p-6 sm:p-8"
          @submit.prevent="handleSubmit"
        >

          <!-- Category Name -->
          <div>
            <label
              for="categoryName"
              class="block text-sm font-semibold text-slate-700"
            >
              Category Name
              <span class="text-red-500">*</span>
            </label>

            <input
              id="categoryName"
              v-model="form.categoryName"
              type="text"
              maxlength="100"
              placeholder="e.g. Laptops"
              class="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />

            <p class="mt-1.5 text-xs text-slate-400">
              Maximum 100 characters
            </p>
          </div>

          <!-- Description -->
          <div>
            <div class="flex items-center justify-between">

              <label
                for="description"
                class="block text-sm font-semibold text-slate-700"
              >
                Description
              </label>

              <span class="text-xs text-slate-400">
                Optional
              </span>

            </div>

            <textarea
              id="description"
              v-model="form.description"
              rows="5"
              maxlength="255"
              placeholder="Describe what products belong to this category..."
              class="mt-2 w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />

            <p class="mt-1.5 text-xs text-slate-400">
              Maximum 255 characters
            </p>
          </div>

          <!-- Error -->
          <div
            v-if="errorMessage"
            class="rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <div class="flex items-start gap-3">

              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100"
              >
                <TriangleAlert
                  :size="17"
                  class="text-red-600"
                />
              </div>

              <div>
                <p class="text-sm font-semibold text-red-800">
                  Unable to create category
                </p>

                <p class="mt-1 text-sm text-red-700">
                  {{ errorMessage }}
                </p>
              </div>

            </div>
          </div>

          <!-- Actions -->
          <div
            class="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end"
          >

            <button
              type="button"
              class="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              @click="goBack"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="isSaving"
              class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >

              <svg
                v-if="isSaving"
                class="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />

                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>

              {{ isSaving ? 'Creating Category...' : 'Create Category' }}

            </button>

          </div>

        </form>

      </div>

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