<template>
  <section class="min-h-[calc(100vh-4rem)] bg-slate-50">

    <!-- Hero -->
    <div class="relative overflow-hidden border-b border-slate-200 bg-white">
      <div class="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">

        <div class="grid items-center gap-14 lg:grid-cols-2">

          <!-- Left Content -->
          <div>

            <h1
              class="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              Inventory management
              <span class="text-blue-600">
                built for modern businesses.
              </span>
            </h1>

            <p
              class="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
            >
              Manage products, monitor stock levels, process orders, and
              keep your business operations organized from one powerful
              platform.
            </p>

            <!-- CTA -->
            <div class="mt-8 flex flex-col gap-3 sm:flex-row">

              <RouterLink
                to="/inventory"
                class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
              >
                Go to Inventory

                <svg
                  class="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </RouterLink>

              <RouterLink
                to="/orders"
                class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
              >
                View Orders
              </RouterLink>

            </div>

            <!-- Trust indicators -->
            <div class="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs text-slate-500">
              <div class="flex items-center gap-2">
                <svg
                  class="h-4 w-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Centralized inventory
              </div>

              <div class="flex items-center gap-2">
                <svg
                  class="h-4 w-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Order tracking
              </div>

              <div class="flex items-center gap-2">
                <svg
                  class="h-4 w-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Real-time operations
              </div>
            </div>

          </div>

          <!-- Dashboard Preview -->
          <div class="relative">

            <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60">

              <!-- Fake dashboard header -->
              <div class="flex items-center justify-between border-b border-slate-100 pb-4">

                <div>
                  <p class="text-xs font-medium text-slate-400">
                    Overview
                  </p>

                  <p class="mt-1 text-lg font-bold text-slate-900">
                    Inventory Dashboard
                  </p>
                </div>

                <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <svg
                    class="h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3v18h18M7 16v-5m5 5V7m5 9v-8"
                    />
                  </svg>
                </div>

              </div>

              <!-- Stats -->
              <div class="mt-5 grid grid-cols-2 gap-3">

                <div class="rounded-xl bg-slate-50 p-4">
                  <p class="text-xs text-slate-500">
                    Total Products
                  </p>

                  <p class="mt-2 text-2xl font-bold text-slate-900">
                    1,248
                  </p>

                  <p class="mt-1 text-xs text-emerald-600">
                    +12.5%
                  </p>
                </div>

                <div class="rounded-xl bg-blue-50 p-4">
                  <p class="text-xs text-blue-600">
                    Available Stock
                  </p>

                  <p class="mt-2 text-2xl font-bold text-slate-900">
                    8,642
                  </p>

                  <p class="mt-1 text-xs text-blue-600">
                    Units available
                  </p>
                </div>

                <div class="rounded-xl bg-emerald-50 p-4">
                  <p class="text-xs text-emerald-600">
                    Active Products
                  </p>

                  <p class="mt-2 text-2xl font-bold text-slate-900">
                    1,176
                  </p>

                  <p class="mt-1 text-xs text-emerald-600">
                    94.2% active
                  </p>
                </div>

                <div class="rounded-xl bg-amber-50 p-4">
                  <p class="text-xs text-amber-600">
                    Low Stock
                  </p>

                  <p class="mt-2 text-2xl font-bold text-slate-900">
                    24
                  </p>

                  <p class="mt-1 text-xs text-amber-600">
                    Needs attention
                  </p>
                </div>

              </div>

              <!-- Stock chart -->
              <div class="mt-4 rounded-xl border border-slate-100 p-4">

                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs text-slate-500">
                      Stock availability
                    </p>

                    <p class="mt-1 text-sm font-semibold text-slate-900">
                      Healthy inventory
                    </p>
                  </div>

                  <span class="text-sm font-bold text-emerald-600">
                    86%
                  </span>
                </div>

                <div class="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    class="h-full w-[86%] rounded-full bg-linear-to-r from-emerald-500 to-emerald-400"
                  ></div>
                </div>

                <div class="mt-3 flex justify-between text-[11px] text-slate-400">
                  <span>Available</span>
                  <span>Inventory capacity</span>
                </div>

              </div>

            </div>

            <!-- Floating status -->
            <div
              class="absolute -bottom-5 -left-5 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:block"
            >
              <div class="flex items-center gap-3">

                <div class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
                  <span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                </div>

                <div>
                  <p class="text-xs font-semibold text-slate-900">
                    System operational
                  </p>

                  <p class="mt-0.5 text-[11px] text-slate-500">
                    All services running normally
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>

    <!-- Features -->
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">

      <div class="max-w-2xl">
        <p class="text-sm font-semibold text-blue-600">
          Everything you need
        </p>

        <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          One platform for your operations
        </h2>

        <p class="mt-3 text-sm leading-6 text-slate-500">
          Keep your products, inventory, and orders organized with a
          streamlined management experience.
        </p>
      </div>

      <div class="mt-8 grid gap-5 md:grid-cols-3">

        <!-- Inventory -->
        <div
          class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
        >
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <svg
              class="h-5 w-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M20 7l-8-4-8 4m16 0v10l-8 4-8-4V7m16 0l-8 4m-8-4l8 4m0 0v10"
              />
            </svg>
          </div>

          <h3 class="mt-5 text-lg font-semibold text-slate-900">
            Inventory Management
          </h3>

          <p class="mt-2 text-sm leading-6 text-slate-600">
            Manage products, categories, stock quantities, and inventory
            operations from a centralized workspace.
          </p>

          <RouterLink
            to="/inventory"
            class="mt-5 inline-flex items-center text-sm font-semibold text-blue-600 transition group-hover:text-blue-700"
          >
            Manage inventory

            <svg
              class="ml-1.5 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </RouterLink>
        </div>

        <!-- Orders -->
        <div
          class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
        >
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
            <svg
              class="h-5 w-5 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <h3 class="mt-5 text-lg font-semibold text-slate-900">
            Order Management
          </h3>

          <p class="mt-2 text-sm leading-6 text-slate-600">
            Create, process, track, and manage orders through a clear and
            reliable order workflow along with stock updation.
          </p>

          <RouterLink
            to="/orders"
            class="mt-5 inline-flex items-center text-sm font-semibold text-indigo-600 transition group-hover:text-indigo-700"
          >
            Manage orders

            <svg
              class="ml-1.5 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </RouterLink>
        </div>

        <!-- Operations -->
        <div
          class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
        >
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
            <svg
              class="h-5 w-5 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          <h3 class="mt-5 text-lg font-semibold text-slate-900">
            Real-Time Operations
          </h3>

          <p class="mt-2 text-sm leading-6 text-slate-600">
            Keep inventory and order operations synchronized across your
            existing microservice architecture.
          </p>

          <RouterLink
            to="/inventory"
            class="mt-5 inline-flex items-center text-sm font-semibold text-emerald-600 transition group-hover:text-emerald-700"
          >
            View operations

            <svg
              class="ml-1.5 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </RouterLink>
        </div>

      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="border-t border-slate-200 bg-white">
      <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div
          class="flex flex-col items-start justify-between gap-6 rounded-2xl bg-slate-900 px-6 py-8 sm:px-8 lg:flex-row lg:items-center"
        >
          <div>
            <h2 class="text-xl font-bold text-white sm:text-2xl">
              Ready to manage your inventory?
            </h2>

            <p class="mt-2 max-w-xl text-sm text-slate-400">
              Access your inventory and order management tools from your
              centralized workspace.
            </p>
          </div>

          <RouterLink
            to="/inventory"
            class="shrink-0 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Open Inventory
          </RouterLink>
        </div>

      </div>
    </div>

  </section>
</template>