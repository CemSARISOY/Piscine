import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        connected: false
    },
    mutations: {
        CONNECT(state, payload){
            state.connected = payload
        }
    },
    actions: {
    },
    modules: {
    }
})
