import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../views/Layout/Layout.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      title:'登录'
    }
  },
  {
    path:"/",
    component:Layout,
    children:[
      {
        path: "/child",
        name: "child",
        component: ()=>import("../views/child/child.vue"),
        meta:{
          title:'首页'
        }
      },
      {
        path: "/carousel",
        name: "carousel",
        component: ()=> import('../views/carousel/carousel.vue'),
        meta:{
          title:'轮播图管理'
        }
      },
      {
        path: "/navs",
        name: "navs",
        component: ()=>import('../views/navs/navs.vue'),
        meta:{
          title:'导航管理'
        }
      },
      {
        path: "/recom",
        name: "recom",
        component: ()=>import( "../views/recom/recom.vue"),
        meta:{
          title:'推荐导航'
        }
      },
      {
        path: "/user",
        name: "user",
        component: ()=>import("../views/user/user.vue"),
        meta:{
          title:'用户管理'
        }
      },
      {
        path: "/goods",
        name: "goods",
        component: ()=>import( "../views/goods/goods.vue"),
        meta:{
          title:'商品管理'
        }
      },
      {
        path: "/addgoods",
        name: "addgoods",
        component: ()=>import("../views/addgoods/addgoods.vue"),
        meta:{
          title:'添加商品'
        }
      },
      {
        path: "/categ",
        name: "categ",
        component: ()=>import("../views/categ/categ.vue"),
        meta:{
          title:'商品分类'
        }
      },
      {
        path: "/goodsModel",
        name: "goodsModel",
        component: ()=>import("../views/goodsModel/goodsModel.vue"),
        meta:{
          title:'商品模型'
        }
      },
      {
        path: "/goodsSpec",
        name: "goodsSpec",
        component: ()=>import("../views/goodsSpec/goodsSpec.vue"),
        meta:{
          title:'商品规格'
        }
      },
      {
        path: "/goodsParms",
        name: "goodsParms",
        component: ()=>import("../views/goodsParms/goodsParms.vue"),
        meta:{
          title:'商品参数'
        }
      },
      {
        path: "/spec",
        name: "spec",
        component: ()=>import("../views/spec/spec.vue"),
        meta:{
          title:'规格参数'
        }
      },
      {
        path: "/splike",
        name: "splike",
        component: ()=>import("../views/splike/splike.vue"),
        meta:{
          title:'秒杀管理'
        }
      },
      {
        path: "/coupon",
        name: "coupon",
        component: ()=>import("../views/coupon/coupon.vue"),
        meta:{
          title:'优惠券管理'
        }
      },
      {
        path: "/order",
        name: "order",
        component: ()=>import("../views/order/order.vue"),
        meta:{
          title:'订单管理'
        }
      },
      {
        path: "/notice",
        name: "notice",
        component: ()=>import("../views/notice/notice.vue"),
        meta:{
          title:'通知管理'
        }
      },
      {
        path: "/chat",
        name: "chat",
        component: ()=>import("../views/chat/chat.vue"),
        meta:{
          title:'客服消息'
        }
      },
    ]

  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  next()
})

export default router;