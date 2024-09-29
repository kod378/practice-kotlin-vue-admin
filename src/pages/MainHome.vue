<template>
  <div>
    <base-header></base-header>
    <section>
      <div v-if="!hasStore()">
        <p>등록된 가게가 없습니다.</p>
        <router-link to="/store/register">가게 등록하기</router-link>
      </div>
      <div v-else>
        <StoreInfo></StoreInfo>
        <StoreMenuList></StoreMenuList>
      </div>
    </section>
  </div>
</template>
<script>
import {apiRequest} from "@/utils/api";
import StoreInfo from "@/pages/store/StoreInfo.vue";
import StoreMenuList from "@/pages/store-menu/StoreMenuList.vue";

export default {
  components: {StoreMenuList, StoreInfo },
  inject: ['hasStore'],
  methods: {
    async checkMe() {
      try {
        const response = await apiRequest('/api/auth/me');
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.log(error);
        console.error('Fail to get user information');
      }
    },
    checkLogin() {
      const accessToken = this.$store.getters.accessToken;
      if (!accessToken) {
        this.$router.push('/login');
      }
    },
  },
  created() {
    this.checkLogin();
  },
}
</script>