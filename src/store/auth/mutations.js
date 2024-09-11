export default {
    setUser(state, payload) {
        state.accessToken = payload.accessToken;
        state.accessTokenExpiredAt = payload.accessTokenExpiredAt;
        state.username = payload.username;
    }
}