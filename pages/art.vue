<script lang="ts">
import { IArtItem } from "@/models"
import { useMyHead } from "~/composables";
import { ISocialLink } from "~/models/SocialLink";

export interface IArtState {
  activeCollection: string;
  collections: string[];
  items: IArtItem[]
  socials: ISocialLink[]
}

const generateRandomId = () => {
  return (Math.random() + 1).toString(36).substring(7);
}

const assignRandomId = (item: IArtItem) => {
  return { ...item, id: generateRandomId() }
}

export default {
  setup() {
    useMyHead("art")

    const state = reactive<IArtState>({
      activeCollection: "all",
      collections: [],
      items: [],
      socials: []
    })

    const update = (property: string, value: any) => {
      state[property as keyof typeof state] = value
    }

    const updateActiveCollection = (collection: string) => {
      update("activeCollection", collection)
    }

    async function fetchData() {
      const data = await $fetch<IArtItem[]>('/api/art')
      const items = (data as any).artItems as IArtItem[]
      state["items"] = items.map(assignRandomId)
      state["collections"] = ["all", ...Array.from(new Set(items.map((item: IArtItem) => item.collection)))]
      state["socials"] = (data as any).artSocials as ISocialLink[]
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
  background-color: white;
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <GoogleTagManagerNoScript />
  <main>
    <NavBar />
    <ArtGallery />
    <ArtNavBar />
  </main>
</template>