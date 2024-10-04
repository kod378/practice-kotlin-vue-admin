<template>
  <h1>ADMIN PAGE</h1>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  computed: {
    storeName() {
      return this.hasStore ? this.$store.getters['store/name'] : '';
    },
    hasStore() {
      return this.$store.getters['store/id'] !== null;
    },
  },
  provide() {
    return {
      hasStore: () => this.hasStore,
      storeName: () => this.storeName,
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
