import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: [],
    loggin: false,
    handleDrawer: false,
    drawer: true
  },
  getters: {
    getDrawer(state) {
      return state.drawer
    },
    userInfo: state => {
      return state.userInfo;
    }

  },
  mutations: {
    logout(state, status) {
      state.loggin = status
    },
    setDrawer(state) {
      state.drawer = !state.drawer
    },
    setGetUserinfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async getInfoUser() {
      try {
        const response = await axios.post('user/getInforAccount/' + localStorage.getItem('email'))
        this.commit("setGetUserinfo", response.data)
      } catch (e) {
        console.log(e)
      }
    },
  }
})
