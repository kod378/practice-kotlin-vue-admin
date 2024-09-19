<template>
  <div>
    <base-header></base-header>
  </div>
  <div class="store-register">
    <button type="button" @click="goMain">메인으로</button>
    <h1>메뉴 정보 등록</h1>
    <form @submit.prevent="registerStoreMenu">
      <div class="form-group">
        <label for="name">메뉴 이름</label>
        <input v-model="storeMenu.name" type="text" id="name" placeholder="메뉴 이름을 입력하세요" required />
      </div>

      <div class="form-group">
        <label for="minimumAmount">메뉴 금액</label>
        <input v-model="storeMenu.amount" type="number" step="10" id="amount" placeholder="메뉴 금액을 입력하세요" required />
      </div>

      <div class="form-group">
        <label for="thumbnailUrl">썸네일 URL</label>
        <input v-model="storeMenu.thumbnailUrl" type="text" id="thumbnailUrl" placeholder="썸네일 URL을 입력하세요" required />
      </div>

      <button type="submit">등록</button>
    </form>
  </div>
</template>

<script>
import {apiRequest} from "@/utils/api";

export default {
  data() {
    return {
      storeMenu: {
        name: "",
        thumbnailUrl: "",
        amount: 0,
      },
    };
  },
  methods: {
    async registerStoreMenu() {
      console.log(this.storeMenu);
      // 등록 로직을 여기서 처리합니다.
      try {
        const response = await apiRequest('/api/store-menu', 'POST', this.storeMenu);
        console.log(response);

        const responseData = response.data;
        console.log(responseData);
        // const storeId = responseData.body.id;
        const storeMenuName = responseData.body.name;

        // this.$store.dispatch('setStore', { storeId, storeName });
        alert(`${storeMenuName} 메뉴가 등록되었습니다.`);

        await this.$router.push('/');

      } catch (error) {
        console.error(error);
      }
    },
    async goMain() {
      await this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.store-register {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>