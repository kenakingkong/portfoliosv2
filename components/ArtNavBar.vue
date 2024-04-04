<script lang="ts">
import { IArtState } from '@/pages/art.vue';

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
ul {
  position: fixed;
  bottom: 0;
  left: 0;

  margin: 0;
  padding: var(--space-1);
  background-color: rgba(255,255,255,0.8);

  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;

  white-space: no-wrap;

  list-style-type: none;
}

button {
  border: none;
  background-color: transparent;

  font-family: var(--font-space);
  font-weight: bold;
  font-size: var(--text-sm);

  cursor: pointer;
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
  </nav>
</template>