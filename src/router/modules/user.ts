const Layout = () => import("@/layout/index.vue");

export default {
  path: "/user",
  name: "user",
  component: Layout,
  redirect: "/user",
  meta: {
    title: "用户",
    roles: ["all", "user"],
    rank: 1
  },
  children: [
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/user/index.vue"),
      meta: {
        title: "用户",
        keepAlive: true
      }
    },
    {
      path: "/user-detail",
      name: "user-detail",
      component: () => import("@/views/user/detail.vue"),
      meta: {
        title: "用户详情",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
