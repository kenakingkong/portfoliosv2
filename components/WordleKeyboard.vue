<script setup lang="ts">
import { WordleState } from '~/models';

const { state } = defineProps<{ state: WordleState }>();

const emit = defineEmits<{ (e: 'click', key: string): void }>();

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
  gap: calc(var(--space-1) / 4);
  font-family: var(--font-mono);
}

.keyboard-row {
  display: flex;
  gap: calc(var(--space-1) / 4);
  justify-content: center;
}

.key {
  width: var(--space-2);
  height: var(--space-2);
  border: 1px solid black;
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
    <div v-for="(row, index) in KEYBOARD_ROWS" :key="`keyboard-row-${index}`" class="keyboard-row">
      <button v-for="key in row" :key="`keyboard-key-${key}`" :class="['key', state.keyStateMap[key] || '']"
        @click="() => $emit('click', key)">
        {{ key == "Backspace" ? '⌫' : key == "Enter" ? '⏎' : key }}
      </button>
    </div>
  </div>
</template>