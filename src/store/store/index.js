import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";


export default {
    namespaced: true,
    state() {
        return {
            id: null,
            name: null,
            address: null,
            status: null, // enum에 따른 상태 값
            category: null, // enum에 따른 카테고리 값
            star: null,
            thumbnailUrl: null,
            minimumAmount: null,
            minimumDeliveryAmount: null,
            phoneNumber: null,
        }
    },
    mutations,
    actions,
    getters
}