import { createStore } from "vuex";
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
});

export default store;