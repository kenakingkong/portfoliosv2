<script setup lang="ts">
import { IArtItem } from "@/models"
import ArtNavBar from "~/components/ArtNavBar.vue";
import { useMyHead } from "~/composables";
import { ISocialLink } from "~/models/SocialLink";

export interface IArtState {
  activeCollection: string;
  collections: string[];
  items: IArtItem[]
  socials: ISocialLink[]
}

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
  state["items"] = items
  state["collections"] = ["all", ...Array.from(new Set(items.map((item: IArtItem) => item.collection)))]
  state["socials"] = (data as any).artSocials as ISocialLink[]
}

onMounted(fetchData)

provide("artState", readonly(state))
provide("artUpdateCollection", updateActiveCollection)

</script>

<style scoped lang="css">
main {
  width: 100vw;
  padding: var(--space-1);
  padding-top: 0;
  overflow: hidden;
  background-color: white;

  display: flex;
  flex-direction: column;
}

.title {
  font-size: var(--text-xxl);
  font-family: var(--font-space);
  font-weight: lighter;
  letter-spacing: -7%;
}

.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.sidebar {
  padding: calc(var(--space-1)/2) 0;
}

.gallery {
  width: 100%;
  padding: var(--space-1)
}

@media screen and (max-width: 600px) {
  .title {
    font-size: var(--text-xl);
  }

  .container {
    flex-direction: column;
  }

  .gallery {
    padding: 0;
  }
}
</style>

<template>
  <GoogleTagManagerNoScript />
  <main>
    <NavBar />
    <h1 class="title">Artwork</h1>
    <div class="container">
      <aside class="sidebar">
        <ArtNavBar />
      </aside>
      <div class="gallery">
        <ArtGallery />
      </div>
    </div>
    <!-- <ArtFeatureGallery v-if="state.items.length"
      :art-items="state.items.filter((item: IArtItem) => item.collection === 'pet portraits')" /> -->
  </main>
</template>