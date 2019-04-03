<template>
  <div class="category">
    <el-row type="flex" justify="space-between" align="middle" style="margin-bottom:20px">
      <div>
        <el-button @click="handleAddCategroy">新增</el-button>
        <el-button type="danger">删除</el-button>
      </div>
    </el-row>

    <el-tree :data="[0]" icon-class>
      <div class="custom-tree-node">
        <span>类别</span>
        <span>排序</span>
        <span>操作</span>
      </div>
    </el-tree>
    <!-- 树形控件组件 -->
    <!-- data是数据 -->
    <!-- show-checkbox 前面是否显示选择框 -->
    <!-- default-expand-all默认展开所有 -->
    <!-- expand-on-click-node 如果为false只有在点箭头时候才展开收缩 -->
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.label }}</span>
        <!-- <span>
          {{node.label}}
          {{data.label}}
        </span>-->
        <!--新增 -->
        <el-input v-model="data.sort_id" size="mini" class="sort-input" @change="handleEdit(data)"></el-input>

        <span>
          <!-- <el-button type="text" size="mini" @click="() => remove(node, data)">编辑</el-button> -->
          <el-button type="text" size="mini" @click="handleEdits">编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { type } from 'os';
let id = 1000;

export default {
  data() {
    const data = [];
    return {
      //   data4: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data))
    };
  },

  methods: {
    handleEdit(data) {
      this.$axios({
        url: `/admin/category/edit/${data.category_id}`,
        method: "POST",
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true,
        data
      }).then(res => {
        const { message, status } = res.data;
        if (status == 0) {
          this.$message({
            showClose: "true",
            message,
            type: "success"
          });
          this.getCateList();
        }
      });
    },
    handleEdits(){
      this.$message({
        type:"warning",
        message:"待完成，请先体验别的功能"
      })
    },
    getCateList() {
      this.$axios({
        url: "/admin/category/getlist/goods",
        method: "GET",
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true
      }).then(res => {
        console.log(res);
        const { status, message } = res.data;
        if (status == 0) {
          this.data = message.map(v => {
            // v.id = v.category_id;
            // v.label = v.title;
            // return v
            // 结构的写法，对象合并
            return {
              ...v,
              id: v.category_id,
              label: v.title
            };
          });
        }
      });
    },
    handleAddCategroy(){
      this.$router.push("./category-add")
    }
  },
  mounted() {
    this.getCateList();
  },
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.sort-input {
  width: 80px;
  line-height: 20px;
}
.sort-input >>> .el-input__inner {
  width: 80px;
  height: 22px;
  line-height: 22px;
}
</style>