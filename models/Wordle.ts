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