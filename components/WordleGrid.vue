<script setup lang="ts">
import { WordleState } from "~/models";

const TOTAL_ROWS = 5;
const TOTAL_COLS = 5;

const { state } = defineProps<{ state: WordleState }>();

const rowsLeft = computed(() => {
  return TOTAL_ROWS - state.guesses.length - (state.currentGuess ? 1 : 0);
});
</script>

<style scoped lang="css">
.grid-container {
  display: flex;
  flex-direction: column;
  gap: calc(var(--space-1) / 2);
  font-family: var(--font-mono);
}

.grid-row {
  display: flex;
  gap: calc(var(--space-1) / 2);
}

.grid-box {
  width: var(--space-4);
  height: var(--space-4);
  border: 2px solid var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-lg);
}

.grid-box.correct {
  background-color: green;
  color: var(--white);
}

.grid-box.present {
  background-color: orange;
  color: var(--white);
}

.grid-box.absent {
  background-color: gray;
  color: var(--white);
}
</style>

<template>
  <div class="grid-container">
    <div v-for="(guess, index) in [...state.guesses]" :key="`guess-${index}`" class="grid-row">
      <div v-for="i in TOTAL_COLS" :key="`guess-${index}-col-${i}`"
        :class="['grid-box', guess.indexMap[i - 1]?.state || '']">
        {{ guess.indexMap[i - 1].key || '' }}
      </div>
    </div>
    <div v-if="state.currentGuess" class="grid-row">
      <div v-for="i in TOTAL_COLS" :key="`current-guess-col-${i}`" class="grid-box">
        {{ state.currentGuess[i - 1] || '' }}
      </div>
    </div>
    <div v-for="i in rowsLeft" :key="`empty-row-${i}`" class="grid-row">
      <div v-for="j in TOTAL_COLS" :key="`empty-col-${j}`" class="grid-box"></div>
    </div>
  </div>
</template>