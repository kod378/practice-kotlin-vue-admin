export default {
    setUser(state, payload) {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.username = payload.username;
        state.storeId = payload.storeId;
        state.storeName = payload.storeName;
    },
    setStore(state, payload) {
        state.storeId = payload.storeId;
        state.storeName = payload.storeName;
    },
    setJwtToken(state, payload) {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
    }
}