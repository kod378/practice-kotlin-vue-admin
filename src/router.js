import {createRouter, createWebHistory} from 'vue-router'
import MainHome from "@/pages/MainHome.vue";
import StoreUserLogin from "@/pages/auth/StoreUserLogin.vue";
import StoreUserRegister from "@/pages/auth/StoreUserRegister.vue";
import StoreRegister from "@/pages/store/StoreRegister.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {path: '/', component: HelloWorld},
        {path: '/', component: MainHome},
        {path: '/login', component: StoreUserLogin, name: 'login'},
        {path: '/register', component: StoreUserRegister},
        {path: '/store/register', component: StoreRegister},
    ]
});

export default router;