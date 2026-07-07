<script lang="ts">
import type { IArtItem } from '~/models';
import type { IArtState } from '~/pages/art.vue';

export default {
  setup() {
    const activeImg = ref();
    const showAll = ref(false);

    const containerRef = ref<HTMLElement | null>(null);
    const containerWidth = ref(1200);
    let resizeObserver: ResizeObserver | null = null;

    const colConfig = computed(() => {
      if (containerWidth.value >= 1200) return { cols: 4, max: 12 };
      if (containerWidth.value >= 600) return { cols: 3, max: 9 };
      return { cols: 2, max: 6 };
    });

    const maxItemsShowing = computed(() => colConfig.value.max);
    const gridCols = computed(() => colConfig.value.cols);

    onMounted(() => {
      if (containerRef.value) {
        resizeObserver = new ResizeObserver(entries => {
          containerWidth.value = entries[0].contentRect.width;
        });
        resizeObserver.observe(containerRef.value);
      }
    });
    onUnmounted(() => resizeObserver?.disconnect());

    const state = inject('artState') as IArtState

    watch(() => state.activeCollection, () => {
      showAll.value = false
    })

    const findImg = (id: string) => {
      return state.items.find((item: IArtItem) => item.id == id)
    }

    const setActiveImg = (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLButtonElement && event.currentTarget.value) {
        event.preventDefault()
        activeImg.value = findImg(event.currentTarget.value)
      } else {
        activeImg.value = undefined
      }
    }

    const clearActiveImg = () => {
      activeImg.value = undefined
    }

    return { state, activeImg, setActiveImg, clearActiveImg, showAll, maxItemsShowing, containerRef, gridCols }
  },
  computed: {
    filteredItems() {
      const { activeCollection, items } = this.state

      if (activeCollection != "all") {
        return items.filter((item: IArtItem) => item.collection == activeCollection)
      }

      return items
    },
    hasMore() {
      return this.filteredItems.length > this.maxItemsShowing
    },
    items() {
      if (this.showAll || !this.hasMore) {
        return this.filteredItems
      }
      return this.filteredItems.slice(0, this.maxItemsShowing)
    }
  },
  methods: {
    handleModalOutsideClick(event: MouseEvent) {
      if (event.target instanceof Element && event.target.id === "modal-overlay") {
        this.clearActiveImg()
      }
    }
  }
}
</script>

<template>
  <div ref="containerRef" class="gallery-container">
    <ul class="gallery" :style="{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }">
      <li v-for="(item, index) in items" :key="item.id" class="gallery-item-container">
        <button :value="item.id" class="gallery-item" @click="setActiveImg">
          <img
:id="item.title" :src="item.url_md" :aria-label="item.title" :alt="item.title"
            :loading="index < 4 ? 'eager' : 'lazy'" height="300" width="300" class="gallery-item-img animate-fade-in">
        </button>
      </li>
    </ul>
    <button v-if="hasMore && !showAll" class="gallery-show-all-button" @click="showAll = true">
      Show all images
    </button>
  </div>
  <Teleport to="body">
    <div v-if="!!activeImg">
      <div id="modal-overlay" class="modal__overlay" @click="handleModalOutsideClick">
        <div class="modal__content">
          <p>{{ activeImg.title }}</p>
          <img
:src="activeImg.url_lg" :alt="activeImg.title" :aria-label="activeImg.title" class="animate-fade-in"
            style="min-height: 60vh">
          <button :value='undefined' title="close" @click="clearActiveImg">x</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="css">
.gallery-container {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-1);
}

.gallery {
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;

  display: grid;
  list-style-type: none;
}

.gallery-item-container {
  padding: calc(var(--space-1)/4);
  aspect-ratio: 1;
}

.gallery-item {
  height: 100%;
  width: 100%;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  overflow: hidden;
}

.gallery-container .gallery-item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.gallery-container .gallery-item-img:hover {
  scale: 105%;
}

.gallery-show-all-button {
  border: none;
  background-color: transparent;

  font-family: var(--font-space);
  font-weight: lighter;
  font-size: var(--text-md);
  letter-spacing: -7%;
  text-decoration: none;

  cursor: pointer;
}

.gallery-show-all-button[data-active='true'] {
  color: var(--purple);
  text-decoration: underline;
  font-weight: bold;
}

.gallery-show-all-button:hover {
  color: var(--magenta);
}

.modal__overlay {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__content {
  font-family: var(--font-space);
  font-size: x-large;
  text-align: center;
  color: white;
}

.modal__content img {
  width: 100%;
  height: 100%;
  max-height: 80vh;
  max-width: 80vw;
  object-fit: contain;
}

.modal__content button {
  width: 40px;
  height: 40px;
  margin: var(--space-1) auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 2px solid white;
  border-radius: var(--space-8);
  color: white;
  font-size: x-large;
}
</style>