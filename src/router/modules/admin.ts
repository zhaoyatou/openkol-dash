const Layout = () => import("@/layout/index.vue");

export default {
  path: "/admin",
  name: "admin",
  component: Layout,
  redirect: "/admin",
  meta: {
    title: "管理员",
    roles: ["all", "admin"],
    rank: 1
  },
  children: [
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/admin/index.vue"),
      meta: {
        title: "管理员"
      }
    },
    {
      path: "/admin-detail",
      name: "admin-detail",
      component: () => import("@/views/admin/detail.vue"),
      meta: {
        title: "管理员详情",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
