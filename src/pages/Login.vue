<template>
  <el-row class="login" type="flex" justify="center" align="middle">
    <el-form ref="form" :model="form" label-width="80px" class="from">
      <div class="login-title">登录</div>
      <el-form-item label="账号:">
        <el-input type="text" v-model="form.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input type="password" v-model="form.upwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onRest">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        uname: "admin",
        upwd: "123456"
      }
    };
  },
  methods: {
    onSubmit() {
      this.$axios({
        url:"http://localhost:8899/admin/account/login",
        method:"POST",
        data:this.form
      }).then(res =>{
        // es6结构数组
        var {status,message} = res.data

        if(status == 1){
          // 登录失败
          // 使用elementui的弹窗
          // alert(message)
          this.$message.error(message)
        }else{
          // 登录成功
          this.$router.push("./admin")
        }
      })
    },
    onRest() {
      this.form = {
        uname: "",
        upwd: ""
      };
    }
    // $.ajax({
    //   type: "method",
    //   url: "url",
    //   data: "data",
    //   dataType: "dataType",
    //   success: function (response) {
    // }
    // });
  }
};
</script>

<style>
.login {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  text-align: center;
}
.from {
  width: 350px;
}
.login-title {
  line-height: 50px;
  color: #409eff;
  width: 100%;
  padding-left: 10%;
}
</style>
