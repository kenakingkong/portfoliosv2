<script lang="ts">
import type { IDevState } from '~/pages/dev.vue';

export default {
  inject: {
    state: "devState"
  },
  computed: {
    items() {
      return (this.state as IDevState).devSocials
    }
  }
}
</script>

<template>
  <section id="about">
    <h1>Makena Kong</h1>
  </section>
  <section>
    <h2>About Me</h2>
    <p>
      I'm a Fullstack Engineer with strong product and design instincts. I think in systems, prototype fast, and care
      as much about why we're building something as how.
    </p>
    <ul>
      <li v-for="item in items" :key="item.title">
        <NuxtLink :to="item.url" target="_blank">{{ item.icon }}</NuxtLink>
      </li>
      <li>San Francisco, CA</li>
    </ul>
  </section>
</template>

<style scoped lang="css">
section {
  width: 100%;
  max-width: 40rem;
}

h1 {
  font-size: var(--text-xl);
}

ul {
  display: flex;
  gap: var(--space-1);
  list-style-type: none;
  padding: 0
}

li {
  font-size: var(--text-xs);
  text-transform: capitalize;
}
</style>