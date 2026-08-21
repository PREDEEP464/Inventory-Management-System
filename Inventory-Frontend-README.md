# Inventory Management System - Frontend

A modern and responsive frontend for the Inventory Management System built using Vue 3, TypeScript, Tailwind CSS, and Vue Router.

The frontend communicates with the Inventory Service and Order Service backend APIs to provide product, category, inventory, stock, and order management functionality.

---

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Vue Router
- Axios
- Lucide Vue Next

---

## Project Structure

```text
src/
│
├── assets/
├── components/
├── config/
│   └── api.ts
├── layouts/
│   └── ...
├── router/
│   └── index.ts
├── services/
│   ├── productService.ts
│   ├── categoryService.ts
│   ├── stockService.ts
│   └── orderService.ts
├── types/
│   ├── product.ts
│   ├── category.ts
│   ├── stock.ts
│   └── order.ts
├── views/
│   ├── products/
│   │   ├── ProductsView.vue
│   │   ├── ProductDetailsView.vue
│   │   ├── ProductFormView.vue
│   │   └── ...
│   ├── categories/
│   │   ├── CategoriesView.vue
│   │   ├── CategoryFormView.vue
│   │   └── CategoryDetailsView.vue
│   ├── orders/
│   │   ├── OrdersView.vue
│   │   └── OrderDetailsView.vue
│   ├── stock/
│   │   └── StockManagementView.vue
│   └── ...
├── App.vue
└── main.ts
```

---

# Features

## Dashboard

Provides the main entry point for the Inventory Management System.

Route:

```text
/
```

## Product Management

The Products section provides product management functionality.

### Implemented Features

- View all products
- View individual product details
- Add new products
- Edit existing products
- Display product ID
- Display product code
- Display product name
- Display product description
- Display category
- Display product price
- Display total quantity
- Display available quantity
- Active / inactive product status
- Product search
- Category-based product filtering
- Category dropdown
- Product details navigation
- Product edit navigation

### Product Routes

```text
/products
/products/create
/products/:productId
/products/edit/:productId
```

---

## Category Management

Categories are used to organize products.

### Implemented Features

- View all categories
- Display category ID
- Display category name
- Display category description
- Add category
- Edit category
- View products belonging to a category
- Category selection from product forms
- Category dropdown in product management

### Category Routes

```text
/categories
/categories/create
/categories/:categoryId
/categories/edit/:categoryId
```

---

## Order Management

The Orders section communicates with the Order Service.

### Implemented Features

- View all orders
- Display customer name
- Display order ID
- Display order status
- Display total amount
- Display ordered products
- View order details
- Display product ID
- Display product name
- Display quantity
- Display product price

### Order Routes

```text
/orders
/orders/:orderId
```

---

## Stock Management

The Stock Management section is used to manage product inventory.

### Implemented Features

- View products and their stock information
- Display total quantity
- Display available quantity
- Restock products
- Enter restock quantity
- Update stock through the Inventory Service

The frontend sends stock updates to:

```text
PATCH /api/products/re-stock
```

Request body:

```json
[
  {
    "productId": 1,
    "quantity": 10
  }
]
```

---

# Navigation

The application contains a collapsible sidebar with navigation for:

- Dashboard
- Inventory
- Products
- Categories
- Stock Management
- Orders

The sidebar provides active-route highlighting.

Nested routes remain associated with their parent section.

For example:

```text
/products
/products/1
/products/edit/1
```

will keep **Products** highlighted in the sidebar.

---

# API Communication

Axios is used for communication with the backend services.

The Axios configuration is maintained in:

```text
src/config/api.ts
```

Service-specific API calls are separated into individual service files.

### Product Service

```text
src/services/productService.ts
```

Handles:

- Get products
- Get product by ID
- Create product
- Update products
- Get products by category
- Get inventory statistics
- Get low-stock products

### Category Service

```text
src/services/categoryService.ts
```

Handles:

- Get all categories
- Get category by ID
- Create category
- Update category

### Stock Service

```text
src/services/stockService.ts
```

Handles:

- Restocking products

### Order Service

```text
src/services/orderService.ts
```

Handles:

- Get all orders
- Get order details

---

# Backend Integration

The frontend communicates with the backend microservices.

```text
                    Vue Frontend
                         |
             -------------------------
             |                       |
             ▼                       ▼
      Inventory Service         Order Service
          :8081                    :8082
             |                       |
             ▼                       ▼
        PostgreSQL                MongoDB
```

### Inventory Service

Responsible for:

- Products
- Categories
- Inventory
- Stock management

### Order Service

Responsible for:

- Orders
- Order items
- Customer information
- Order status

---

# Product Categories

Categories are integrated throughout the product workflow.

The category dropdown is available when:

- Creating a product
- Editing a product
- Filtering products

Categories are fetched from the Category API and displayed dynamically.

---

# Styling

The application uses Tailwind CSS for styling.

The UI follows a clean dashboard-style design using:

- Cards
- Tables
- Buttons
- Forms
- Badges
- Responsive layouts
- Sidebar navigation
- Loading states
- Error states

Lucide Vue Next is used for interface icons.

---

# Error Handling

API operations provide loading and error states.

Example:

```text
Loading products...
```

or:

```text
Unable to load product details. Please try again.
```

Users can retry failed operations where applicable.

---

# Running the Project

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

# Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

# Environment Configuration

Backend API configuration is maintained through the frontend Axios configuration.

Make sure the Inventory Service and Order Service are running before using the corresponding frontend features.

---

# Current Modules

| Module | Status |
|---|---|
| Dashboard
| Products
| Product Details
| Add Product
| Edit Product
| Product Search
| Category Filtering
| Category Management
| Add Category
| Edit Category
| Category Product View
| Orders
| Order Details
| Stock Management
| Product Restocking
| Sidebar Navigation
| Active Navigation Tabs

---

# Future Improvements

Possible future enhancements include:

- Product deletion / activation management
- Improved pagination
- Advanced product filtering
- Order creation from frontend
- Order status management
- Stock transaction history
- Authentication and authorization
- Role-based access control
- Dashboard analytics
- Improved notifications
- Form validation improvements
- Responsive UI improvements

---

# Author

**Predeepkumar**

Inventory Management System - Frontend
