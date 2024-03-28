<script lang="ts">
import { IDesignSet } from '~/models';

export default {
  props: {
    set: { type: Object as () => IDesignSet, required: true }
  },
  data: () => ({
    activeFileIndex: 0
  }),
  emits: {
    onDownload(event: any, passcode: string) {
      const answer = prompt("Enter the password to download this zipfile!")
      if (answer != passcode) {
        event.preventDefault()
        event.stopPropogation()
      }
    }
  }
}
</script>

<style scoped lang="css">
ul {
  list-style-type: none;
  padding: 0;
}

img {
  width: 100%;
  max-width: 400px;
}

.card {
  display: flex;
  gap: var(--space-1);
}

.content {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

</style>

<template>
  <div class="card">
    <img :src="set.files[activeFileIndex].url" class="" />
    <div class="content">
      <h2>{{ set.title }}</h2>
      <a :href="set.zipfile.url" @click="$emit('onDownload', $event, set.zipfile.access_code)">
        Download Files
      </a>
      <ul>
        <li v-for="file in set.files" :key="file.name">{{ file.name }}</li>
      </ul>
    </div>
  </div>
</template>