<script setup lang="ts">
const props = defineProps({
  error: Object as () => NuxtError
})
</script>


<style scoped lang="css"></style>

<template>
  <main>
    <NavBar />
    <h1>Error!</h1>
    <p>{{ error.statusCode }}</p>
  </main>
</template>