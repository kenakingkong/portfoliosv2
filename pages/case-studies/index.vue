<script setup lang="ts">
import { useMyHead } from '~/composables';

useMyHead("case studies")

const { data: articles } = await useAsyncData('case-studies', () =>
  queryContent('case-studies').sort({ date: -1 }).find()
)
</script>

<style scoped lang="css">
main {
  width: 100%;
  font-family: var(--font-space);
}

.container {
  margin: auto;
  max-width: 800px;
  padding: var(--space-2);

  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.card {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: calc(var(--space-1)/2)
}

.card:hover {
  color: var(--magenta);
}

.card-title {
  font-family: var(--font-space);
  font-size: var(--text-sm);
  margin: 0;
}

.card-body {
  font-family: var(--font-space);
  font-size: var(--text-xs);
  margin: 0;
}

.card-date {
  font-size: var(--text-xs);
  margin: 0;
}
</style>

<template>
  <GoogleTagManagerNoScript />
  <main>
    <NavBar />
    <div class="container">
      <h1>case studies</h1>
      <NuxtLink v-for="article in articles" :key="article._path" :to="article._path" class="card">
        <h2 class="card-title">{{ article.title }}</h2>
        <p class="card-body">{{ article.description }}</p>
        <p class="card-date">{{ article.date }}</p>
      </NuxtLink>
    </div>
  </main>
</template>
