<template>
  <div id="app">
    hello vue-cli

    <!-- 调用Element UI组件 -->
    <el-row>
      <el-button type="primary">主要按钮</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  mounted:function (){
    this.$axios.get("https://api.github.com/users").then(res => {
      console.log(res.data)
    })
  }
};
</script>

<style>
</style>
