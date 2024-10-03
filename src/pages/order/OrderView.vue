<template>
  <div>
    <base-header></base-header>
    <section>
      <!-- 주문 대기 중 애니메이션 -->
      <div class="waiting-animation">
        주문을 기다리는 중입니다<span class="dots">{{ animatedDots }}</span>
      </div>
    </section>
    <section>
      <!-- 주문 목록 -->
      <div v-for="(order, index) in orders" :key="index" class="order-container">
        <div class="order-header">
          <h3>주문 시간: {{ formatDate(order.userOrderResponse.orderedAt) }}</h3>
<!--          <p><strong>가게 ID:</strong> {{ order.userOrderResponse.storeId }}</p>-->
          <p><strong>주문 총액:</strong> {{ order.userOrderResponse.amount }}</p>
        </div>

        <!-- 메뉴 목록 -->
        <div class="menu-list">
          <h4>주문한 메뉴</h4>
          <ul>
            <li v-for="menu in order.userOrderMenuResponseList" :key="menu.menuId">
              {{ menu.name }} - {{ menu.quantity }}개 ({{ menu.amount }} 원)
            </li>
          </ul>
        </div>

        <!-- 주문 상태 -->
        <p><strong>상태:</strong> {{ getStatusDescription(order.userOrderResponse.status) }}</p>

        <!-- 수락 / 거절 버튼 -->
        <div class="action-buttons" v-if="order.userOrderResponse.status === 'ORDER'">
          <button @click="acceptOrder(order.userOrderResponse.id)">수락</button>
          <button @click="cancelOrder(order.userOrderResponse.id)">취소</button>
        </div>

        <!-- 조리시작 버튼 -->
        <div class="action-buttons" v-if="order.userOrderResponse.status === 'ACCEPT'">
          <button @click="startCooking(order.userOrderResponse.id)">조리시작</button>
        </div>

        <!-- 배달시작 버튼 -->
        <div class="action-buttons" v-if="order.userOrderResponse.status === 'COOKING'">
          <button @click="startDelivery(order.userOrderResponse.id)">배달시작</button>
        </div>

        <!-- 주문완료 버튼 -->
        <div class="action-buttons" v-if="order.userOrderResponse.status === 'DELIVERY'">
          <button @click="completeOrder(order.userOrderResponse.id)">주문완료</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {EventSourcePolyfill} from 'event-source-polyfill';
import {apiRequest} from "@/utils/api"; // EventSource Polyfill 라이브러리

export default {
  data() {
    return {
      orders: [], // 주문 데이터를 저장할 배열
      eventSource: null, // EventSource 객체를 저장할 변수
      statusDescriptions: {
        REGISTERED: '등록',
        UNREGISTERED: '해지',
        ORDER: '주문',
        ACCEPT: '확인',
        COOKING: '요리중',
        DELIVERY: '배달중',
        RECEIVE: '완료',
        CANCEL: '취소',
      },
      dotCount: 1, // 점의 개수 초기값
      intervalId: null, // setInterval 참조를 위한 변수
    };
  },
  computed: {
    // 점의 개수를 바탕으로 표시할 문자열
    animatedDots() {
      return '.'.repeat(this.dotCount);
    },
    storeStatus() {
      return this.$store.getters['store/status'];
    },
  },
  methods: {
    // 상태 설명 반환
    getStatusDescription(status) {
      return this.statusDescriptions[status] || status;
    },
    // SSE 연결
    connectSSE() {
      const token = this.$store.getters['accessToken']; // 토큰 가져오기
      const url = "http://localhost:8081/api/sse/connect"; // SSE 연결 주소

      this.eventSource = new EventSourcePolyfill(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      this.eventSource.onopen = event => {
        console.log("SSE 연결 성공");
        console.log(event);
      };

      this.eventSource.onmessage = event => {
        alert("주문 데이터 수신: " + event.data);
        console.log(event)
        console.log(event.name)
        const orderData = JSON.parse(event.data);
        console.log("주문 데이터 수신: ", orderData);

        // this.orders.push(orderData);
        // console.log("주문 데이터 수신: ", orderData);
      };

      this.eventSource.addEventListener('order', event => {
        const orderData = JSON.parse(event.data);
        console.log("주문 데이터 수신: ", orderData);
        this.orders.push(orderData);
      });

      this.eventSource.onerror = error => {
        console.log("SSE 연결 에러: ", error);
      };
    },
    getOrderById(orderId) {
      return this.orders.find(order => order.userOrderResponse.id === orderId);
    },
    // 주문 수락 처리
    acceptOrder(orderId) {
      try {
        const response = apiRequest(`/api/user-order/${orderId}/accept`, 'PUT');
        console.log(response);
        const order = this.getOrderById(orderId);
        order.userOrderResponse.status = 'ACCEPT'; // 수락 상태로 변경
      } catch (error) {
        console.error(error);
      }
    },
    // 주문 거절 처리
    cancelOrder(orderId) {
      try {
        const response = apiRequest(`/api/user-order/${orderId}/cancel`, 'PUT');
        console.log(response);
        const order = this.getOrderById(orderId);
        order.userOrderResponse.status = 'CANCEL'; // 취소 상태로 변경
      } catch (error) {
        console.error(error);
      }
    },
    // 조리 시작 처리
    startCooking(orderId) {
      try {
        const response = apiRequest(`/api/user-order/${orderId}/cooking`, 'PUT');
        console.log(response);
        const order = this.getOrderById(orderId);
        order.userOrderResponse.status = 'COOKING'; // 상태 변경
      } catch (error) {
        console.error(error);
      }
    },
    // 배달 시작 처리
    startDelivery(orderId) {
      try {
        const response = apiRequest(`/api/user-order/${orderId}/delivery`, 'PUT');
        console.log(response);
        const order = this.getOrderById(orderId);
        order.userOrderResponse.status = 'DELIVERY'; // 상태 변경
      } catch (error) {
        console.error(error);
      }
    },
    // 주문 완료 처리
    completeOrder(orderId) {
      try {
        const response = apiRequest(`/api/user-order/${orderId}/receive`, 'PUT');
        console.log(response);
        const order = this.getOrderById(orderId);
        order.userOrderResponse.status = 'RECEIVE'; // 상태 변경
      } catch (error) {
        console.error(error);
      }
    },
    // 날짜 포맷팅
    formatDate(value) {
      if (!value) return '';
      const date = new Date(value);
      return date.toLocaleString(); // 날짜 형식 포맷팅
    },
    // SSE 연결 해제
    disconnectSSE() {
      console.log("SSE 연결 해제");
      if (this.eventSource) {
        this.eventSource.close();
      }
    }
  },
  watch: {
    async storeStatus(newStatus) {
      if (newStatus === 'CLOSE') {
        await this.disconnectSSE();
        await this.$router.push('/');
      }
    }
  },
  beforeMount() {
    if (this.storeStatus === 'OPEN') {
      this.connectSSE();
    }
  },
  mounted() {
    // 애니메이션 실행: 1개에서 3개까지 점을 반복
    this.intervalId = setInterval(() => {
      this.dotCount = this.dotCount === 3 ? 1 : this.dotCount + 1;
    }, 500); // 0.5초 간격으로 점의 개수를 변경
  },
  beforeUnmount() {
    // 컴포넌트가 파괴될 때 interval을 제거
    clearInterval(this.intervalId);
    //영업 종료 처리(?)

  }
}
</script>

<style scoped>
.order-container {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
}

.order-header {
  font-weight: bold;
  margin-bottom: 10px;
}

.menu-list ul {
  list-style-type: none;
  padding: 0;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.waiting-animation {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

.dots {
  font-size: 18px;
}
</style>