const Layout = () => import("@/layout/index.vue");

export default {
  path: "/staff",
  name: "staff",
  component: Layout,
  redirect: "/staff",
  meta: {
    title: "运营团队",
    roles: ["all", "staff"],
    rank: 5
  },
  children: [
    {
      path: "/staff",
      name: "staff",
      component: () => import("@/views/staff/index.vue"),
      meta: {
        title: "运营团队"
      }
    },
    {
      path: "/staff-detail",
      name: "staff-detail",
      component: () => import("@/views/staff/detail.vue"),
      meta: {
        title: "staff-detail",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
