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
      path: '/products/create',
      name: 'create-product',
      component: () =>
        import('@/views/inventory/CreateProductView.vue'),
    },
    {
      path: '/products/:productId/edit',
      name: 'edit-product',
      component: () =>
        import('@/views/inventory/EditProductView.vue'),
    },
    {
      path: '/categories/:categoryId/products',
      name: 'category-products',
      component: () =>
        import('@/views/inventory/CategoryProductsView.vue'),
    },
    {
      path: '/categories/:categoryId/edit',
      name: 'edit-category',
      component: () =>
        import('@/views/inventory/EditCategoryView.vue'),
    },
    {
      path: '/products/:productId',
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