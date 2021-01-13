import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import MyAccount from '../views/MyAccount.vue'
import SignUp from '../views/SignUp.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        name: 'Not Found',
        component: () => import( '../views/Error404.vue')
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
        path: '/logout',
        name: 'Logout',
        component: () => import('../views/Logout.vue')

    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignUp
    },
    {
        path: '/myaccount',
        name: 'MyAccount',
        component: MyAccount
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: ForgotPassword
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach( async (to, from, next) => {
    if(store.getters.authenticated == null){
        await store.dispatch("verifyToken")
    }
    if(to.path !== '/login' && to.path !== '/signup' && to.path !== '/myaccount' && to.path !== '/forgotpassword'){
        if(!store.getters.authenticated){
            next("/login")
        }else{
            next();
        }
    }else{
        next();
    }
});


export default router
