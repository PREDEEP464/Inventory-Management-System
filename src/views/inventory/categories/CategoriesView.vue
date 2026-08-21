<template>
  <div class="space-y-8">

    <!-- Header -->
    <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

      <div>
        <p class="text-sm font-semibold text-blue-600">
          Product Management
        </p>

        <h2 class="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Categories
        </h2>

        <p class="mt-2 text-sm text-slate-500">
          Organize your products into manageable categories.
        </p>
      </div>

      <button
        type="button"
        @click="goToAddCategory"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
      >
        <Plus :size="17" />
        Add Category
      </button>

    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
    >
      <div
        class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
      ></div>

      <p class="text-sm font-medium text-slate-700">
        Loading categories...
      </p>

      <p class="mt-1 text-xs text-slate-400">
        Please wait while we fetch your categories.
      </p>
    </div>

    <!-- Error -->
    <div
      v-else-if="errorMessage"
      class="rounded-2xl border border-red-200 bg-red-50 p-5"
    >
      <div class="flex items-start justify-between gap-4">

        <div>
          <p class="font-semibold text-red-800">
            Unable to load categories
          </p>

          <p class="mt-1 text-sm text-red-700">
            {{ errorMessage }}
          </p>
        </div>

        <button
          type="button"
          class="shrink-0 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50"
          @click="loadCategories"
        >
          Try Again
        </button>

      </div>
    </div>

    <!-- Categories -->
    <div
      v-else
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >

      <!-- Table Header -->
      <div
        class="flex flex-col gap-3 border-b border-slate-100 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
      >

        <div>
          <h3 class="text-base font-semibold text-slate-900">
            Product Categories
          </h3>

          <p class="mt-1 text-sm text-slate-500">
            View and manage all product categories.
          </p>
        </div>

        <div
          class="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600"
        >
          {{ categories.length }}
          {{ categories.length === 1 ? 'Category' : 'Categories' }}
        </div>

      </div>

      <!-- Empty State -->
      <div
        v-if="categories.length === 0"
        class="px-6 py-16 text-center"
      >

        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50"
        >
          <Plus
            :size="24"
            class="text-blue-600"
          />
        </div>

        <h3 class="mt-5 text-sm font-semibold text-slate-900">
          No categories yet
        </h3>

        <p class="mx-auto mt-1 max-w-sm text-sm text-slate-500">
          Create your first product category to start organizing your
          inventory.
        </p>

        <button
          type="button"
          @click="goToAddCategory"
          class="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus :size="16" />
          Add Category
        </button>

      </div>

      <!-- Table -->
      <div
        v-else
        class="overflow-x-auto"
      >
        <table class="min-w-full">

          <!-- Table Head -->
          <thead class="border-b border-slate-100 bg-slate-50/80">
            <tr>

              <th
                class="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                ID
              </th>

              <th
                class="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Category
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Description
              </th>

              <th
                class="whitespace-nowrap px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Actions
              </th>

            </tr>
          </thead>

          <!-- Table Body -->
          <tbody class="divide-y divide-slate-100">

            <tr
              v-for="category in categories"
              :key="category.categoryId"
              class="group transition hover:bg-slate-50/80"
            >

              <!-- ID -->
              <td class="whitespace-nowrap px-6 py-5">
                <span
                  class="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
                >
                  #{{ category.categoryId }}
                </span>
              </td>

              <!-- Category -->
              <td class="px-6 py-5">

                <div class="flex items-center gap-3">

                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600"
                  >
                    {{ category.categoryName.charAt(0).toUpperCase() }}
                  </div>

                  <div>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ category.categoryName }}
                    </p>

                    <p class="mt-0.5 text-xs text-slate-400">
                      Category #{{ category.categoryId }}
                    </p>
                  </div>

                </div>

              </td>

              <!-- Description -->
              <td class="max-w-md px-6 py-5">

                <p
                  class="truncate text-sm text-slate-500"
                  :title="category.description || 'No description'"
                >
                  {{ category.description || 'No description' }}
                </p>

              </td>

              <!-- Actions -->
              <td class="px-6 py-5">

                <div class="flex items-center justify-end gap-1">

                  <!-- View Products -->
                  <button
                    type="button"
                    class="group/action inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    title="View products"
                    @click="viewProducts(category.categoryId)"
                  >
                    <Eye
                      :size="16"
                      class="transition"
                    />

                    <span class="hidden lg:inline">
                      View
                    </span>
                  </button>

                  <!-- Edit Category -->
                  <button
                    type="button"
                    class="group/action inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    title="Edit category"
                    @click="editCategory(category.categoryId)"
                  >
                    <Pencil
                      :size="16"
                      class="transition"
                    />

                    <span class="hidden lg:inline">
                      Edit
                    </span>
                  </button>

                </div>

              </td>

            </tr>

          </tbody>
        </table>
      </div>

      <!-- Table Footer -->
      <div
        v-if="categories.length > 0"
        class="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-3"
      >
        <p class="text-xs text-slate-500">
          Showing
          <span class="font-semibold text-slate-700">
            {{ categories.length }}
          </span>
          {{ categories.length === 1 ? 'category' : 'categories' }}
        </p>

        <p class="text-xs text-slate-400">
          Product Management
        </p>
      </div>

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

const goToAddCategory = () => {
  router.push('/categories/add')
}

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