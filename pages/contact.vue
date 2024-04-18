<script lang="ts">
import { useMyHead } from "~/composables";


export default {
  setup() {
    useMyHead("contact")
  }
}
</script>

<style scoped lang="css">
main {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <GoogleTagManagerNoScript />
  <main>
    <NavBar />
    <ContactForm />
  </main>
</template>
