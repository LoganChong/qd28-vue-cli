<template>
  <el-row type="flex" justify="space-between" align="middle">
    <i class="el-icon-back" @click="handleClick"></i>
    <div class="user">
      admin 超级管理员
      <span class="logout" @click="handleLogout">退出</span>
    </div>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleClick: function() {
      console.log(111);
      this.$emit("changeShow");
    },
    handleLogout: function() {
      this.$axios({
        url: "/admin/account/logout",
        method: "GET",
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true
      }).then(res => {
        var {status ,message} = res.data;
        if(status == 0){
          this.$message.success(message);
          setTimeout(() => {
            this.$router.push("/login")
          }, 4000);
        }
      });
    }
  }
};
</script>

<style scoped>
.logout {
  cursor: pointer;
}
</style>
