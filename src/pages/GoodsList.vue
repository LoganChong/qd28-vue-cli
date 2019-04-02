<template>
  <div>
    <el-row type="flex" justify="space-between" align="middle" style="margin-bottom:20px">
      <div>
        <el-button @click="goodsAdd">新增</el-button>
        <el-button type="danger" @click="handleDeletes">删除</el-button>
      </div>
      <el-col :span="8">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="searchvalueCache">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- data->当前数据的表格 -->
    <!-- 在多选中选择元素时候触发该事件,事件的参数是一个数组，数组里面由详细数据组成 -->
    <!-- selection-change->表格多选的时候触发 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题" width="250">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img class="goods-image" :src="scope.row.imgurl">
            {{ scope.row.title }}
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="sell_price" label="价格"></el-table-column>
      <el-table-column prop="categoryname" label="类型" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- @size-change    当pageSize 改变时会触发 -->
    <!-- @current-change 当currentPage 改变时会触发 -->
    <!-- :current-page   当前页数，支持 .sync 修饰符 -->
    <!-- :page-sizes   每页显示个数选择器的选项设置 -->
    <!-- :page-size  每页显示条目个数，支持 .sync 修饰符 -->
    <!-- layout  组件布局，子组件名用逗号分隔	 -->
    <!-- :total  总条目数 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[3,6,9,12]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 3,
      searchvalue: "",
      searchvalueCache: "",
      total: 0,
      multipleSelection: [],
      ids: []
    };
  },

  mounted: function() {
    this.getList();
  },
  methods: {
    getList() {
      // 请求列表的数据,axios的get可以用params属性添加请求的参数
      this.$axios({
        url: "/admin/goods/getlist",
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true,
        // params相当于post请求的data
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          searchvalue: this.searchvalue
        }
      }).then(res => {
        this.tableData = res.data.message;
        // 总条数
        this.total = res.data.totalcount;
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    // 表格多选时候触发
    handleSelectionChange(val) {
      var arr = val.map(v => {
        return v.id;
      });
      var ids = arr.join(",");
      this.ids = ids;
    },
    // 删除按钮
    handleDelete(index, row) {
      // 每一行的index索引值
      // console.log(index)
      // 每一行的数据
      // console.log(row.id);
      this.$axios({
        url: `/admin/goods/del/${row.id}`,
        method: "GET",
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true
      }).then(res => {
        var { message, statsu } = res.data;
        if (status == 0) {
          this.$message({
            showClose: true,
            message,
            type: "success"
          });
          this.getList();
        }
      });
    },
    // 编辑
    handleEdit(index, row) {
      // 跳转到编辑页，并且带上id
      this.$router.push(`/admin/goods-edit/${row.id}`);
    },

    // 删除多个
    handleDeletes() {
      console.log(Boolean(this.ids));
      if (this.ids.length == 0) {
        this.$message({
          showClose: true,
          message: "请您选择要删除的数据",
          type: "error"
        });
        return;
      }
      this.$axios({
        url: `/admin/goods/del/${this.ids}`,
        method: "GET",
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true
      }).then(res => {
        var { message, statsu } = res.data;
        if (status == 0) {
          this.$message({
            showClose: true,
            message,
            type: "success"
          });
          this.getList();
        }
      });
    },
    // 搜索按钮
    handleSearch() {
      if (!this.searchvalueCache) {
        this.$message({
          showClose: true,
          message: "请您输入搜索关键字",
          type: "error"
        });
        return;
      }
      this.searchvalue = this.searchvalueCache;
      // 需要将初始页数设置为1，否者，当你浏览到第四页在进行搜索时，
      // 点击搜索发送的ajax请求的参数为pageIndex=4,pageSize=3，searchvalue = "xxx"，
      // 若是数据库里面没有符合参数的第四页数据，则会请求不到数据
      // 所以要将pageIndex设置为1
      this.pageIndex = 1;
      this.getList();
    },

    // 改变页数时候触发
    // val就是当前点击的页数
    // 1.修改页数，2.再次请求数据
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 修改条数时候触发
    // 1.修改条数，2.再次请求数据
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    goodsAdd() {
      this.$router.push("/admin/goods-add");
    }
  }
};
</script>

<style>
.goods-image {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  /* 设置为0后元素在flex布局中就不会被挤压 */
  flex-shrink: 0;
}
</style>