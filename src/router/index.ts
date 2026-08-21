import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import InventoryDashboardView from '@/views/inventory/InventoryDashboardView.vue'
import ProductsView from '@/views/inventory/ProductsView.vue'
import ProductDetailsView from '@/views/inventory/ProductDetailsView.vue'
import CategoriesView from '@/views/inventory/CategoriesView.vue'
import StockManagementView from '@/views/inventory/StockManagementView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryDashboardView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/products/:id',
      name: 'product-details',
      component: ProductDetailsView,
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
    },
    {
      path: '/stock',
      name: 'stock',
      component: StockManagementView,
    },
  ],
})

export default router