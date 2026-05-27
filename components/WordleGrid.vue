<script setup lang="ts">
import type { Guess, KeyStateMap } from './Wordle.vue';

const { state } = defineProps<{
  state: {
    term: string;
    guesses: Guess[];
    currentGuess: string;
    keyStateMap: KeyStateMap;
  }
}>();

const currentGuessMap = computed(() => {
  const map: Record<number, string> = {};

  state.currentGuess.split('').forEach((key, index) => {
    map[index] = key;
  });
  return map;
});

const rowsLeft = computed(() => {
  return 6 - state.guesses.length - (state.currentGuess ? 1 : 0);
});

</script>

<style scoped lang="css">
.grid-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: var(--font-mono);
}

.grid-row {
  display: flex;
  gap: 0.25rem;
}

.grid-box {
  width: 3rem;
  height: 3rem;
  border: 2px solid black;
}

.grid-box.correct {
  background-color: green;
  color: white;
}

.grid-box.present {
  background-color: orange;
  color: white;
}

.grid-box.absent {
  background-color: gray;
  color: white;
}
</style>

<template>
  <div class="grid-container">
    <div v-for="guess in [...state.guesses]" :key="guess.word" class="grid-row">
      <div v-for="i in 5" :key="i" :class="['grid-box', state.keyStateMap[guess.word[i - 1] || ''] || '']">
        {{ guess.word[i - 1] || '' }}
      </div>
    </div>
    <div v-if="state.currentGuess" class="grid-row">
      <div v-for="i in 5" :key="i" class="grid-box">
        {{ currentGuessMap[i - 1] || '' }}
      </div>
    </div>
    <div v-for="i in rowsLeft" :key="i" class="grid-row">
      <div v-for="j in 5" :key="j" class="grid-box"></div>
    </div>
  </div>
</template>