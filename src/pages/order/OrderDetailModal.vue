<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <button class="close-button" @click="$emit('close')">X</button>
      <p>주문 번호: {{ order.userOrderResponse.orderNumber }}</p>
      <p>주문 시간: {{ formatDate(order.userOrderResponse.orderedAt) }}</p>

      <div class="menu-list">
        <div v-for="menu in order.userOrderMenuResponseList" :key="menu.id" class="menu-item">
          <p>{{ menu.name }} - {{ menuTotal(menu) }}원 ({{ menu.quantity }}개)</p>
        </div>
        <hr />
        <p>배달비: {{ deliveryFee }}원</p>
        <hr />
        <p>총 금액: {{ order.userOrderResponse.amount }}원</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    menuTotal(menu) {
      return menu.amount * menu.quantity;
    },
  },
  computed: {
    deliveryFee() {
      return this.$store.getters['store/minimumDeliveryAmount'];
    },
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  position: relative;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
.menu-list {
  margin-top: 20px;
}
.menu-item {
  margin-bottom: 10px;
}
</style>