<script setup lang="ts">
import { computed } from "vue";

export interface INavLink {
  title: string, to: string
}

const defaultNavLinks: INavLink[] = [
  { title: "dev", to: "/dev" },
  { title: "art", to: "/art" },
  { title: "design", to: "/design" }
]

const props = defineProps<{ links?: INavLink[] }>()
const navLinks = computed(() => props.links || defaultNavLinks)
</script>

<style lang="css" scoped>
nav {
  padding: var(--space-1);
  display: flex;
  gap: var(--space-2);
  justify-content: space-between;
  font-family: var(--font-sans);
}

nav ul {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-1);
  width: 100%;
  font-weight: 600;
  margin: 0;
  list-style-type: none;
}

nav ul a {
  color: black;
  text-decoration: none;
  cursor: pointer;
}


nav ul a:hover {
  color: var(--magenta);
}

nav img {
  cursor: pointer;
}
</style>

<template>
  <nav>
    <NuxtLink to="/">
      <img src="@/assets/images/logo.svg" />
    </NuxtLink>
    <ul>
      <li v-for="link in navLinks">
        <NuxtLink :to="link.to">{{ link.title }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>