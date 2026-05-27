<script setup lang="ts">
const props = defineProps<{ term: string }>();

export interface KeyGuess {
  key: string;
  state: string // 'correct' | 'present' | 'absent';
}

export interface Guess {
  word: string;
  indexMap: KeyGuess[];
}

export interface KeyStateMap {
  [key: string]: string // 'correct' | 'present' | 'absent';
}

export interface WordleState {
  term: string;
  guesses: Guess[];
  currentGuess: string;
  keyStateMap: KeyStateMap;
}

const state = reactive<WordleState>({
  term: props.term,
  guesses: [],
  currentGuess: '',
  keyStateMap: {},
});

// validate keys per guess and return an index map for the guess
const createIndexMap = (guessWord: string) => {
  return guessWord.split('').map((key, index) => ({
    key,
    state: key === state.term[index] ? 'correct' : (state.term.includes(key) ? 'present' : 'absent'),
  }));
};

const updateKeyStateMap = (state: WordleState) => {
  const validKeys = [...new Set(state.term.split(''))];
  const guessedKeys = new Set(state.currentGuess.split(''));

  guessedKeys.forEach(key => {
    const isCorrect = state.term.split('').some((termKey, index) => termKey === key && state.currentGuess[index] === key);

    state.keyStateMap[key] = isCorrect ? 'correct' : validKeys.includes(key) ? 'present' : 'absent';
  });

  return state.keyStateMap;
}

const resetState = () => {
  state.guesses = [];
  state.currentGuess = '';
  state.keyStateMap = {};
};

const handleKeyDown = (e: KeyboardEvent) => handleKeyPress(e.key.toUpperCase());

onMounted(() => window.addEventListener('keydown', handleKeyDown));
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));

const handleKeyPress = (key: string) => {
  console.log('Key pressed:', key);

  if (key === 'Enter') {
    if (state.currentGuess.length === 5) {
      state.guesses.push({
        word: state.currentGuess,
        indexMap: createIndexMap(state.currentGuess),
      });
      state.keyStateMap = updateKeyStateMap(state);
      state.currentGuess = '';

      console.log(state.keyStateMap)
    }
  } else if (key === 'Backspace') {
    state.currentGuess = state.currentGuess.slice(0, -1);
  } else if (/^[A-Z]$/.test(key) && state.currentGuess.length < 5) {
    state.currentGuess += key;
  }
};
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