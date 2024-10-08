import {createRouter, createWebHistory} from 'vue-router'
import MainHome from "@/pages/MainHome.vue";
import StoreUserLogin from "@/pages/auth/StoreUserLogin.vue";
import StoreUserRegister from "@/pages/auth/StoreUserRegister.vue";
import StoreRegister from "@/pages/store/StoreRegister.vue";
import StoreMenuRegister from "@/pages/store-menu/StoreMenuRegister.vue";
import OrderView from "@/pages/order/OrderView.vue";
import OrderHistory from "@/pages/order/OrderHistory.vue";
import {closeStore} from "@/utils/closeStore";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: MainHome},
        {path: '/login', component: StoreUserLogin, name: 'login'},
        {path: '/register', component: StoreUserRegister},
        {path: '/store/register', component: StoreRegister},
        {path: '/store-menu/register', component: StoreMenuRegister},
        {path: '/order-view', component: OrderView, name: 'order-view'},
        {path: '/order-history', component: OrderHistory, name: 'order-history'},
    ]
});

router.beforeEach((to, from, next) => {
    if (to.name === 'login' || to.name === 'register') {
        next();
        return;
    }

    if (to.name !== 'order-view') {
        closeStore().then(() => {
            next();
        })
    } else {
        next();
    }
});

export default router;