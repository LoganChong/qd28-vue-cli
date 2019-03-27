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

// 3.全局注册组件
Vue.use(ElementUI);

// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

new Vue({
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
