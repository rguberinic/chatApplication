import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import User from '../javascript/User'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: null
  },
  mutations: {
    checkSession(state) {
      if (!localStorage.getItem('sid')) {
        return
      }
      axios.get('http://097a122.e2.mars-hosting.com/praksa_2020_septembar/api/auth/checksession', {
        params: {
          sid: localStorage.getItem('sid')
        }
      })
        .then((response) => {
          state.currentUser = new User(response.data.data.usr_id, response.data.data.usr_username, response.data.data.usr_email)
        })
        .catch((error) => {
          console.log(error);
        })

    }
  },
  actions: {
    checkSession(state, payload) {
      state.commit('checkSession', payload)
    }
  },
  modules: {
  }
})
