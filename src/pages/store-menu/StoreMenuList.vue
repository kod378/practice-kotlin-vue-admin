<template>
  <div class="menu-list">
    <div v-if="isLoading">로딩 중...</div>
    <div v-else-if="storeMenus.length === 0">
      <p>등록된 메뉴가 없습니다.</p>
    </div>
    <div v-else class="menu-grid">
      <div v-for="menu in storeMenus" :key="menu.id" class="menu-item">
        <img :src="menu.thumbnailUrl" alt="Menu Image" class="menu-image" />
        <h3 class="menu-name">{{ menu.name }}</h3>
        <p class="menu-price">{{ formatPrice(menu.amount) }} 원</p>
      </div>
    </div>
  </div>
</template>

<script>
import {apiRequest} from "@/utils/api";

export default {
  data() {
    return {
      storeMenus: [],
      isLoading: false,
    };
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString();
    },
    async getStoreMenus() {
      this.isLoading = true;
      try {
        // API 요청
        const response = await apiRequest(`/api/store-menu`);
        console.log(response);
        this.storeMenus = response.data.body;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.getStoreMenus();
  }
};
</script>

<style scoped>
.menu-list {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 15px;
  text-align: center;
  background-color: #f9f9f9;
}

.menu-image {
  width: 100%;
  height: auto;
  max-width: 180px;
  margin-bottom: 10px;
}

.menu-name {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.menu-price {
  font-size: 16px;
  color: #333;
}
</style>