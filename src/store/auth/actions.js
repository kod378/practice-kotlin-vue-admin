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
            setUser(context, payload, responseData);

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to register";
            console.log(error.response?.data);
            throw new Error(errorMessage);
        }
    },
    setStore(context, payload) {
        context.commit('setStore', {
            storeId: payload.storeId,
            storeName: payload.storeName,
        });
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
    const storeSimpleResponse = responseBodyData.storeSimpleResponse;

    console.log(storeSimpleResponse ? storeSimpleResponse.name : null)
    console.log(storeSimpleResponse ? storeSimpleResponse.id : null)

    context.commit('setUser', {
        accessToken: responseBodyData.accessToken,
        refreshToken: responseBodyData.refreshToken,
        storeName: storeSimpleResponse ? storeSimpleResponse.name : null,
        storeId: storeSimpleResponse ? storeSimpleResponse.id : null,
        username: payload.username,
    });
}