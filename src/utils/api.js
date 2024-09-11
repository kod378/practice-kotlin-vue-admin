import axios from 'axios';
import router from "@/router";
import store from "@/store/index";

const apiServer = 'http://localhost:8081';

const axiosInstance = axios.create({
    baseURL: apiServer,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Axios 인터셉터를 사용해 401 에러 처리 및 AccessToken 갱신 로직 추가
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        // 401 에러가 발생하고, 재시도 플래그가 없으며, 에러 응답이 2001일 때
        if (error.response.status === 401 && !originalRequest._retry && error.response.data.result.code === 2001) {
            originalRequest._retry = true;

            const refreshToken = store.getters.refreshToken;
            if (refreshToken) {
                try {
                    console.log('before axios.post');
                    // RefreshToken으로 새로운 AccessToken 요청
                    const { data } = await axios.post(`${apiServer}/api/auth/refresh`, {
                        isRefreshToken: true,
                    }, {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    });

                    const responseBodyData = data.body;
                    await store.dispatch('setJwtToken', {
                        accessToken: responseBodyData.accessToken,
                        refreshToken: responseBodyData.refreshToken,
                    });

                    // 새로운 AccessToken으로 원래 요청 다시 시도
                    originalRequest.headers['Authorization'] = `Bearer ${responseBodyData.accessToken}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    // RefreshToken이 만료되었을 때 로그인 화면으로 리디렉션하며 query에 이유 전달
                    await store.dispatch('setJwtToken', {
                        accessToken: null,
                        refreshToken: null,
                    });
                    await router.push({
                        name: 'login',
                        query: {message: 'refresh-token-expired'}
                    });
                    return Promise.reject(refreshError);
                }
            } else {
                // RefreshToken이 없는 경우에도 로그인 페이지로 리디렉션
                await router.push({
                    name: 'login',
                    query: {message: 'refresh-token-expired'}
                });
            }
        }
        return Promise.reject(error);
    }
);

// OPEN API 요청
export async function openApiRequest(url, method = 'GET', data = null) {
    const options = {
        method,
        url,
        data,
    };
    return axiosInstance(options);
}

// 인증이 필요한 API 요청
export async function apiRequest(url, method = 'GET', data = null) {
    const accessToken = store.getters.accessToken;
    const options = {
        method,
        url,
        data,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    return axiosInstance(options);
}