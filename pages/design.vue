<script setup lang="ts">
  const { data, error } = await useFetch('/api/design')
</script>

<style scoped lang="css">
</style>

<template>
  <main>
    <NavBar />
    <h1>design</h1>
    <div>{{ data }}</div>
  </main>
</template>