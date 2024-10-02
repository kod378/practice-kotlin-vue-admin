1<template>
  <div>
    <base-header></base-header>
    <section>
      <div class="order-history">
        <!-- 주문 내역이 있을 때만 카드 출력 -->
        <div v-if="orders.length > 0">
          <div v-for="order in orders" :key="order.userOrderResponse.id" class="order-card">
            <!-- 이미지와 가게 정보는 가로로 정렬 -->
            <div class="store-info">
              <!-- 주문번호와 주문 시간 (이미지 오른쪽에 출력) -->
              <div class="store-details">
                <h3>{{ order.userOrderResponse.orderNumber }}</h3>
                <p>주문 시간: {{ formatDate(order.userOrderResponse.orderedAt) }}</p>
                <p>상태 : {{ getStatus(order.userOrderResponse.status) }}</p>
              </div>
            </div>

            <!-- 주문 메뉴 리스트 (이미지와 가게 정보 아래에 배치) -->
            <div class="order-menu" @click="openModal(order)">
              <p>{{ order.userOrderMenuResponseList[0].name }} 외 {{ order.userOrderMenuResponseList.length - 1 }}개</p>
              <p>{{ order.userOrderResponse.amount }}원</p>
            </div>
          </div>
        </div>

        <!-- 주문 내역이 없을 때 출력할 메시지 -->
        <div v-else class="no-orders">
          <p>내역이 없습니다.</p>
        </div>

        <!-- 모달 창 컴포넌트 -->
        <OrderDetailModal
            v-if="selectedOrder"
            :order="selectedOrder"
            @close="selectedOrder = null"
        />
      </div>
    </section>
  </div>
</template>

<script>
import OrderDetailModal from './OrderDetailModal.vue'
import {apiRequest} from "@/utils/api";

export default {
  components: { OrderDetailModal },
  data() {
    return {
      orders: [], // API 응답으로 받은 주문 데이터를 여기에 저장할 거야.
      selectedOrder: null, // 모달을 열 때 선택한 주문을 저장하는 변수야.
    };
  },
  methods: {
    formatDate(date) {
      // LocalDateTime을 읽기 쉬운 형식으로 변환하는 함수
      return new Date(date).toLocaleString();
    },
    openModal(order) {
      this.selectedOrder = order;
    },
    async getOrders() {
      const response = await apiRequest(`/api/user-order/history`);
      console.log(response);
      this.orders = response.data.body;
    },
    getStatus(status) {
      switch (status) {
        case 'RECEIVE':
          return '완료';
        case 'CANCEL':
          return '취소';
        default:
          return '알 수 없음';
      }
    }
  },
  created() {
    this.getOrders();
  }
};
</script>

<style scoped>
.order-history {
  display: flex;
  flex-direction: column;
}

.order-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px 0;
  display: flex;
  flex-direction: column; /* 세로로 요소를 쌓기 */
}

/* 이미지와 가게 정보를 가로로 정렬 */
.store-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* 이미지와 메뉴 사이의 간격 */
}

.store-thumbnail {
  width: 160px; /* 이미지 크기 */
  height: 160px; /* 이미지 높이 */
  margin-right: 20px; /* 이미지와 텍스트 간 간격 */
}

.store-details {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 텍스트를 수직 가운데 정렬 */
}

.order-menu {
  cursor: pointer;
  padding-top: 10px;
  border-top: 1px solid #ddd; /* 상단에 구분선 */
  margin-top: 10px; /* 구분선 위로 간격 */
}

.no-orders {
  text-align: center;
  color: #888;
  margin-top: 20px;
  font-size: 18px;
}
</style>