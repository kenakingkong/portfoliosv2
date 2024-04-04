<script lang="ts">
import { IArtItem } from '~/models';
import { IArtState } from '~/pages/art.vue';

function shuffleArray(array: IArtItem[]) {
  return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export default {
  inject: {
    state: "artState"
  },
  computed: {
    items() {
      const { activeCollection, items } = this.state as IArtState
      if (activeCollection != "all") {
        return shuffleArray(items.filter((item: IArtItem) => item.collection == activeCollection))
      }
      return shuffleArray(items)
    }
  }
}
</script>

<style lang="css">
img {
  width: 100%;
  height: 100%;
  max-height: 200px;
  max-width: 200px;
  object-fit: contain;
}
</style>

<template>
  <template v-for="item in items" :key="item.title">
    <img :src="item.url" />
  </template>
</template>