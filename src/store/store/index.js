import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";


export default {
    namespaced: true,
    state() {
        return {
            id: null,
            name: null,
            address: "",
            status: "", // enum에 따른 상태 값
            category: "", // enum에 따른 카테고리 값
            star: 0.0,
            thumbnailUrl: "",
            minimumAmount: 0,
            minimumDeliveryAmount: 0,
            phoneNumber: "",
        }
    },
    mutations,
    actions,
    getters
}