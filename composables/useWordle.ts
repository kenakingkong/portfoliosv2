import { WordleState } from "~/models";

export function useWordle(term: string) {
  const state = reactive<WordleState>({
    term: term,
    guesses: [],
    currentGuess: "",
    keyStateMap: {},
  });

  // validate keys per guess and return an index map for the guess
  const createIndexMap = (guessWord: string) => {
    return guessWord.split("").map((key, index) => ({
      key,
      state:
        key === state.term[index]
          ? "correct"
          : state.term.includes(key)
            ? "present"
            : "absent",
    }));
  };

  const updateKeyStateMap = (state: WordleState) => {
    const validKeys = [...new Set(state.term.split(""))];
    const guessedKeys = new Set(state.currentGuess.split(""));

    guessedKeys.forEach((key) => {
      const isCorrect = state.term
        .split("")
        .some(
          (termKey, index) =>
            termKey === key && state.currentGuess[index] === key,
        );

      state.keyStateMap[key] = isCorrect
        ? "correct"
        : validKeys.includes(key)
          ? "present"
          : "absent";
    });

    return state.keyStateMap;
  };

  const resetState = () => {
    state.guesses = [];
    state.currentGuess = "";
    state.keyStateMap = {};
  };

  const handleKeyPress = (key: string) => {
    console.log("Key pressed:", key);

    if (key === "Enter" || key === "ENTER") {
      if (state.currentGuess.length === 5) {
        state.guesses.push({
          word: state.currentGuess,
          indexMap: createIndexMap(state.currentGuess),
        });
        state.keyStateMap = updateKeyStateMap(state);

        console.log("Entered...");
        console.log(state.guesses);
        console.log(state.currentGuess);
        console.log(state.keyStateMap);

        state.currentGuess = "";
      }
    } else if (key === "Backspace" || key === "BACKSPACE") {
      state.currentGuess = state.currentGuess.slice(0, -1);
    } else if (/^[A-Z]$/.test(key) && state.currentGuess.length < 5) {
      state.currentGuess += key;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) =>
    handleKeyPress(e.key.toUpperCase());

  onMounted(() => window.addEventListener("keydown", handleKeyDown));
  onUnmounted(() => window.removeEventListener("keydown", handleKeyDown));

  return {
    handleKeyPress,
    resetState,
    state,
  }
}
