<script lang="ts">
import type { IDevState } from '~/pages/dev.vue'

interface IDevSectionItem {
  title: string
  url?: string
  description?: string
  category?: string
}

export default {
  inject: {
    state: "devState"
  },
  props: {
    id: { type: String, required: true },
    header: { type: String, required: true },
    stateProperty: { type: String, required: true },
    categoryDisplay: { type: String, required: false, default: null }
  },
  computed: {
    items(): IDevSectionItem[] {
      const devState = this.state as IDevState
      return (devState[this.stateProperty as keyof IDevState] as IDevSectionItem[]).filter(Boolean)
    },
    showTopCategories() {
      return this.categoryDisplay == "top" && !!this.items.length && !!this.items[0]?.category
    },
    showInlineCategories() {
      return this.categoryDisplay == "inline" && !!this.items.length && !!this.items[0]?.category
    },
    categoryItems(): Record<string, IDevSectionItem[]> {
      return [...this.items].reduce((r: Record<string, IDevSectionItem[]>, o: IDevSectionItem) => {
        const key = o.category ?? ''
        r[key] = r[key] || []
        r[key].push(o)
        return r
      }, {})
    }
  },
}
</script>

<template>
  <section :id="id">
    <h2>{{ header }}</h2>
    <ul v-if="showInlineCategories">
      <li v-for="(value, key) in categoryItems" :key="key">
        <span class="inline-category">{{ key }}:</span>
        <ul class="ul-tight">
          <li v-for="item in value" :key="item.title">
            <NuxtLink v-if="item.url" :to="item.url" target="_blank" class="item-title">{{ item.title }}</NuxtLink>
            <span v-else class="item-title">{{ item.title }}</span>
            <span v-if="item.description">{{ item.description }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul v-else>
      <li v-for="item in items" :key="item.title">
        <NuxtLink v-if="item.url" :to="item.url" target="_blank" class="item-title">{{ item.title }}</NuxtLink>
        <span v-else class="item-title">{{ item.title }}</span>
        <span v-if="item.description">{{ item.description }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="css">
section {
  width: 100%;
  max-width: 40rem;
}

h2,
.inline-category,
.item-title {
  text-transform: capitalize;
}

ul {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  list-style-type: none;
}

li {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ul-tight {
  gap: 0.75rem;
}

span {
  display: block;
}

.inline-category {
  font-size: var(--text-xs);
}
</style>