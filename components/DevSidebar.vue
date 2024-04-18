<script lang="ts">
import { ISection } from '~/pages/dev.vue';

export default {
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
@media only screen and (max-width: 880px) {
  aside {
    display: none;
  }
}

@media only screen and (min-width: 880px) {
  aside {
    position: fixed;
    top: 20%;
    bottom: 0;
    padding: var(--space-1);
    width: 12rem;
  }
}

ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  list-style-type: none;
  padding: 0
}

#resume {
  display: block;
  padding-top: var(--space-2);
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
      <NuxtLink id="resume" to="http://assets.makenakong.com/resumes/makena_kong_resume_july_2023.pdf" target="_blank">
        resume</NuxtLink>
    </nav>
  </aside>
</template>