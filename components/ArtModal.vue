<script lang="ts">
export default {
  setup() {
    const modalIsShowing = inject('modalShowState')
    const closeModal = inject<() => void>('closeModal')
    const isShowing = computed(() => !!modalIsShowing)
    
    return { isShowing, closeModal }
  },
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isShowing" class="modal">
      <p>Hello from the modal!</p>
      <button @click="closeModal">Close</button>
    </div>
  </Teleport>
</template>

<style scoped lang="css"></style>