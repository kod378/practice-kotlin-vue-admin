<template>
  <div class="store-register">
    <h1>가게 정보 등록</h1>
    <form @submit.prevent="registerStore">
      <div class="form-group">
        <label for="name">가게 이름</label>
        <input v-model="store.name" type="text" id="name" placeholder="가게 이름을 입력하세요" required />
      </div>

      <div class="form-group">
        <label for="address">주소</label>
        <input v-model="store.address" type="text" id="address" placeholder="주소를 입력하세요" required />
      </div>

      <div class="form-group">
        <label for="category">카테고리</label>
        <select v-model="store.category" id="category" required>
          <option v-for="category in storeCategories" :key="category.value" :value="category.value">
            {{ category.display }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="thumbnailUrl">썸네일 URL</label>
        <input v-model="store.thumbnailUrl" type="text" id="thumbnailUrl" placeholder="썸네일 URL을 입력하세요" required />
      </div>

      <div class="form-group">
        <label for="minimumAmount">최소 주문 금액</label>
        <input v-model="store.minimumAmount" type="number" step="0.01" id="minimumAmount" placeholder="최소 주문 금액을 입력하세요" required />
      </div>

      <div class="form-group">
        <label for="minimumDeliveryAmount">최소 배달 금액</label>
        <input v-model="store.minimumDeliveryAmount" type="number" step="0.01" id="minimumDeliveryAmount" placeholder="최소 배달 금액을 입력하세요" required />
      </div>

      <div class="form-group">
        <label for="phoneNumber">전화번호</label>
        <input v-model="store.phoneNumber" type="text" id="phoneNumber" placeholder="전화번호를 입력하세요" />
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
      store: {
        name: "",
        address: "",
        category: "",
        thumbnailUrl: "",
        minimumAmount: 0,
        minimumDeliveryAmount: 0,
        phoneNumber: "",
      },
      storeCategories: [
        { value: "CHINESE_FOOD", display: "중식" },
        { value: "WESTERN_FOOD", display: "양식" },
        { value: "KOREAN_FOOD", display: "한식" },
        { value: "JAPANESE_FOOD", display: "일식" },
        { value: "CHICKEN", display: "치킨" },
        { value: "PIZZA", display: "피자" },
        { value: "HAMBURGER", display: "햄버거" },
        { value: "COFFEE_TEA", display: "커피&차" },
      ],
    };
  },
  methods: {
    async registerStore() {
      console.log(this.store);
      // 등록 로직을 여기서 처리합니다.
      try {
        const response = await apiRequest('/api/store', 'POST', this.store);
        console.log(response);

        const responseData = response.data;
        console.log(responseData);
        // const storeId = responseData.body.id;
        const storeName = responseData.body.name;

        this.$store.dispatch('store/setStore', responseData.body);
        alert(`${storeName} 가게가 등록되었습니다.`);

        await this.$router.push('/');

      } catch (error) {
        console.error(error);
      }
    },
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