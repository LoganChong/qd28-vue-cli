<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属类别">
      <el-select v-model="form.category_id" placeholder="请选择所属类别">
        <el-option
          v-for="(item, index) in categorys"
          :key="index"
          :label="item.title"
          :value="item.category_id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="排序数字">
      <el-input v-model="form.sort_id"></el-input>
    </el-form-item>

    <el-form-item label="类别名称">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="类别级别">
      <el-input v-model="form.class_layer"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 用于提交到新增接口
      form: {
        title: "",
        category_id: "",
        sort_id: "",
        class_layer: ""
      },

      categorys: []
    };
  },
  mounted() {
    // 请求类别数据
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      const { message } = res.data;
      // 保存到categorys
      this.categorys = message;
    });
  },
  methods: {
    onSubmit() {
      // 新增栏目请求
      this.$axios({
        url: "/admin/category/add/goods",
        method: "POST",
        data: this.form,
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true
      }).then(res => {
        const { status, message } = res.data;
        if (!status) {
          this.$message({
            message,
            type: "success"
          });

          // 返回上一页
          this.$router.back();
        }
      });
    }
  }
};
</script>

<style>
</style>
