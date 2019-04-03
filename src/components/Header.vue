<template>
  <el-row type="flex" justify="space-between" align="middle">
    <i class="el-icon-back" @click="handleClick"></i>
    <div class="user">
      {{user.uname}} {{user.realname}}
      <span class="logout" @click="handleLogout">退出</span>
    </div>
  </el-row>
</template>

<script>
// 导入vuex的数据
import { mapState } from "vuex";

// 在computed中计算返回vuex中的值
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
        var { status, message } = res.data;
        if (status == 0) {
          this.$message.success(message);
          setTimeout(() => {
            this.$router.push("/login");
          }, 4000);
        }
      });
    }
  },
  computed: {
    ...mapState({
      // key的值自己定义的属性，在页面根据这个值来渲染
      // “user”是vuex中定义的属性
      user: "user"
    })
  }
};
</script>

<style scoped>
.logout {
  cursor: pointer;
}
</style>
