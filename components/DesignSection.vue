<script lang="ts">
import { IDesignSet, IDesignZipfile } from '~/models';

export default {
  props: {
    set: { type: Object as () => IDesignSet, required: true }
  },
  data: () => ({
    activeFileIndex: 0
  }),
  methods: {
    onDownload(event: any, zipfile: IDesignZipfile) {
      const answer = prompt("Enter the password to download this zipfile!")
      if (answer == zipfile.access_code) {
        const anchorEl = document.createElement("a")
        anchorEl.setAttribute("href", zipfile.url.replace('assets.makenakong.com', 'd20vl58cxzmqvr.cloudfront.net'))
        anchorEl.setAttribute("target", "_blank")
        anchorEl.click()
        document.removeChild(anchorEl)
      }
    }
  },
}
</script>

<style scoped lang="css">
ul {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: var(--space-1) var(--space-2);
  overflow-x: scroll;

  display: flex;
  justify-content: start;
  gap: var(--space-4);

  list-style-type: none;
}

li {
  width: 100%;
  max-width: 500px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: var(--space-1);
}

h2 {
  font-size: var(--text-xl);
  font-weight: bold;
  min-width: 200px;
}

figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
}

img {
  height: auto;
  width: auto;
  max-width: 500px;
  max-height: 55vh;
  object-fit: contain;
}

p {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

button {
  cursor: pointer;
}
</style>

<template>
  <ul class="card">
    <li>
      <h2 class="card-title">{{ set.title }}</h2>
      <button :id="set.zipfile.name" @click="onDownload($event, set.zipfile)" class="card-zipfile">
        Download Files
      </button>
    </li>
    <li v-for="file in set.files" :key="file.name">
      <figure>
        <img :src="file.url.replace('assets.makenakong.com', 'd20vl58cxzmqvr.cloudfront.net')" loading="lazy" />
        <figcaption>{{ file.name }}</figcaption>
      </figure>
    </li>
  </ul>
</template>