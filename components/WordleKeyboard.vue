<script setup lang="ts">
const { state } = defineProps<{
  state: {
    keyStateMap: Record<string, string>;
  }
}>();

const emit = defineEmits<{
  (e: 'click', key: string): void;
}>();

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Backspace'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter']
];
</script>

<style scoped lang="css">
.keyboard-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: var(--font-mono);
}

.keyboard-row {
  display: flex;
  gap: 0.25rem;
  justify-content: center;
}

.key {
  width: 2.5rem;
  height: 3rem;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.key.correct {
  background-color: green;
  color: white;
}

.key.present {
  background-color: orange;
  color: white;
}

.key.absent {
  background-color: gray;
  color: white;
}

.key:hover {
  background-color: #eee;
}
</style>

<template>
  <div class="keyboard-container">
    <div v-for="(row, index) in KEYBOARD_ROWS" :key="index" class="keyboard-row">
      <button v-for="key in row" :key="key" :class="['key', state.keyStateMap[key] || '']"
        @click="() => $emit('click', key)">
        {{ key }}
      </button>
    </div>
  </div>
</template>