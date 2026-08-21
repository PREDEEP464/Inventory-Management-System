<template>
  <section class="min-h-[calc(100vh-4rem)]">
    <!-- Hero -->
    <div class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div class="max-w-3xl">
        <p class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Enterprise Inventory Platform
        </p>

        <h2 class="text-5xl font-bold tracking-tight text-slate-900">
          Inventory and Order Management
          <span class="text-blue-600">made simple.</span>
        </h2>

        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Manage products, monitor inventory, process orders, and keep your
          business operations organized through a single platform.
        </p>

        <div class="mt-8 flex gap-4">
          <RouterLink
            to="/inventory"
            class="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Go to Inventory
          </RouterLink>

          <RouterLink
            to="/orders"
            class="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            View Orders
          </RouterLink>
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="mt-20 grid gap-6 md:grid-cols-3">
        <div
          class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 class="text-lg font-semibold text-slate-900">
            Inventory Management
          </h3>

          <p class="mt-2 text-sm leading-6 text-slate-600">
            Manage products, categories, stock levels, and inventory
            operations.
          </p>
        </div>

        <div
          class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 class="text-lg font-semibold text-slate-900">
            Order Management
          </h3>

          <p class="mt-2 text-sm leading-6 text-slate-600">
            Create, pay, track, and cancel orders through the order workflow.
          </p>
        </div>

        <div
          class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 class="text-lg font-semibold text-slate-900">
            Real-Time Operations
          </h3>

          <p class="mt-2 text-sm leading-6 text-slate-600">
            Keep inventory and order operations synchronized through the
            existing microservice architecture.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>