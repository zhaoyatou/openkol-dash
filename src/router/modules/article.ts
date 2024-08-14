const Layout = () => import("@/layout/index.vue");

export default {
  path: "/article",
  name: "article",
  component: Layout,
  redirect: "/article",
  meta: {
    title: "文章",
    roles: ["all", "article"],
    rank: 3
  },
  children: [
    {
      path: "/article",
      name: "article",
      component: () => import("@/views/article/index.vue"),
      meta: {
        title: "文章",
        keepAlive: true
      }
    },
    {
      path: "/article-detail",
      name: "article-detail",
      component: () => import("@/views/article/detail.vue"),
      meta: {
        title: "编辑文章",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
