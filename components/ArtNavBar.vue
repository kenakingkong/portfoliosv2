<script lang="ts">
import { IArtState } from '@/pages/art.vue';
import { ISocialLink } from '~/models/SocialLink';

export default {
  inject: {
    state: "artState",
    updateActiveCollection: "artUpdateCollection"
  },
  computed: {
    activeCollection() {
      return (this.state as IArtState).activeCollection
    },
    collections() {
      return (this.state as IArtState).collections as string[]
    },
    updateCollection() {
      return this.updateActiveCollection as any
    },
    socials() {
      return (this.state as IArtState).socials as ISocialLink[]
    }
  },
  methods: {
    isActive(collection: string) {
      return collection == this.activeCollection
    },
  }
}
</script>

<style scoped lang="css">
nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

ul {
  margin: 0;
  padding: var(--space-1);
  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;

  white-space: nowrap;

  list-style-type: none;
}

button,
a {
  border: none;
  background-color: transparent;

  font-family: var(--font-space);
  font-weight: bold;
  font-size: var(--text-sm);

  cursor: pointer;
  text-decoration: none;
}

button[data-active='true'] {
  color: var(--purple);
  text-decoration: underline;
}

button:hover {
  color: var(--magenta);
}
</style>

<template>
  <nav>
    <ul>
      <li v-for="collection in collections" :key="collection">
        <button :data-active="isActive(collection)" @click="updateCollection(collection)">{{ collection }}</button>
      </li>
    </ul>
    <ul>
      <li v-for="social in socials" :key="social.title">
        <a :href="social.url" target="_blank">🔗 {{ social.title }}</a>
      </li>
    </ul>
  </nav>
</template>