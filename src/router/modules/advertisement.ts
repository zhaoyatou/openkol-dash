const Layout = () => import("@/layout/index.vue");

export default {
  path: "/advertisement",
  name: "advertisement",
  component: Layout,
  redirect: "/advertisement",
  meta: {
    roles: ["all", "advertisement"],
    rank: 2,
    title: "广告"
  },
  children: [
    {
      path: "/advertisement",
      name: "advertisement",
      component: () => import("@/views/advertisement/index.vue"),
      meta: {
        title: "横幅广告",
        keepAlive: true
      }
    },
    {
      path: "/advertisement-detail",
      name: "advertisement-detail",
      component: () => import("@/views/advertisement/detail.vue"),
      meta: {
        title: "编辑广告",
        showLink: false
      }
    },
    {
      path: "/recommend",
      name: "recommend",
      component: () => import("@/views/recommend/index.vue"),
      meta: {
        title: "热门推荐",
        keepAlive: true
      }
    },
    {
      path: "/recommend-detail",
      name: "recommend-detail",
      component: () => import("@/views/recommend/detail.vue"),
      meta: {
        title: "编辑热门",
        showLink: false
      }
    },
    {
      path: "/home-article",
      name: "home-article",
      component: () => import("@/views/recommend/homeArticle.vue"),
      meta: {
        title: "首页公告"
      }
    }
  ]
} as RouteConfigsTable;
