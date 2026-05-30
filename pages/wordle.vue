<script>
import Wordle from '~/components/Wordle.vue';

const SLANG_TERMS = [
  { "term": "GUCCI", "meaning": "Everything's good or fine" },
  { "term": "VALID", "meaning": "Approved or on point" },
  { "term": "EXTRA", "meaning": "Overdramatic or too much" },
  { "term": "BASIC", "meaning": "Mainstream or unoriginal" },
  { "term": "TOXIC", "meaning": "Harmful or problematic" },
  { "term": "SQUAD", "meaning": "Your close friend group" },
  { "term": "RATIO", "meaning": "When replies outnumber likes, meaning you took an L" },
  { "term": "CLOUT", "meaning": "Social influence or fame" },
  { "term": "SHOOK", "meaning": "Shocked or surprised" },
  { "term": "SALTY", "meaning": "Bitter or upset about something" },
  { "term": "CHILE", "meaning": "Expression of exasperation" },
  { "term": "MOODY", "meaning": "Withdrawn or in a bad mood" },
  { "term": "YIKES", "meaning": "Expression of secondhand embarrassment" },
  { "term": "PRESS", "meaning": "Being bothered or upset about something" },
  { "term": "VIBES", "meaning": "The feeling or atmosphere of a situation" },
  { "term": "RIZZY", "meaning": "Having charm or natural charisma" },
  { "term": "WIRED", "meaning": "Hyper or overstimulated" },
  { "term": "SUSSY", "meaning": "Suspicious, derived from 'sus'" },
  { "term": "SLAPS", "meaning": "Something that hits hard, usually music" }
]

const CORP_TERMS = [
  { "term": "ALIGN", "meaning": "To get everyone on the same page or in agreement" },
  { "term": "PIVOT", "meaning": "To shift strategy or direction" },
  { "term": "SCOPE", "meaning": "The range or boundaries of a project" },
  { "term": "SYNCS", "meaning": "Quick check-in meetings to stay updated" },
  { "term": "AGILE", "meaning": "A flexible, iterative approach to work" },
  { "term": "TABLE", "meaning": "To postpone or set aside a topic for later" },
  { "term": "TRACK", "meaning": "To monitor progress on a task or goal" },
  { "term": "LOOPS", "meaning": "To keep someone informed, as in 'loop me in'" },
  { "term": "OWNED", "meaning": "To take full responsibility for a task or outcome" },
  { "term": "DRIVE", "meaning": "To lead or push forward an initiative" },
  { "term": "GAINS", "meaning": "Benefits or improvements achieved" },
  { "term": "LEADS", "meaning": "Potential customers or business opportunities" },
  { "term": "SCALЕ", "meaning": "To grow or expand an operation" },
  { "term": "TOUCH", "meaning": "As in 'touch base' — to briefly check in" },
  { "term": "FLESH", "meaning": "As in 'flesh out' — to develop an idea further" },
  { "term": "PARSE", "meaning": "To break down and analyze information carefully" },
  { "term": "DRILL", "meaning": "As in 'drill down' — to examine details closely" },
  { "term": "BLOOM", "meaning": "To grow or develop, often used in talent contexts" },
  { "term": "GOALS", "meaning": "Targets or objectives set for a team or individual" },
  { "term": "RECAP", "meaning": "A summary of what was discussed or decided" }
]
</script>

<style scoped lang="css">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-4);
}

.title {
  font-size: var(--text-md);
  font-weight: bold;
  font-family: var(--font-mono);
}
</style>

<template>
  <div class="container">
    <h1 class="title">Guess the Gen-Z term</h1>
    <Wordle term="SLANG" />
    <button>Reset</button>
  </div>
</template>