<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  mounted: function() {
    // this.$axios.get("https://api.github.com/users").then(res => {
    //   console.log(res.data)
    // })
    // 调用axios请求数据,axios的成功的回调要是.then这个方法来调用
    // 判断用户是否登录
    this.$axios({
      method: "GET",
      url: "/admin/account/islogin",
      // 由于在8080端口下去请求8899端口，涉及到跨域
      withCredentials: true
    }).then(res => {
      if (res.data.code == "nologin") {
        this.$router.push("/login");
      }
    });
  }
};
</script>
<style>
/*公共样式*/
* {
  margin: 0;
  padding: 0;
}
</style>
