<script lang="ts">
import { IArtItem } from '~/models';
import { IArtState } from '~/pages/art.vue';

function shuffleArray(array: IArtItem[]) {
  return array
  // return array.map(value => ({ value, sort: Math.random() }))
  //   .sort((a, b) => a.sort - b.sort)
  //   .map(({ value }) => value)
}

export default {
  setup() {
    const activeImg = ref();

    const state = inject('artState') as IArtState

    const findImg = (id: string) => {
      return state.items.find((item: IArtItem) => item.id == id)
    }

    const setActiveImg = (event: any) => {
      if (event.currentTarget?.value) {
        event.preventDefault()
        activeImg.value = findImg(event.currentTarget.value)
      } else {
        activeImg.value = undefined
      }
    }

    const clearActiveImg = () => {
      activeImg.value = undefined
    }

    return { state, activeImg, setActiveImg, clearActiveImg }
  },
  computed: {
    items() {
      const { activeCollection, items } = this.state
      if (activeCollection != "all") {
        return shuffleArray(items.filter((item: IArtItem) => item.collection == activeCollection))
      }
      return shuffleArray(items)
    }
  },
  methods: {
    handleModalOutsideClick(event: any) {
      if (event.target.id == "modal-overlay") {
        this.clearActiveImg()
      }
    }
  }
}
</script>

<style scoped lang="css">
.container {
  min-width: 0;
  height: 100%;
  max-height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

ul {
  margin: 0;
  padding: var(--space-1) 0;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 300px;
  grid-template-rows: repeat(2, 300px);
  grid-auto-rows: 0px;
  overflow-x: scroll;

  list-style-type: none;
}

li {
  padding: var(--space-1)
}

@media only screen and (max-width: 600px) {
  ul {
    grid-auto-columns: 200px;
    grid-template-rows: repeat(2, 200px);
  }
}

button {
  height: 100%;
  width: 100%;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  overflow: hidden;
}

.container img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.container img:hover {
  scale: 105%;
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

<template>
  <div class="container">
    <ul>
      <li v-for="item in items" :key="item.id">
        <button @click="setActiveImg" :value="item.id">
          <img :src="item.url.replace('https', 'http')" :aria-label="item.title" loading="lazy" height="300" width="300"
            class="animate-fade-in" />
        </button>
      </li>
    </ul>
  </div>
  <Teleport to="body">
    <div v-if="!!activeImg">
      <div id="modal-overlay" class="modal__overlay" @click="handleModalOutsideClick">
        <div class="modal__content">
          <p>{{ activeImg.title }}</p>
          <img :src="activeImg.url.replace('https', 'http')" :aria-label="activeImg.title" loading="lazy" height="300"
            width="300" class="animate-fade-in" />
          <button @click="clearActiveImg" :value='undefined' title="close">x</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>