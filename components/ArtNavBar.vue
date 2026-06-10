<script lang="ts">
import { IArtState, ICollection } from '@/pages/art.vue';

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
      return (this.state as IArtState).collections
    },
    updateCollection() {
      return this.updateActiveCollection as any
    }
  },
  methods: {
    isActive(collection: ICollection) {
      return collection.name == this.activeCollection
    },
  }
}
</script>

<style scoped lang="css">
.collection-container {
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: calc(var(--space-1)/2);

  white-space: nowrap;
  list-style-type: none;
}

.collection-item {
  border: none;
  background-color: transparent;

  font-family: var(--font-space);
  font-weight: lighter;
  font-size: var(--text-md);
  letter-spacing: -7%;
  text-transform: capitalize;
  text-decoration: none;

  cursor: pointer;
}

.collection-item[data-active='true'] {
  color: var(--purple);
  text-decoration: underline;
}

.collection-item:hover {
  color: var(--magenta);
}

@media screen and (max-width: 600px) {
  .collection-container {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .collection-item {
    font-size: var(--text-sm);
  }
}
</style>

<template>
  <nav>
    <ul class="collection-container">
      <li v-for="collection in collections" :key="collection.name" class="collection-item-container">
        <button :data-active="isActive(collection)" @click="updateCollection(collection.name)" class="collection-item">
          {{ collection.name }} ({{ collection.count }})
        </button>
      </li>
    </ul>
  </nav>
</template>