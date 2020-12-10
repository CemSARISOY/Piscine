import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'
import axios from 'axios'


Vue.use(VueCookie )

router.beforeEach( (to, from, next) => {
    axios.get("http://localhost:3000/api/etudiants/session", {withCredentials:true})
    .then( result => {
        if(result.data.result){
            store.commit("CONNECT", result.data.result)
        }
    })
    next();
});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
