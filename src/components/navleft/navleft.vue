<template>
  <el-menu
    :uniqueOpened="true"
    default-active="0"
    class="el-menu"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    :router="true"
  >
    <template v-for="(item, index) in list" :key="index" >
      <el-menu-item v-if="item.name != '商品管理'" :index="index + item.url">
        <i :class="item.icon"></i>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
      <el-sub-menu v-else index="index">
        <template #title>
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item :index="d + i.url" v-for="(i,d) in item.list1" :key="d">
         <i :class="i.icon"></i>
        {{ i.name }}</el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
let list = [
  {
    name: "首页",
    url: "/child",
    icon:'el-icon-house'
  },
  {
    name: "轮播图管理",
    url: "/carousel",
    icon:"el-icon-picture-outline"
  },
  {
    name: "导航管理",
    url: "/navs",
    icon:'el-icon-s-operation'
  },
  {
    name: "推荐导航",
    url: "/recom",
    icon:'el-icon-s-order'
  },
  {
    name: "用户管理",
    url: "/user",
    icon:'el-icon-user'
  },
  {
    name: "商品管理",
    url: "/goods",
    icon:'el-icon-s-grid',
    list1: [
      {
        name: "添加商品",
        url: "/addgoods",
        icon:'el-icon-goods'
      },
      {
        name: "商品分类",
        url: "/categ",
        icon:'el-icon-document-copy'
      },
      {
        name: "商品模型",
        url: "/goodsModel",
        icon:'el-icon-box'
      },
      {
        name: "商品规格",
        url: "/goodsSpec",
        icon:'el-icon-shopping-bag-2'
      },
      {
        name: "商品参数",
        url: "/goodsParms",
        icon:'el-icon-takeaway-box'
      },
      {
        name: "规格参数",
        url: "/spec",
        icon:'el-icon-files'
      },
    ],
  },
  {
    name: "秒杀管理",
    url: "/splike",
    icon:'el-icon-time'
  },
  {
    name: "优惠券管理",
    url: "/coupon",
    icon:'el-icon-goods'
  },
  {
    name: "订单管理",
    url: "/order",
    icon:'el-icon-document'
  },
  {
    name: "通知管理",
    url: "/notice",
    icon:'el-icon-bell'
  },
  {
    name: "客服消息",
    url: "/chat",
    icon:'el-icon-chat-dot-square'
  },
];

</script>

<style lang="scss" scoped>
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>