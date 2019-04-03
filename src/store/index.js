// vuex的注册数据保存
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 构造vuex的数据
const store = new Vuex.Store({
    // 当前的数据
    state: {
        // 用户数据
        user: {
            uname: sessionStorage.getItem("uname") || "你是管理员",
            realname: sessionStorage.getItem("realname") || "你是开发人员"
        }
    },

    // 同步修改state中的值
    mutations: {
        // mutations中的参数state是固定，用于修改和访问状态值
        // setUser这个方法是给login。vue去调用，调用时候会传递当前用户的资料
        setUser(state, user) {
            state.user = user;

            // 保存数据到本地
            sessionStorage.setItem("uname", user.uname)
            sessionStorage.setItem("realname", user.realname)
        }
    },

    // 异步修改
    actions: {

    }
})

export default store;
