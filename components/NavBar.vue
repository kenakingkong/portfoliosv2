<script setup lang="ts">
import { computed } from "vue";

export interface INavLink {
  title: string, to: string
}

const defaultNavLinks: INavLink[] = [
  { title: "dev", to: "/dev" },
  { title: "art", to: "/art" },
  { title: "design", to: "/design" },
  { title: "contact me", to: "/contact" }
]

const props = defineProps<{ links?: INavLink[] }>()
const navLinks = computed(() => props.links || defaultNavLinks)
</script>

<style scoped lang="css">
nav {
  padding: var(--space-1);
  display: flex;
  gap: var(--space-2);
  justify-content: space-between;

  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}

nav ul {
  width: 100%;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-1);

  font-family: var(--font-sans);
  font-weight: bold;

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

.active-link {
  color: var(--purple)
}
</style>

<template>
  <nav>
    <NuxtLink to="/">
      <img src="@/assets/images/logo.svg" />
    </NuxtLink>
    <ul>
      <li v-for="link in navLinks" :key="link.to">
        <NuxtLink :to="link.to" exact-active-class="active-link">{{ link.title }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>