const Layout = () => import("@/layout/index.vue");

export default {
  path: "/invite",
  name: "invite",
  component: Layout,
  redirect: "/invite",
  meta: {
    title: "邀请",
    roles: ["all", "invite"],
    rank: 5
  },
  children: [
    {
      path: "/invite",
      name: "invite",
      component: () => import("@/views/invite/index.vue"),
      meta: {
        title: "邀请",
        keepAlive: true
      }
    },
    {
      path: "/invite-detail",
      name: "invite-detail",
      component: () => import("@/views/invite/detail.vue"),
      meta: {
        title: "邀请详情",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
