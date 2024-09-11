<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close-dialog="closeDialog">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Registering..." fixed @close-dialog="closeDialog">
      <base-spinner></base-spinner>
    </base-dialog>
    <h2>Register</h2>
    <p v-if="isLoggedIn">현재 로그인 상태 입니다.</p>
    <p v-else>로그인 또는 회원가입을 해주세요.</p>
    <form @submit.prevent="register">
      <input type="text" v-model="email" placeholder="email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      error: null
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    async register() {
      this.isLoading = true;

      try {
        await this.$store.dispatch('register', {
          email: this.email,
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
    },
  },
  created() {
    // 이미 로그인 되어있는 경우 메인 페이지로 이동합니다.
    if (this.isLoggedIn) {
      this.$router.push('/');
    }
  }
};
</script>