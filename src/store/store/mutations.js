export default {
    setStore(state, payload) {
        state.id = payload.id;
        state.name = payload.name;
        state.address = payload.address;
        state.status = payload.status;
        state.category = payload.category;
        state.star = payload.star;
        state.thumbnailUrl = payload.thumbnailUrl;
        state.minimumAmount = payload.minimumAmount;
        state.minimumDeliveryAmount = payload.minimumDeliveryAmount;
        state.phoneNumber = payload.phoneNumber;
    },
}