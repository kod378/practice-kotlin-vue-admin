<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
      <div class="profile">
        <img class="profile-icon" :src="userProfile.iconUrl" alt="Profile Icon" />
        <span class="profile-name">{{ storeName() }}</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  inject: ['storeName'],
  data() {
    return {
      userProfile: {
        iconUrl: "@/assets/profile-icon.png", // 사용자 아이콘 URL
      },
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
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

.logo img {
  height: 40px;
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