const Layout = () => import("@/layout/index.vue");

export default {
  path: "/withdraw",
  name: "withdraw",
  component: Layout,
  redirect: "/withdraw",
  meta: {
    title: "提现",
    roles: ["all", "withdraw"],
    rank: 8
  },
  children: [
    {
      path: "/withdraw",
      name: "withdraw",
      component: () => import("@/views/withdraw/index.vue"),
      meta: {
        title: "提现",
        keepAlive: true
      }
    },
    {
      path: "/withdraw-detail",
      name: "withdraw-detail",
      component: () => import("@/views/withdraw/detail.vue"),
      meta: {
        title: "提现详情",
        showLink: false
      }
    },

    {
      path: "/withdrawAccount",
      name: "withdrawAccount",
      component: () => import("@/views/withdrawAccount/index.vue"),
      meta: {
        title: "提现账户"
      }
    }
  ]
} as RouteConfigsTable;
