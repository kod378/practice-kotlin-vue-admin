<template>
  <div class="store-details">
    <h1>{{ storeInfo.name }}</h1>
    <img :src="storeInfo.thumbnailUrl" alt="Store Thumbnail" class="store-thumbnail" />

    <div class="store-info">
      <p><strong>주소:</strong> {{ storeInfo.address }}</p>
      <p><strong>전화번호:</strong> {{ storeInfo.phoneNumber }}</p>
      <p><strong>카테고리:</strong> {{ getCategoryDisplay(storeInfo.category) }}</p>
      <p><strong>상태:</strong> {{ getStatusDescription(storeInfo.status) }}</p>
      <p><strong>최소 주문 금액:</strong> {{ storeInfo.minimumAmount.toFixed(2) }} 원</p>
      <p><strong>최소 배달 금액:</strong> {{ storeInfo.minimumDeliveryAmount.toFixed(2) }} 원</p>
    </div>
  </div>
  <div>
    <button @click="registerMenu">메뉴추가</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      storeCategories: {
        CHINESE_FOOD: "중식",
        WESTERN_FOOD: "양식",
        KOREAN_FOOD: "한식",
        JAPANESE_FOOD: "일식",
        CHICKEN: "치킨",
        PIZZA: "피자",
        HAMBURGER: "햄버거",
        COFFEE_TEA: "커피&차",
      },
      storeStatuses: {
        REGISTERED: "준비중",
        OPEN: "영업중",
        CLOSE: "영업종료",
        UNREGISTERED: "해지",
      },
    };
  },
  computed: {
    storeInfo() {
      return {
        id: this.$store.getters['store/id'],
        name: this.$store.getters['store/name'],
        address: this.$store.getters['store/address'],
        status: this.$store.getters['store/status'],
        category: this.$store.getters['store/category'],
        star: this.$store.getters['store/star'],
        thumbnailUrl: this.$store.getters['store/thumbnailUrl'],
        minimumAmount: this.$store.getters['store/minimumAmount'],
        minimumDeliveryAmount: this.$store.getters['store/minimumDeliveryAmount'],
        phoneNumber: this.$store.getters['store/phoneNumber'],
      };
    }
  },
  methods: {
    getCategoryDisplay(category) {
      return this.storeCategories[category] || "알 수 없음";
    },
    getStatusDescription(status) {
      return this.storeStatuses[status] || "알 수 없음";
    },
    async registerMenu() {
      await this.$router.push('/store-menu/register');
    },
  },
};
</script>

<style scoped>
.store-details {
  max-width: 600px;
  margin: 0 auto;
}

.store-thumbnail {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.store-info {
  font-size: 18px;
}

.store-info p {
  margin: 10px 0;
}

.store-info strong {
  font-weight: bold;
}
</style>