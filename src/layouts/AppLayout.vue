<template>
  <div class="flex min-h-screen bg-slate-50">
    <AppSidebar />

    <div class="flex min-w-0 flex-1 flex-col">
      <AppHeader />

      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
</script>