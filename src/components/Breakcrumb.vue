<template>
  <el-breadcrumb separator="/" style="margin-bottom:20px">
    <el-breadcrumb-item v-for="(item,index) in routeInfo" :key="index">
      {{item}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data: function() {
    return {
    };
  },
  computed: {
    routeInfo: function() {
      var arr = this.$route.matched.map(v =>{
        return v.meta;
      })
      return arr;
    }
  }
  //   mounted: function() {
  //     console.log(this.$route);
  //   }
};
</script>

<style>
</style>