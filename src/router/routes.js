const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "/", redirect: "/login" },
      { path: "login", component: () => import("src/pages/LoginPage.vue") },
      {
        path: "register",
        component: () => import("src/pages/RegisterPage.vue"),
      },
    ],
    meta: { auth: false },
  },
  {
    path: "/pyforecast",
    name: "pyforecast",
    redirect: { name: "dashboard" },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("pages/Dashboard.vue"),
      },
      {
        path: "/accounts-mgmt",
        name: "accounts-mgmt",
        component: () => import("src/pages/AccountsMgmt/AccountsMgmt.vue"),
      },
      {
        path: "/books-inventory-mgmt",
        name: "books-inventory-mgmt",
        component: () =>
          import("src/pages/InventoryMgmt/BooksInventoryMgmt.vue"),
      },
      {
        path: "/sales-mgmt",
        name: "sales-mgmt",
        component: () => import("src/pages/SalesMgmt/SalesMgmt.vue"),
      },
    ],
    meta: { auth: true },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
