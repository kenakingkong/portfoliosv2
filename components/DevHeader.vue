<script lang="ts">
export default {
  inject: {
    state: "devState"
  },
  computed: {
    items() {
      return (this.state as any).devSocials
    }
  }
}
</script>

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
}
</style>

<template>
  <section id="about">
    <h1>makena kong</h1>
  </section>
  <section>
    <h2>about me</h2>
    <p>
      I’m a full-stack engineer that leans towards the front end and a good eye for UI/UX
      design.
      I’m a quick prototyper and iterate fast.
    </p>
    <ul>
      <li v-for="item in items" :key="item.title">
        <a :href="item.url" target="_blank" ref="noopener noreferrer">{{ item.icon }}</a>
      </li>
      <li>san francisco, ca</li>
    </ul>
  </section>
</template>