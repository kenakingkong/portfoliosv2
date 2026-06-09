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

useMyHead("Artwork")

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
  width: 100%;
  max-width: calc(min(100vw, 1920px));
  margin: auto;
  padding-top: 0;
  overflow: hidden;
  background-color: white;

  display: flex;
  flex-direction: column;
}

.section {
  width: 100%;
  padding: var(--space-2) var(--space-1);
  transition: height 0.3s ease;
}

.unpadded-top-section {
  padding-top: var(--space-0)
}

.bordered-section {
  border-top: 1px solid black;
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
  gap: var(--space-2);
}

.sidebar {
  padding: calc(var(--space-1)/2) 0;
}

.gallery {
  width: 100%;
  padding: var(--space-1)
}

.background {
  font-size: var(--text-lg);
  font-family: var(--font-space);
  font-weight: lighter;
  letter-spacing: -7%;
}

.background-section {
  background-color: var(--gray-purple);
  color: var(--purple)
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

  .background {
    font-size: var(--text-md);
  }
}
</style>

<template>
  <GoogleTagManagerNoScript />
  <main>
    <NavBar />
    <section class="section unpadded-top-section">
      <h1 class="title">Artwork</h1>
      <div class="container">
        <aside class="sidebar">
          <ArtNavBar />
        </aside>
        <div class="gallery">
          <ArtGallery />
        </div>
      </div>
    </section>
    <section class="section bordered-section">
      <h2 class="title">Pet Portraits</h2>
      <ArtPetPortraitGallery />
    </section>
    <div class="background-section">
      <section class="section bordered-section">
      <h2 class="title">Background</h2>
      <p class="background">
        Growing up, I spent my summers painting at my Grandma’s house. She taught me to paint roses and Chinese
        calligraphy landscapes. Then, while getting my BS in CS at Cal Poly SLO, I neglected my coding assignments so I
        could minor in Studio Art. I still paint sometimes.
        <br />
        <br />
        <a href="https://instagram.com/maks_ugly_ass_art" target="_blank"
          ref="noreferrer noopener">@maks_ugly_ass_art</a>
      </p>
    </section>
    </div>
  </main>
</template>