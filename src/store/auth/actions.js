import { openApiRequest } from "@/utils/api";

export default {
    async login(context, payload) {
        try {
            const response = await openApiRequest("/open-api/auth/login", "POST", {
                username: payload.username,
                password: payload.password,
            });

            const responseData = response.data;
            setUserAndSaveInLocalStorage(context, payload, responseData);

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to login";
            console.log(error.response?.data);
            throw new Error(errorMessage);
        }
    },

    async register(context, payload) {
        try {
            const response = await openApiRequest("/open-api/auth/register", "POST", {
                email: payload.email,
                password: payload.password,
            });

            const responseData = response.data;
            setUserAndSaveInLocalStorage(context, payload, responseData);

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to register";
            console.log(error.response?.data);
            throw new Error(errorMessage);
        }
    }
};

function setUserAndSaveInLocalStorage(context, payload, responseData) {
    console.log(responseData);

    const responseBodyData = responseData.body;
    const storeResponse = responseBodyData.storeResponse;

    context.commit('setUser', {
        accessToken: responseBodyData.accessToken,
        refreshToken: responseBodyData.refreshToken,
        storeName: storeResponse ? storeResponse.storeName : null,
        storeId: storeResponse ? storeResponse.storeId : null,
        username: payload.username,
    });

    localStorage.setItem('accessToken', responseBodyData.accessToken);
    localStorage.setItem('refreshToken', responseBodyData.refreshToken);
    localStorage.setItem('storeName', storeResponse ? storeResponse.storeName : null);
    localStorage.setItem('storeId', storeResponse ? storeResponse.storeId : null);
}