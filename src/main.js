import Vue from 'vue'
import App from './App.vue'

// 非生产环境
Vue.config.productionTip = false

// 1.引入element-ui
import ElementUI from "element-ui";
// 2.引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';

// 1.引入axios
import axios from 'axios';

// 引入路由模块
import VueRouter from "vue-router";

// 引入组件
import Login from "./pages/Login.vue";
import Admin from "./pages/Admin.vue";
import UserList from "./pages/UserList.vue";
import GoodsAdd from "./pages/GoodsAdd.vue";
import GoodsEdit from "./pages/GoodsEdit.vue";
import GoodsList from "./pages/GoodsList.vue";
import CategoryList from "./pages/CategoryList.vue";
import CategoryAdd from "./pages/CategoryAdd.vue";

// vuex// 1.导入vuex的store
import store from "./store";

// 3.全局注册组件
Vue.use(ElementUI);

// 注册路由
Vue.use(VueRouter);

// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;
// 设置axios的基础url
axios.defaults.baseURL = "http://localhost:8899";

// 路由配置
const routes = [
  { path: "/", redirect: "/admin" },
  { path: "/login", component: Login, meta: "登录" },
  {
    path: "/admin",
    component: Admin,
    redirect: "/admin/goods-list",
    meta: "管理后台",
    children: [
      { path: "goods-list", component: GoodsList, meta: "商品列表" },
      { path: "goods-add", component: GoodsAdd, meta: "新增商品" },
      { path: "goods-edit/:id", component: GoodsEdit, meta: "编辑商品" },
      { path: "category-list", component: CategoryList, meta: "栏目列表" },
      { path: "category-add", component: CategoryAdd, meta: "新增栏目" },
      { path: "user-list", component: UserList, meta: "会员列表" }
    ]
  }
]
// 路由对象
const router = new VueRouter({
  routes
})

new Vue({
  store,
  // 挂载路由到根实例
  router,
  render: h => h(App),
}).$mount('#app')






// --------------------------------------------
// 之前的根实例
// new Vue({
//   el: "#app",

//   render: function(createElement){
//     return createElement(App)
//   },

//   // 箭头函数只有一行代码并且需要返回的时候
//   render: h = h(App)
// })
