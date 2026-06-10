<script lang="ts">
import { IArtItem } from '~/models';
import { IArtState } from '~/pages/art.vue';

const COLLECTION_NAME = "pet portraits"
const DEFAULT_IMAGE_ID = 'rico_inquisitive'

export default {
  inject: {
    state: "artState",
  },
  setup() {
    const activeImageId = ref(DEFAULT_IMAGE_ID)

    const setActiveImageId = (id: string) => {
      activeImageId.value = id
    }

    return { activeImageId, setActiveImageId }
  },
  computed: {
    items() {
      return (this.state as IArtState).items.filter((item: IArtItem) => item.collection == COLLECTION_NAME).reverse()
    },
    activeImage() {
      const imageId = this.activeImageId || DEFAULT_IMAGE_ID

      const activeImageObj = (this.state as IArtState).items.find(item => item.id == imageId)
      if (!activeImageObj) return null

      return activeImageObj
    }
  },
  methods: {
    setActiveImageId(event: any) {
      const targetId = event.target?.dataset?.id
      if (targetId && this.activeImageId !== targetId) {
        this.setActiveImageId(targetId)
      }
    }
  }
}
</script>

<style scoped lang="css">
.container {
  display: grid;
  grid-column: 2;
}

.gallery {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1)
}

.gallery-item-name-container {
  list-style-type: none;
}

.gallery-item-name {
  margin: 0;
  padding: 0;

  font-family: var(--font-space);
  font-weight: lighter;
  font-size: var(--text-xl);
  letter-spacing: -7%;
  /* text-transform: capitalize; */
  text-decoration: none;

  cursor: pointer
}

.gallery-item-name[data-active='true'] {
  color: var(--purple);
  text-decoration: underline;
}

.gallery-item-name:hover {
  color: var(--magenta);
}

.gallery-item-image {
  object-fit: cover;
}

.showcase {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.showcase-item {
  width: auto;
  height: auto;
  max-width: 40vw;
  max-height: 80vh;
  object-fit: contain;
}

@media screen and (max-width: 1024) {
  .gallery-item-name {
    font-size: var(--text-md);
  }
}

@media screen and (max-width: 600px) {
  .container {
    gap: var(--space-1);
  }

  .gallery {
    flex-direction: row;
    flex-wrap: wrap;
    gap: calc(var(--space-1)/2) var(--space-1)
  }

  .gallery-item-name {
    font-size: var(--text-sm);
  }

  .showcase {
    align-items: start;
  }
}
</style>

<template>
  <div class="container">
    <ul class="gallery">
      <li v-for="item in items" class="gallery-item-name-container">
        <p :data-id="item.id" @mouseenter="setActiveImageId" :data-active="activeImageId == item.id"
          class="gallery-item-name">{{ item.title }}</p>
      </li>
    </ul>
    <div class="showcase">
      <img v-if="activeImage" :src="activeImage.url_lg" :aria-label="activeImage.title" :alt="activeImage.title"
        class="showcase-item animate-fade-in" />
    </div>
  </div>
</template>