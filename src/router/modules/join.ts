const Layout = () => import("@/layout/index.vue");

export default {
  path: "/join",
  name: "join",
  component: Layout,
  redirect: "/join",
  meta: {
    title: "入驻",
    roles: ["all", "platform-join"],
    rank: 6
  },
  children: [
    {
      path: "/join",
      name: "join",
      component: () => import("@/views/join/index.vue"),
      meta: {
        title: "入驻",
        keepAlive: true
      }
    },
    {
      path: "/join-detail",
      name: "join-detail",
      component: () => import("@/views/join/detail.vue"),
      meta: {
        title: "审核入驻",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
