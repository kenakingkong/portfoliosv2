<script setup lang="ts">
const props = defineProps<{ term: string }>();
const { state, handleKeyPress, resetState } = useWordle(props.term);
</script>

<style scoped lang="css">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>

<template>
  <p>{{ props.term }}</p>
  <div class="container">
    <WordleGrid :state="state" />
    <WordleKeyboard :state="state" :onClick="handleKeyPress" />
  </div>
</template>