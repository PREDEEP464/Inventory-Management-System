<template>
  <aside
    :class="[
      'flex min-h-screen flex-col border-r border-slate-200 bg-slate-900 text-white transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-64',
    ]"
  >
    <!-- Sidebar Header -->
    <div
      class="flex h-16 items-center border-b border-slate-700"
      :class="isCollapsed ? 'justify-center px-2' : 'justify-between px-4'"
    >
      <span
        v-if="!isCollapsed"
        class="text-lg font-bold tracking-wide"
      >
        IMS
      </span>

      <button
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800 hover:text-white"
        :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="toggleSidebar"
      >
        <ChevronRight
          v-if="isCollapsed"
          :size="20"
        />

        <ChevronLeft
          v-else
          :size="20"
        />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-2 p-3">

      <!-- Dashboard -->
      <RouterLink
        to="/"
        class="flex items-center rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        :class="isCollapsed ? 'justify-center' : 'gap-3'"
      >
        <LayoutDashboard :size="20" />

        <span v-if="!isCollapsed">
          Dashboard
        </span>
      </RouterLink>

      <!-- Inventory -->
      <RouterLink
        to="/inventory"
        class="flex items-center rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        :class="isCollapsed ? 'justify-center' : 'gap-3'"
      >
        <Package :size="20" />

        <span v-if="!isCollapsed">
          Inventory
        </span>
      </RouterLink>

            <!-- Products -->
      <RouterLink
        to="/products"
        class="flex items-center rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        :class="isCollapsed ? 'justify-center' : 'gap-3'"
      >
        <Package :size="20" />

        <span v-if="!isCollapsed">
          Products
        </span>
      </RouterLink>

      <!-- Categories -->
      <RouterLink
        to="/categories"
        class="flex items-center rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        :class="isCollapsed ? 'justify-center' : 'gap-3'"
      >
        <Tags :size="20" />

        <span v-if="!isCollapsed">
          Categories
        </span>
      </RouterLink>

      <!-- Stock -->
      <RouterLink
        to="/stock"
        class="flex items-center rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        :class="isCollapsed ? 'justify-center' : 'gap-3'"
      >
        <Warehouse :size="20" />

        <span v-if="!isCollapsed">
          Stock Management
        </span>
      </RouterLink>

      <!-- Orders -->
      <RouterLink
        to="/orders"
        class="flex items-center rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        :class="isCollapsed ? 'justify-center' : 'gap-3'"
      >
        <ShoppingCart :size="20" />

        <span v-if="!isCollapsed">
          Orders
        </span>
      </RouterLink>

    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  Warehouse,
} from 'lucide-vue-next'

const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>