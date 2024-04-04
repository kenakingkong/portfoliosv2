<script lang="ts">
import { ISection } from '~/pages/dev.vue';

export default {
  setup() {
    const runtimeConfig = useRuntimeConfig()
    return { token: runtimeConfig.public.FIREBASE_STORAGE_TOKEN }
  },
  inject: {
    sections: "devSections"
  },
  computed: {
    items() {
      return this.sections as ISection[]
    },
  },
}
</script>

<style scoped lang="css">
aside {
  position: fixed;
  top: 20%;
  padding: var(--space-1);
  width: 12rem;
}

nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  list-style-type: none;
  padding: 0
}
</style>

<template>
  <aside>
    <nav>
      <ul>
        <li>
          <NuxtLink to="#about">about me</NuxtLink>
        </li>
        <li v-for="item in items" :key="item.stateProperty">
          <NuxtLink :to="{ path: '/dev', hash: `#${item.id}` }">{{ item.header }}</NuxtLink>
        </li>
      </ul>
      <a href="/assets/files/makena_kong_resume_july_2023.pdf" download>resume</a>
    </nav>
  </aside>
</template>