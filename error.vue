<script setup lang="ts">
const props = defineProps({
  error: Object
})
</script>

<style scoped lang="css">
body {
  overflow: hidden;
}

main {
  height: 100vh;
  width: 100vw;
  background: red;
  overflow: hidden;
}

div {
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-1);

  font-family: var(--font-space);
}
</style>

<template>
  <main>
    <NavBar />
    <div>
      <h2 v-if="error">{{ error?.statusCode }}</h2>
      <h1>Nothing to see here!</h1>
    </div>
  </main>
</template>