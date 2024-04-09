<script lang="ts">
export default {
  inject: {
    modalIsShowing: "modalShowState",
    closeModal: "closeModal",
  },
  computed: {
    isShowing() {
      return !!this.modalIsShowing
    }
  },
}
</script>

<style scoped lang="css"></style>

<template>
  <Teleport to="body">
    <div v-if="isShowing" class="modal">
      <p>Hello from the modal!</p>
      <button @click="">Close</button>
    </div>
  </Teleport>
</template>