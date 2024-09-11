import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import authModule from "./auth/index.js";

const store = createStore({
    modules: {
        auth: authModule,
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
        paths: ["auth", 'isLoggedIn'],
    })],
});

export default store;