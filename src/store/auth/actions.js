import { openApiRequest } from "@/utils/api";

export default {
    async login(context, payload) {
        try {
            const response = await openApiRequest("/open-api/auth/login", "POST", {
                username: payload.username,
                password: payload.password,
            });

            const responseData = response.data;
            setUser(context, payload, responseData);

        } catch (error) {
            const errorCode = error.response?.data?.result?.code;
            if (errorCode === 2004 || errorCode === 4404) {
                throw new Error("Invalid email or password. Please try again.");
            }
            const errorMessage = error.response?.data?.result?.message || "Failed to login";
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
            setUser(context, payload, responseData);

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to register";
            console.log(error.response?.data);
            throw new Error(errorMessage);
        }
    },
    setJwtToken(context, payload) {
        context.commit('setJwtToken', {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
        });
    }
};

function setUser(context, payload, responseData) {
    console.log(responseData);

    const responseBodyData = responseData.body;
    const storeResponse = responseBodyData.storeResponse;

    context.commit('setUser', {
        accessToken: responseBodyData.accessToken,
        refreshToken: responseBodyData.refreshToken,
        // storeName: storeResponse ? storeResponse.name : null,
        // storeId: storeResponse ? storeResponse.id : null,
        username: payload.username,
    });

    if (storeResponse) {
        context.dispatch('store/setStore', storeResponse, {root: true})
    }
}