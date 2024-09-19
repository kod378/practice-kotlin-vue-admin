import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import authModule from "./auth/index.js";
import storeModule from "./store/index.js";

const store = createStore({
    modules: {
        auth: authModule,
        store: storeModule,
    },
    state() {
        return {
            isLoggedIn: false,
        };
    },
    mutations: {
        setIsLoggedIn(state, payload) {
            state.isLoggedIn = payload;
        },
    },
    actions: {
        setIsLoggedIn(context, payload) {
            context.commit("setIsLoggedIn", payload);
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
    },
    plugins: [createPersistedState({
        paths: ["auth", 'isLoggedIn', 'store'],
    })],
});

export default store;