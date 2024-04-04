<script lang="ts">
import { IArtItem } from "@/models"

export interface IArtState {
  activeCollection: string;
  collections: string[];
  items: IArtItem[]
}

export default {
  setup() {
    const state = reactive<IArtState>({
      activeCollection: "all",
      collections: [],
      items: []
    })

    const update = (property: string, value: any) => {
      state[property as keyof typeof state] = value
    }

    const updateActiveCollection = (collection: string) => {
      update("activeCollection", collection)
    }

    async function fetchData() {
      const data = await $fetch<IArtItem[]>('/api/art')
      state["items"] = data
      state["collections"] = ["all", ...Array.from(new Set(data.map((item: IArtItem) => item.collection)))]
    }

    onMounted(fetchData)

    provide("artState", readonly(state))
    provide("artUpdateCollection", updateActiveCollection)
  },
}
</script>

<style scoped lang="css">
main {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>

<template>
  <main>
    <NavBar />
    <ArtNavBar />
    <ArtDisplay />
  </main>
</template>