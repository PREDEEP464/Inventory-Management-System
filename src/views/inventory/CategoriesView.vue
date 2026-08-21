<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">
          Categories
        </h2>

        <p class="mt-1 text-sm text-slate-500">
          Manage product categories.
        </p>
      </div>

      <button
        type="button"
        class="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        <Plus :size="17" />
        Add Category
      </button>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm"
    >
      <p class="text-sm text-slate-500">
        Loading categories...
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
        @click="loadCategories"
      >
        Try Again
      </button>
    </div>

    <!-- Categories -->
    <div
      v-else
      class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      <div
        v-if="categories.length === 0"
        class="p-12 text-center"
      >
        <p class="text-sm text-slate-500">
          No categories found.
        </p>
      </div>

      <table
        v-else
        class="min-w-full divide-y divide-slate-200"
      >
        <thead class="bg-slate-50">
          <tr>
            <th
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              ID
            </th>

            <th
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Category Name
            </th>

            <th
              class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Description
            </th>

            <th
              class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">
          <tr
            v-for="category in categories"
            :key="category.categoryId"
            class="transition hover:bg-slate-50"
          >
            <td class="px-6 py-4 text-sm font-medium text-slate-700">
              #{{ category.categoryId }}
            </td>

            <td class="px-6 py-4 text-sm font-semibold text-slate-900">
              {{ category.categoryName }}
            </td>

            <td class="px-6 py-4 text-sm text-slate-500">
              {{ category.description || 'No description' }}
            </td>

            <td class="px-6 py-4 text-right">
              <div class="flex justify-end gap-2">

                <!-- View Products -->
                <button
                  type="button"
                  class="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
                  title="View products"
                  @click="viewProducts(category.categoryId)"
                >
                  <Eye :size="17" />
                </button>

                <!-- Edit Category -->
                <button
                  type="button"
                  class="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
                  title="Edit category"
                  @click="editCategory(category.categoryId)"
                >
                  <Pencil :size="17" />
                </button>

              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import {
  Eye,
  Pencil,
  Plus,
} from 'lucide-vue-next'

import {
  getAllCategories,
} from '@/services/categoryService'

import type { Category } from '@/types/category'

const router = useRouter()

const categories = ref<Category[]>([])

const isLoading = ref(false)
const errorMessage = ref('')

const loadCategories = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    categories.value = await getAllCategories()
  } catch (error) {
    console.error('Failed to load categories:', error)

    errorMessage.value =
      'Unable to load categories. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const viewProducts = (categoryId: number) => {
  router.push(`/categories/${categoryId}/products`)
}

const editCategory = (categoryId: number) => {
  router.push(`/categories/${categoryId}/edit`)
}

onMounted(() => {
  loadCategories()
})
</script>