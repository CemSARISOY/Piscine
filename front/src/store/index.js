import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        connected: null
    },
    getters: {
        authenticated : state => {
            return state.connected
        }
    },
    mutations: {
        CONNECT(state, payload){
            state.connected = payload
        }
    },
    actions: {
        verifyToken(context){
            return new Promise( (resolve) => {
                axios.post("http://localhost:3000/api/etudiants/token", {},{withCredentials:true})
                .then( result => {
                    if(result.data.success){
                        context.commit("CONNECT", result.data.success)
                        resolve(result.data.success)
                    }
                }).catch( () => {
                    resolve("Non identifité");
                });
            })
            
        },
        disconnect(context){
            context.commit("CONNECT", false)
            router.push("/login")
        }
    },
    modules: {
    }
})
