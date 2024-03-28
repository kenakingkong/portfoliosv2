<script lang="ts">
export default {
  props: ['error']
}
</script>


<style scoped lang="css"></style>

<template>
  <main>
    <NavBar />
    <h1>Error!</h1>
    <p>{{ error.statusCode }}</p>
  </main>
</template>