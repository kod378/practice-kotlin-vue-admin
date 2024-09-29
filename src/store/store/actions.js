export default {
    setStore(context, payload) {
        console.log('setStore action', payload);
        context.commit('setStore', {
            id: payload.id,
            name: payload.name,
            address: payload.address,
            status: payload.status,
            category: payload.category,
            star: payload.star,
            thumbnailUrl: payload.thumbnailUrl,
            minimumAmount: payload.minimumAmount,
            minimumDeliveryAmount: payload.minimumDeliveryAmount,
            phoneNumber: payload.phoneNumber
        });
    },
}