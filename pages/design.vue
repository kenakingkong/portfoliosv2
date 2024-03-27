<script setup lang="ts">
  const { data } = await useFetch('/api/design')
  console.log(data)
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