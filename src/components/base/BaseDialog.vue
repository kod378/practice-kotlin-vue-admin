<template>
  <div v-if="show" class="dialog-overlay">
    <div class="dialog-content">
      <div class="dialog-header">
        <h3>{{ title }}</h3>
        <button class="close-button" @click="closeDialog">✖</button>
      </div>
      <div class="dialog-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },
  },
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 300px;
  max-width: 90%;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.dialog-body {
  padding: 10px 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
</style>