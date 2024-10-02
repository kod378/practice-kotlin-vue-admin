import {createRouter, createWebHistory} from 'vue-router'
import MainHome from "@/pages/MainHome.vue";
import StoreUserLogin from "@/pages/auth/StoreUserLogin.vue";
import StoreUserRegister from "@/pages/auth/StoreUserRegister.vue";
import StoreRegister from "@/pages/store/StoreRegister.vue";
import StoreMenuRegister from "@/pages/store-menu/StoreMenuRegister.vue";
import OrderView from "@/pages/order/OrderView.vue";
import OrderHistory from "@/pages/order/OrderHistory.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {path: '/', component: HelloWorld},
        {path: '/', component: MainHome},
        {path: '/login', component: StoreUserLogin, name: 'login'},
        {path: '/register', component: StoreUserRegister},
        {path: '/store/register', component: StoreRegister},
        {path: '/store-menu/register', component: StoreMenuRegister},
        {path: '/order-view', component: OrderView, name: 'order-view'},
        {path: '/order-history', component: OrderHistory, name: 'order-history'},
    ]
});

export default router;