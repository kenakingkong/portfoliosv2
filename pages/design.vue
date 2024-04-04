<script lang="ts">
import { IDesignSet } from "@/models"

export default {
  setup() {
    const sets = ref()
    async function fetchData() {
      const data = await $fetch<IDesignSet[]>('/api/design')
      sets.value = data.sort((a: IDesignSet, b: IDesignSet) => b.sort - a.sort)
    }

    onMounted(fetchData)

    return { sets }
  }
}
</script>

<style scoped lang="css">
main {
  width: 100%;
  font-family: var(--font-space);
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