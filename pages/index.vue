<script setup lang="ts">
import { useMyHead } from '~/composables';

useMyHead()
</script>

<style scoped lang="css">
body {
  overflow: hidden;
}

main {
  height: 100vh;
  width: 100vw;
  background: var(--gray-purple);
}
</style>

<template>
  <GoogleTagManagerNoScript />
  <main>
    <NavBar />
    <DancingName />
  </main>
</template>
