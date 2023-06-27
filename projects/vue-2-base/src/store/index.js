import Vuex from 'vuex'
import Vue from 'vue'
import {countStore} from './countStore'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    countStore,
  },
})

export default store
