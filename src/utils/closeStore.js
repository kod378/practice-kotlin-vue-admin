import Store from "@/store/index";
import {apiRequest} from "@/utils/api";

export async function closeStore() {
    const currentStore = Store.getters['store/status'];
    if (currentStore && currentStore === 'OPEN') {
        try {
            const response = apiRequest(`/api/store/close`, 'PUT');
            console.log(response);
            await Store.dispatch('store/setStatus', 'CLOSE');
        } catch (error) {
            console.error(error);
        }
    }
}