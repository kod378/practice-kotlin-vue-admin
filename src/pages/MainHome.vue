<template>
  <div>
    <base-header></base-header>
    <section>
<!--      <button @click="logout">Logout</button>-->
      <button @click="checkMe">check me</button>
    </section>
    <section>
      <div v-if="!hasStoreName">
        <p>등록된 가게가 없습니다.</p>
        <router-link to="/store/register">가게 등록하기</router-link>
      </div>
      <div v-else>
        <router-link to="/store">{{ storeName }} 가게 정보</router-link>
      </div>
    </section>
  </div>
</template>
<script>
import {apiRequest} from "@/utils/api";

export default {
  inject: ['hasStoreName', 'storeName'],
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