const Layout = () => import("@/layout/index.vue");

export default {
  path: "/platform",
  name: "platform",
  component: Layout,
  redirect: "/platform",
  meta: {
    title: "平台",
    roles: ["all", "platform"],
    rank: 7
  },
  children: [
    {
      path: "/platform",
      name: "platform",
      component: () => import("@/views/platform/index.vue"),
      meta: {
        title: "平台",
        keepAlive: true
      }
    },
    {
      path: "/platform-detail",
      name: "platform-detail",
      component: () => import("@/views/platform/detail.vue"),
      meta: {
        title: "创建平台",
        showLink: false
      }
    },
    {
      path: "/platform-update",
      name: "platform-update",
      component: () => import("@/views/platform/update.vue"),
      meta: {
        title: "编辑平台",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
