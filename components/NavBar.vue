<script setup lang="ts">
import { computed } from "vue";

export interface INavLink {
  title: string, to: string
}

const defaultNavLinks: INavLink[] = [
  { title: "Software", to: "/dev" },
  { title: "Artwork", to: "/art" },
  { title: "Design", to: "/design" },
  { title: "Contact Me", to: "/contact" }
]

const props = defineProps<{ links?: INavLink[] }>()
const navLinks = computed(() => props.links || defaultNavLinks)
</script>

<style scoped lang="css">
nav {
  padding: var(--space-1);
  display: flex;
  gap: var(--space-1);
  justify-content: space-between;

  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}

nav ul {
  width: 100%;
  margin: 0;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  font-family: var(--font-space);
  font-size: var(--text-sm);
  letter-spacing: -5%;
  font-weight: light;

  list-style-type: none;
}

nav ul a {
  color: black;
  text-decoration: none;
  cursor: pointer;
}


nav ul a:hover {
  color: var(--purple);
}

nav img {
  cursor: pointer;
}

.active-link {
  color: var(--purple);
  text-decoration: underline;
}

.link-star {
  padding: 4px
}

@media only screen and (max-width: 600px) {
  nav ul {
    font-size: var(--text-xs);
  }
}
</style>

<template>
  <nav>
    <NuxtLink to="/">
      <img src="@/assets/images/logo.svg" alt="mak logo" />
    </NuxtLink>
    <ul>
      <li v-for="link in navLinks" :key="link.to">
        <NuxtLink :to="link.to" exact-active-class="active-link">{{ link.title }}</NuxtLink><span
          v-if="link.to != '/contact'" class="link-star">✶</span>
      </li>
    </ul>
  </nav>
</template>