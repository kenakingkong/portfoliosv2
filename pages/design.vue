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
  font-family: var(--font-sans);
}

.container {
  display: flex;
  flex-direction: column;
  gap: var(--space-y-4)
}

section {
  width: 100%;
  max-width: 40rem;
  margin: auto;
}
</style>

<template>
  <main>
    <NavBar />
    <div class="container">
      <div>
        <h1>Design header</h1>
      </div>
      <section v-for="set in sets" :key="set.title">
        <DesignSection :set="set" />
      </section>
    </div>
  </main>
</template>