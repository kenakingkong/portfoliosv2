<script setup lang="ts">
import { ref, nextTick } from 'vue'
const showSummary = ref(false)
const showSources = ref(false)
const showPlaceholder = ref(true)
const bodyRef = ref<HTMLElement | null>(null)

const { start } = useTypingAnimation()

function startTyping() {
  showSummary.value = true

  setTimeout(async () => {
    showPlaceholder.value = false
    await nextTick()

    if (bodyRef.value) await start(bodyRef.value)
  }, 1000)
}
</script>

<style scoped lang="css">
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40rem;
}

.summarize-button {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: bold;
  background-color: var(--white);
  color: var(--purple);
  border: 1px solid var(--purple);
  border-radius: calc(var(--space-1) / 2);
  padding: calc(var(--space-1) / 2) var(--space-1);
  cursor: pointer;
  width: max-content;
}

.summary {
  background-color: var(--white);
  padding: calc(var(--space-1) * 1.25);
  border: 1px solid lightgray;
  border-radius: calc(var(--space-1) / 2);
  transition: height 0.3s ease;
}

.title {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: bold;
}

.body,
.body-placeholder {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
}

.highlight {
  font-weight: bold;
  display: inline-block;
  padding: 0 0.25em;
  color: var(--white);
  background: linear-gradient(to right, var(--magenta), var(--magenta)) no-repeat left center;
  background-size: 0% 100%;
  transition: background-size 0.4s ease;
}

.sources-button {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: calc(var(--space-1) / 2);
}

.disclaimer {
  font-size: var(--text-xxs);
  color: gray;
  margin-top: var(--space-1);
}

ul {
  padding: 0;
  padding-left: var(--space-1);
}
</style>

<template>
  <div class="container">
    <button v-if="!showSummary" @click="startTyping" class="summarize-button">
      ✦ Summarize with AI*
    </button>
    <div v-if="showSummary" class="summary">
      <h2 class="title">✦ Summary</h2>
      <div v-if="showPlaceholder" class="body-placeholder">
        <p>Generating Summary...</p>
      </div>
      <div v-else ref="bodyRef" class="body">
        <p>
          Makena Kong is a <span class="highlight" data-bg-reveal>full stack software engineer</span> who spent <span
            class="highlight" data-bg-reveal>5
            years owning products</span> E2E and speed-running mvps at a small
          fintech startup.
        </p>
        <p>
          On the side, she has built websites and set up workspaces for small businesses, including her <a
            href="https://gw2dental.com" target="_blank" rel="noopener noreferrer">
            family dentist
          </a>.
        </p>
        <p>
          She volunteers at non-profits like <a href="https://codenation.org" target="_blank"
            rel="noopener noreferrer">CodeNation</a> and <a href="https://missionbit.org" target="_blank"
            rel="noopener noreferrer">MissionBit</a> that teach coding and technical literacy in
          under-resourced schools in the Bay Area. AI is the future, <i>but so are kids!</i>
        </p>
        <p class="disclaimer">
          Responses can be inaccurate. We recommend you check important facts.
        </p>
        <button class="sources-button" @click="showSources = !showSources">
          Sources (2)
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.99854 7.00153L12.0006 17.0027L21.0027 7.00153" stroke="black" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <ul v-if="showSources">
          <li>
            <a href="#about">
              Personal portfolio
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/makenakong" target="_blank" rel="noopener noreferrer">
              LinkedIn profile
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>