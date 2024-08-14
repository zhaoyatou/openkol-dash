const Layout = () => import("@/layout/index.vue");

export default {
  path: "/income",
  name: "income",
  component: Layout,
  redirect: "/income",
  meta: {
    title: "收入",
    roles: ["all", "income"],
    rank: 4
  },
  children: [
    {
      path: "/income",
      name: "income",
      component: () => import("@/views/income/index.vue"),
      meta: {
        title: "收入",
        keepAlive: true
      }
    },
    {
      path: "/income-detail",
      name: "income-detail",
      component: () => import("@/views/income/detail.vue"),
      meta: {
        title: "创建收入",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
