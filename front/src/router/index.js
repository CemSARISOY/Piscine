import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import MyAccount from '../views/MyAccount.vue'
import SignUp from '../views/SignUp.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import EmailConfirmation from '../views/EmailConfirmation.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        name: 'Not Found',
        component: () => import( '../views/Error404.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {requiresAuth: true}
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    },
    {
        path: '/logout',
        name: 'Logout',
        component: () => import('../views/Logout.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignUp
    },
    {
        path: '/profile',
        name: 'MyAccount',
        component: MyAccount
    },
    {
        path: '/planning/:id', 
        name: 'Planning',
        component: () => import('../views/Planning.vue')

    },
    {
        path: "/event/create",
        name: 'Creation event',
        component: () => import('../views/CreateEvent.vue'),
        meta: {requiresAuth: true, requiresAdmin: true}
    },
    {
        path: '/event/:id',
        name: 'EventInfo',
        component: () => import('../components/eventInfoForm'),
        /*params: {
            idEvent: id,
        }*/
    },
    {
        path: '/creneaux/:id',
        name: 'DisplayCreneaux',
        component: () => import('../components/infoCreneau'),
    },

    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../components/SignUpForm')
    },
    {
        path: '/myaccount',
        name: 'MyAccount',
        component: () => import('../components/MyAccountForm')
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        path: '/emailconfirmation/:token', 
        name: 'EmailConfirmation',
        component: EmailConfirmation

    },
    {
        path: '/promos',
        name : 'ListePromos',
        component: () => import('../views/Promos.vue'),
        meta : {requiresAuth: true, requiresAdmin: true}
    },
    {
        path: '/professeurs',
        name : 'ListeProfs',
        component: () => import('../views/Profs.vue'),
        meta : {requiresAuth: true, requiresAdmin: true}
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
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(!store.getters.authenticated){
            next("/login")
        }else{
            if(to.matched.some(record => record.meta.requiresAdmin)){
                if(!store.getters.userInfo.isAdmin){
                    next("/")
                }else{
                    next();
                }
            }else{
                next();
            }
        }
    }else{
        next();
    }
});


export default router
