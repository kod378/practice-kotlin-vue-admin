export default {
    setUser(state, payload) {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.username = payload.username;
    },
    setJwtToken(state, payload) {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
    }
}