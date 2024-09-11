<template>
  <div>
    <base-dialog :show="!!isTokenExpiredMessage" title="Login session is expired" @close-dialog="closeDialog">
      <p>세션이 만료되어 로그인 화면으로 이동되었습니다.</p>
    </base-dialog>
    <base-dialog :show="!!error" title="An error occurred" @close-dialog="closeDialog">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Registering..." fixed @close-dialog="closeDialog">
      <base-spinner></base-spinner>
    </base-dialog>
    <h2>Login</h2>
    <p v-if="isLoggedIn">현재 로그인 상태 입니다.</p>
    <p v-else>로그인 또는 회원가입을 해주세요.</p>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <button type="button" @click="$router.push('/register')">Go Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      error: null,
      isTokenExpiredMessage: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    async login() {
      // 서버로 로그인 요청을 보냅니다.
      this.isLoading = true;

      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password,
        });

        const accessToken = this.$store.getters.accessToken;
        if (accessToken) {
          this.$store.dispatch('setIsLoggedIn', true);
          await this.$router.push('/');
        }
      } catch (error) {
        this.error = error.message || 'Fail to register, please try again.';
      }
      this.isLoading = false;
    },
    closeDialog() {
      this.error = null;
      this.isLoading = false;
      this.isTokenExpiredMessage = false;
    },
  },
  created() {
    // 이미 로그인 되어있는 경우 메인 페이지로 이동합니다.
    if (this.isLoggedIn) {
      this.$router.push('/');
    }
    // URL query에서 "message" 파라미터 확인
    if (this.$route.query.message === 'refresh-token-expired') {
      this.isTokenExpiredMessage = true;
    }
  }
}
</script>