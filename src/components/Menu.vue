<template>
  <el-menu
    default-active="1-1"
    class="el-menu"
    @open="handleOpen"
    @close="handleClose"
    background-color="#333"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <!-- 菜单通过数据循环的方式生成出来 -->
    <el-submenu :index="`${index + 1}`" v-for="(item, index) in meuns" :key="index">
      <template slot="title">
        <!-- 图标 -->
        <i :class="item.icon"></i>
        <span>{{item.title}}</span>
      </template>

      <!-- meuns.group是菜单的子分组 -->
      <!-- 两个index的字符串相加 -->
      <el-menu-item
        :index="`${index + 1}-${subIndex + 1}`"
        v-for="(subItem, subIndex) in item.group"
        :key="subIndex"
      >
        <template slot="title">
          <router-link :to="subItem.path">{{subItem.title}}</router-link>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data: function() {
    return {
      meuns: [
        {
          icon: "el-icon-menu",
          title: "购物商城",
          group: [
            { path: "/admin/goods-list", title: "商品管理" },
            { path: "/admin/category-list", title: "栏目管理" }
          ]
        },
        {
          icon: "el-icon-service",
          title: "会员管理",
          group: [{ path: "/admin/user-list", title: "会员列表" }]
        }
      ]
    };
  },
  // 组件可以接收的外部属性
  props: ["isCollapse"],

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.el-menu {
  height: 100%;
}

.el-menu a {
  /*继承父级的值*/
  color: inherit;
  text-decoration: none;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>