<template>
  <img alt="Vue logo" src="@/assets/logo.png">
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      hasStoreName: localStorage.getItem('storeName') !== null && localStorage.getItem('storeName') !== 'null',
    }
  },
  computed: {
    storeName() {
      if (this.hasStoreName) {
        return localStorage.getItem('storeName');
      } else {
        return '';
      }
    }
  },
  provide() {
    return {
      hasStoreName: this.hasStoreName,
      storeName: this.storeName,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
