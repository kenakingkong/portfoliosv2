<script setup lang="ts">
import { IDesignSet } from "@/models"
import { useMyHead } from "~/composables"

useMyHead("design")

const { data: sets } = await useFetch<IDesignSet[]>('/api/design')
</script>

<style scoped lang="css">
main {
  width: 100%;
  font-family: var(--font-space);
  background-color: chartreuse;
}

.hero-section {
  width: 100vw;
  height: 100vh;
}

.file-section {
  width: 100vw;
  height: 75vh;

  border-style: solid;
  border-color: black;
  border-width: 2px 0 0 0;
}

.footer-section {
  padding: var(--space-2);

  display: flex;
  flex-direction: column;
  justify-content: center;

  font-size: var(--text-lg);
}
</style>

<template>
  <GoogleTagManagerNoScript />
  <main>
    <NavBar />
    <div class="container">
      <div class="hero-section">
        <DesignAnimation />
      </div>
      <div class="file-section" v-for="set in sets" :key="set.title">
        <DesignSection :set="set" />
      </div>
      <div class="file-section footer-section">
        <p>
          everything is done in figma and gimp
          <br><br>
          one day i'll pay for photoshop & illustrator!
          <br><br>
          mak
        </p>
      </div>
    </div>
  </main>
</template>