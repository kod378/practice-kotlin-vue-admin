<template>
  <div class="store-details">
    <h1>{{ store.name }}</h1>
    <img :src="store.thumbnailUrl" alt="Store Thumbnail" class="store-thumbnail" />

    <div class="store-info">
      <p><strong>주소:</strong> {{ store.address }}</p>
      <p><strong>전화번호:</strong> {{ store.phoneNumber }}</p>
      <p><strong>카테고리:</strong> {{ getCategoryDisplay(store.category) }}</p>
<!--      <p><strong>상태:</strong> {{ getStatusDescription(store.status) }}</p>-->
      <p><strong>별점:</strong> {{ store.star.toFixed(1) }} / 5.0</p>
      <p><strong>최소 주문 금액:</strong> {{ store.minimumAmount.toFixed(2) }} 원</p>
      <p><strong>최소 배달 금액:</strong> {{ store.minimumDeliveryAmount.toFixed(2) }} 원</p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      store: {
        name: "",
        address: "",
        status: "", // "UNREGISTERED" 상태도 가능
        category: "", // enum에 따른 카테고리 값
        star: 0.0,
        thumbnailUrl: "",
        minimumAmount: 0,
        minimumDeliveryAmount: 0,
        phoneNumber: "",
      },
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
      // storeStatuses: {
      //   REGISTERED: "등록",
      //   UNREGISTERED: "해지",
      // },
    };
  },
  methods: {
    getCategoryDisplay(category) {
      return this.storeCategories[category] || "알 수 없음";
    },
    // getStatusDescription(status) {
    //   return this.storeStatuses[status] || "알 수 없음";
    // },
    getStoreInfo() {
      //vuex에서 store모듈 정보 가져오기
      this.store.name = this.$store.getters['store/name'];
      this.store.address = this.$store.getters['store/address'];
      this.store.status = this.$store.getters['store/status'];
      this.store.category = this.$store.getters['store/category'];
      this.store.star = this.$store.getters['store/star'];
      this.store.thumbnailUrl = this.$store.getters['store/thumbnailUrl'];
      this.store.minimumAmount = this.$store.getters['store/minimumAmount'];
      this.store.minimumDeliveryAmount = this.$store.getters['store/minimumDeliveryAmount'];
      this.store.phoneNumber = this.$store.getters['store/phoneNumber'];
    },
  },
  created() {
    this.getStoreInfo();
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