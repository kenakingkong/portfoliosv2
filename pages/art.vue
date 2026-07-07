<script setup lang="ts">
import type { IArtItem } from "@/models"
import ArtNavBar from "~/components/ArtNavBar.vue";
import { useMyHead } from "~/composables";
import type { ISocialLink } from "~/models/SocialLink";

export interface ICollection {
  name: string;
  count: number;
}

export interface IArtState {
  activeCollection: string;
  collections: ICollection[];
  items: IArtItem[]
  socials: ISocialLink[]
}

interface ArtApiResponse {
  artItems: IArtItem[]
  artSocials: ISocialLink[]
}

useMyHead("Artwork")

const state = reactive<IArtState>({
  activeCollection: "all",
  collections: [],
  items: [],
  socials: []
})

const updateActiveCollection = (collection: string) => {
  state["activeCollection"] = collection
}

const toCDN = (url: string) => url.replace('assets.makenakong.com', 'd20vl58cxzmqvr.cloudfront.net')



const { data } = await useFetch<ArtApiResponse>('/api/art')

if (data.value) {
  const items = data.value.artItems
  const counts = items.reduce((acc: Record<string, number>, item: IArtItem) => {
    acc[item.collection] = (acc[item.collection] ?? 0) + 1
    return acc
  }, {})
  state["collections"] = [
    { name: "all", count: items.length },
    ...Object.entries(counts).map(([name, count]) => ({ name, count }))
  ]
  state["items"] = items.map(item => ({
    ...item,
    url: toCDN(item.url),
    url_md: toCDN(item.url_md),
    url_lg: toCDN(item.url_lg)
  })).reverse()
  state["socials"] = data.value.artSocials
}

provide("artState", readonly(state))
provide("artUpdateCollection", updateActiveCollection)

</script>

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
          calligraphy landscapes. Then, while getting my BS in CS at Cal Poly SLO, I neglected my coding assignments so
          I
          could minor in Studio Art. I still paint sometimes.
          <br>
          <br>
          <a
ref="noreferrer noopener" href="https://instagram.com/maks_ugly_ass_art"
            target="_blank">@maks_ugly_ass_art</a>
        </p>
      </section>
    </div>
  </main>
</template>

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