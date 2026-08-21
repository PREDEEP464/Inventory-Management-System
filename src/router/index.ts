import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import InventoryDashboardView from '@/views/inventory/InventoryDashboardView.vue'
import ProductsView from '@/views/inventory/products/ProductsView.vue'
import ProductDetailsView from '@/views/inventory/products/ProductDetailsView.vue'
import CategoriesView from '@/views/inventory/categories/CategoriesView.vue'
import StockManagementView from '@/views/inventory/StockManagementView.vue'
import OrdersView from '@/views/inventory/orders/OrdersView.vue'
import OrderDetailsView from '@/views/inventory/orders/OrderDetailsView.vue'

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
        import('@/views/inventory/products/CreateProductView.vue'),
    },
    {
      path: '/products/:productId/edit',
      name: 'edit-product',
      component: () =>
        import('@/views/inventory/products/EditProductView.vue'),
    },
    {
      path: '/categories/:categoryId/products',
      name: 'category-products',
      component: () =>
        import('@/views/inventory/products/CategoryProductsView.vue'),
    },
    {
      path: '/categories/:categoryId/edit',
      name: 'edit-category',
      component: () =>
        import('@/views/inventory/categories/EditCategoryView.vue'),
    },
    {
      path: '/categories/add',
      name: 'add-category',
      component: () =>
        import('@/views/inventory/categories/AddCategoryView.vue'),
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
    {
      path: '/orders',
      component: OrdersView,
    },
    {
      path: '/orders/:orderId',
      component: OrderDetailsView,
    }
  ],
})

export default router