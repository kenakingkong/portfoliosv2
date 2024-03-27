<script setup lang="ts">
const { data, error } = await useFetch('/api/hello')
console.log(data)
</script>

<style scoped lang="css">
</style>

<template>
  <main>
    <NavBar />
    <h1>dev</h1>
  </main>
</template>