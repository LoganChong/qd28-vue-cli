<template>
  <el-container>
    <el-aside width="auto">
      <Menu :isCollapse="isCollapse"></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header @changeShow="changeShow"></Header>
      </el-header>
      <el-main>
        <Breakcrumb></Breakcrumb>

        <!-- 匹配到的子组件 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!-- <router-view></router-view> -->
</template>

<script>
// 导入固定的组件
import Header from "../components/Header";
import Menu from "../components/Menu";
import Breakcrumb from "../components/Breakcrumb";
// import func from './vue-temp/vue-editor-bridge';
export default {
  data: function() {
    return {
      // 控制菜单的显示，true是收起，false是展开
      isCollapse: false
    };
  },
  // 注册组件
  components: {
    Header,
    Menu,
    Breakcrumb
  },
  methods: {
    changeShow: function() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

#app > .el-container {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>