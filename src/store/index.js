import Vue from 'vue'
import Vuex from 'Vuex'
import getters from './getter'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading:false,//控制全局loading显示
        userName:'',
        userImg:'',
        companyName:'',
        companyEnglish:'',
        companyLogo:'',
        menuRoute:[]
    },
    actions,
    mutations,
    getters
})