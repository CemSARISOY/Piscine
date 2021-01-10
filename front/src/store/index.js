import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        connected: null,
        userId: 0,
        isAdmin: false,
        events: []
    },
    getters: {
        authenticated : state => {
            return state.connected
        },
        userInfo : state => {
            return { numEtudiant: state.userId, isAdmin: state.isAdmin }
        }
        //EVENTS: state => state.events
    },
    mutations: {
        CONNECT(state, payload){
            state.connected = payload
        },
        SET_USER(state, payload){
            state.userId = payload.userId
            state.isAdmin = payload.isAdmin
        },
        RESET(state){
            state.connected = null
            state.userId = 0
            state.isAdmin = false
        }
    },
    actions: {
        verifyToken(context){
            return new Promise( (resolve) => {
                axios.post("http://localhost:3000/api/etudiants/token", {},{withCredentials:true})
                .then( result => {
                    if(result.data.success){
                        context.commit("CONNECT", result.data.success)
                        context.commit("SET_USER", {userId: result.data.userId, isAdmin: result.data.isAdmin })
                        resolve(result.data.success)
                    }
                }).catch( () => {
                    resolve("Non identifité");
                });
            })
            
        },
        disconnect(context){
            context.commit("CONNECT", false)
            context.commit("RESET");
            router.push("/login")
        }
    },
    modules: {
    }
})
