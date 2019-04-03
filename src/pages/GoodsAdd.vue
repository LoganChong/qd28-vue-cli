<template>
  <div>
    <el-row class="el-col el-col-18">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属类别">
          <el-select v-model="form.category_id" placeholder="请选择">
            <el-option
              v-for="(item,index) in categroy"
              :key="index"
              :label="item.title"
              :value="item.category_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否发布">
          <el-switch v-model="form.status"></el-switch>
          <span class="tips">**不发布则前台无法显示</span>
        </el-form-item>
        <el-form-item label="推荐类型">
          <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
          <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
        </el-form-item>
        <el-form-item label="内容标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="form.sub_title"></el-input>
        </el-form-item>
        <el-form-item label="封面图片">
          <!-- action:上传地址 -->
          <!-- show-file-list上传多张图片是使用 -->
          <!-- on-success 上传成功后的回调函数 -->
          <!-- before-upload  上传之前的回调函数 -->
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8899/admin/article/uploadimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品货号" class="inpWidth">
          <el-input v-model="form.goods_no"></el-input>
        </el-form-item>

        <el-form-item label="商品数量" class="inpWidth">
          <el-input v-model="form.stock_quantity"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" class="inpWidth">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="销售价格" class="inpWidth">
          <el-input v-model="form.sell_price"></el-input>
        </el-form-item>
        <el-form-item label="图片相册">
          <!-- list-type="picture-card"卡片多种图片类型 -->
          <!-- :on-preview预览图片
          :on-remove删除图片-->
          <el-upload
            action="http://localhost:8899/admin/article/uploadimg"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handlePictureCard"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- visible显示隐藏 -->
          <!-- dialogImageUrl预览图片路径 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
        <el-form-item label="内容摘要">
          <el-input type="textarea" v-model="form.zhaiyao"></el-input>
        </el-form-item>
        <div class="editor">
          <el-form-item label="内容描述">
            <quillEditor v-model="form.content"></quillEditor>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
// 1.添加样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 2.导入组件并且注册局部组件
import { quillEditor } from "vue-quill-editor";

export default {
  // is_slide: false // 在商品详情中不使用
  // 表单数据提交没有，但是，在发送的时候带上，否则会报错
  data() {
    return {
      form: {
        category_id: "",
        status: false,
        imgList: [],
        is_top: true,
        is_hot: false,
        title: "",
        sub_title: "",
        goods_no: "",
        stock_quantity: "",
        sell_price: "",
        zhaiyao: "",
        fileList: [],
        content: "",
        is_slide: false // 在商品详情中不使用
      },
      categroy: [],
      // 预览图片的地址
      imageUrl: "",
      dialogImageUrl: "",
      // 是否显示预览窗口
      dialogVisible: false
    };
  },
  methods: {
    onSubmit() {
      this.$axios({
        url: "/admin/goods/add/goods",
        method: "POST",
        data: this.form,
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true
      }).then(res => {
        var { status, message } = res.data;
        // console.log(res);
        if (status == 0) {
          this.$message({
            showClose: true,
            message,
            type: "success"
          });
          this.$router.back();
        } else {
          this.$message({
            showClose: true,
            message,
            type: "error"
          });
        }
      });
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      // URL.createObjectURL是html5的新接口，可以用于预览本地图片
      // file.raw路径
      this.imageUrl = window.URL.createObjectURL(file.raw);
      this.form.imgList[0] = res;
    },
    // 上传之前,file就是当前上传的文件对象
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 删除图片后的回调函数
    handleRemove(file, fileList) {
      // fileList每一项的respone的属性才是 { name:xxx, shotUrl: xxx, url:
      // console.log(file, fileList);
      this.form.fileList = fileList.map(v => {
        return v.response;
      });
      // console.log(this.form.fileList);
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传成功后回调
    handlePictureCard(res, file) {
      this.form.fileList.push(res);
    }
  },
  mounted: function() {
    this.$axios({
      url: "/admin/category/getlist/goods",
      // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true
    }).then(res => {
      const { status, message } = res.data;
      if (status == 0) {
        // 保存到categorys
        this.categroy = message;
      }
    });
  },
  components: {
    // 编辑器组件
    quillEditor
  }
};
</script>

<style>
.inpWidth {
  width: 50%;
}
.tips {
  font-size: 12px;
  color: #999;
  vertical-align: middle;
  margin: 0 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.editor .el-form-item__content {
  line-height: unset;
}
</style>