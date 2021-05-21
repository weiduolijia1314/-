import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    dialogs: [],
    snackbar: [],
    topabr: true,
    count: 0,
    long_text: "",
    is_time: false,
    is_end: 0,
    Accuracy: 0,
    userinfo: {
      token: "",
      sid: "",
      uid: "",
      name: "张三",
      face: "http://i2.hdslb.com/bfs/face/ef0457addb24141e15dfac6fbf45293ccf1e32ab.jpg",
    },
    is_go: 0
  },
  mutations: {
    pushAlert(state, content) {
      //alert(content)
      state.dialogs.push(content);
    },
    getAlert(state) {
      state.dialogs.shift()
    },
    pushSnackBar(state, msg) {
      state.snackbar.push(msg);
    },
    getSnackBar(state) {
      state.snackbar.shift()
    },

  }
})

export default store
