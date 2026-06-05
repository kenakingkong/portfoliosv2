<script setup lang="ts">
import { IArtItem } from '~/models';

const { artItems } = defineProps<{ artItems: IArtItem[] }>()
</script>

<style scoped lang="css">
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1)
}

.gallery-item {
  object-fit: cover;
}

li {
  list-style-type: none;
}
</style>

<template>
  <ul class="gallery">
    <li v-for="item in artItems">
      <img :id="item.title" :src="item.url.replace('assets.makenakong.com', 'd20vl58cxzmqvr.cloudfront.net')"
        :aria-label="item.title" loading="lazy" height="300" width="300" class="gallery-item animate-fade-in" />
    </li>
  </ul>
</template>