const Layout = () => import("@/layout/index.vue");

export default {
  path: "/system",
  name: "system",
  component: Layout,
  redirect: "/system/router",
  meta: {
    title: "系统",
    rank: 11
  },
  children: [
    {
      path: "/system",
      name: "system",
      component: () => import("@/views/system/index.vue"),
      meta: {
        title: "系统"
      }
    }
  ]
} as RouteConfigsTable;
