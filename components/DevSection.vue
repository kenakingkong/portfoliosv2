<script lang="ts">
export default {
  props: {
    id: { type: String, required: true },
    header: { type: String, required: true },
    stateProperty: { type: String, required: true },
    categoryDisplay: { type: String, required: false }
  },
  inject: {
    state: "devState"
  },
  computed: {
    items() {
      console.log(this.state)
      return (this.state as any)[this.stateProperty as keyof typeof this.state]
    },
    showTopCategories() {
      return this.categoryDisplay == "top" && !!this.items[0]?.category
    },
    showInlineCategories() {
      return this.categoryDisplay == "inline" && !!this.items[0]?.category
    },
    categoryItems() {
      return Object
        .assign([], this.items)
        .reduce((r: any, o: any) => {
          var key = o.category;
          (r[key] = r[key] || []).push(o);
          return r;
        }, Object.create(null));
    }
  },
}
</script>

<style scoped lang="css">
section {
  width: 100%;
  max-width: 40rem;
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

<template>
  <section :id="id">
    <h2>{{ header }}</h2>
    <ul v-if="showInlineCategories">
      <li v-for="(value, key) in categoryItems" :key="key">
        <span class="inline-category">{{ key }}:</span>
        <ul class="ul-tight">
          <li v-for="item in value" :key="item.title">
            <a v-if="item.url" :href="item.url" target="_blank">{{ item.title }}</a>
            <span v-else>{{ item.title }}</span>
            <span v-if="item.description">{{ item.description }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul v-else>
      <li v-for="item in items" :key="item.title">
        <a v-if="item.url" :href="item.url" target="_blank">{{ item.title }}</a>
        <span v-else>{{ item.title }}</span>
        <span v-if="item.description">{{ item.description }}</span>
      </li>
    </ul>
  </section>
</template>