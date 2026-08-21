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
        Edit Category
      </h2>

      <p class="mt-1 text-sm text-slate-500">
        Update category information.
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm"
    >
      <p class="text-sm text-slate-500">
        Loading category...
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
        @click="loadCategory"
      >
        Try Again
      </button>
    </div>

    <!-- Form -->
    <div
    v-else
    class="mx-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <form
        class="space-y-6"
        @submit.prevent="handleSubmit"
      >

        <!-- Category ID -->
        <div>
          <label
            class="block text-sm font-medium text-slate-700"
          >
            Category ID
          </label>

          <input
            :value="categoryId"
            type="text"
            disabled
            class="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500"
          />
        </div>

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

          <p
            v-if="validationError"
            class="mt-1 text-sm text-red-600"
          >
            {{ validationError }}
          </p>
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

        <!-- Actions -->
        <div class="flex justify-end gap-3 border-t border-slate-100 pt-6">

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
            class="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ isSaving ? 'Saving...' : 'Save Changes' }}
          </button>

        </div>

      </form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

import {
  getCategoryById,
  updateCategory,
} from '@/services/categoryService'

const route = useRoute()
const router = useRouter()

const categoryId = Number(route.params.categoryId)

const form = reactive({
  categoryName: '',
  description: '',
})

const isLoading = ref(false)
const isSaving = ref(false)

const errorMessage = ref('')
const validationError = ref('')

const loadCategory = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      throw new Error('Invalid category ID')
    }

    const category = await getCategoryById(categoryId)

    form.categoryName = category.categoryName
    form.description = category.description ?? ''
  } catch (error) {
    console.error('Failed to load category:', error)

    errorMessage.value =
      'Unable to load category. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  validationError.value = ''

  const categoryName = form.categoryName.trim()

  if (!categoryName) {
    validationError.value = 'Category name is required.'
    return
  }

  try {
    isSaving.value = true

    await updateCategory(categoryId, {
      categoryName,
      description: form.description.trim() || null,
    })

    router.push('/categories')
  } catch (error) {
    console.error('Failed to update category:', error)

    errorMessage.value =
      'Unable to update category. Please try again.'
  } finally {
    isSaving.value = false
  }
}

const goBack = () => {
  router.push('/categories')
}

onMounted(() => {
  loadCategory()
})
</script>