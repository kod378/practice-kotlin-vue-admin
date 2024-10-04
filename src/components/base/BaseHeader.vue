<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close-dialog="closeDialog">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Registering..." fixed @close-dialog="closeDialog">
      <base-spinner></base-spinner>
    </base-dialog>
    <header class="header">
      <div class="header-content">
        <div class="left-space">
          <!-- 영업 중 이동버튼 -->
          <button class="open-button" @click="goOrderView('OPEN')">
            OPEN
          </button>

          <!-- 영업 종료 이동버튼 -->
          <button class="close-button" @click="goOrderView('CLOSE')">
            CLOSE
          </button>

          <!-- 주문 기록 이동버튼 -->
          <button class="close-button" @click="goOrderHistory">
            HISTORY
          </button>
        </div>

        <div class="logo-container">
          <div class="logo" @click="replaceToMain">
            <button>메인으로</button>
          </div>
        </div>

        <div class="right-section">
          <div class="profile">
            <img class="profile-icon" :src="userProfile.iconUrl" alt="Profile Icon" />
            <span class="profile-name">{{ storeName() }}</span>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import {apiRequest} from "@/utils/api";

export default {
  inject: ['storeName'],
  data() {
    return {
      userProfile: {
        iconUrl: require('@/assets/profile-icon.png'), // 사용자 아이콘 URL
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    storeStatus() {
      return this.$store.getters['store/status'];
    },
  },
  methods: {
    async goOrderView(status) {
      console.log(this.storeStatus);
      console.log(status);
      if (this.storeStatus === status) {
        alert('이미 해당 상태입니다. 다른 상태로 변경해주세요.');
        return;
      } else if (status && this.storeStatus) {
        try {
          this.isLoading = true;
          const response = await apiRequest(`/api/store/${status.toLowerCase()}`, 'PUT');
          console.log(response.data);

          await this.$store.dispatch('store/setStatus', status);
          await this.afterChangeStatus(status);
        } catch (error) {
          const errorMessage = error.response?.data?.result?.message || "Failed to change store status";
          this.error = errorMessage;
          console.error(errorMessage);
        }
        this.isLoading = false;
      }
    },
    async afterChangeStatus(status) {
      if (status === 'OPEN') {
        alert('영업을 시작합니다.');
        await this.$router.push({name: 'order-view'});
      } else if (status === 'CLOSE') {
        alert('영업을 종료합니다.');
        await this.$router.push('/');
      }
    },
    closeDialog() {
      this.error = null;
      this.isLoading = false;
    },
    replaceToMain() {
      this.$router.replace('/');
    },
    goOrderHistory() {
      if (this.storeStatus === 'OPEN') {
        alert('영업 중에는 주문 기록을 확인할 수 없습니다.');
        return;
      }
      this.$router.push('/order-history'); // 주문 기록 페이지로 이동
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.left-space {
  display: flex;
  align-items: center;
  flex: 1;
}

.open-button,
.close-button {
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.open-button:hover,
.close-button:hover {
  background-color: #e55d00;
}

.logo-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  height: 40px;
}

.right-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
}

.profile {
  display: flex;
  align-items: center;
}

.profile-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-name {
  font-size: 16px;
  font-weight: 500;
}
</style>