<script setup lang="ts">
import { useMyHead } from '~/composables';

const route = useRoute()
const slug = route.params.slug as string

const { data: study } = await useAsyncData(`study-${slug}`, () =>
  queryContent('case-studies', slug).findOne()
)

if (!study.value) {
  throw createError({ statusCode: 404, statusMessage: 'not found' })
}

useMyHead(study.value.title, study.value.description, "article")
</script>

<style scoped lang="css">
main {
  width: 100%;
  background-color: GhostWhite;
}

.back-button {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-decoration: none;

  display: block;
  margin-bottom: var(--space-2);
}

.back-button:hover {
  color: var(--magenta);
}

article {
  margin: auto;
  max-width: 800px;
  padding: var(--space-2);
}

h1 {
  font-size: var(--text-lg);
  font-family: var(--font-space);
  margin: 0;
}

.content {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  max-width: 680px;
  line-height: 180%;
}

.content :deep(h2) {
  font-size: var(--text-md);
  font-family: var(--font-space);
  margin-top: var(--space-2);
}

.content :deep(h3) {
  font-size: var(--text-sm);
  font-family: var(--font-space);
  font-weight: 800;
  margin-top: var(--space-1);
}

.content :deep(h2),
.content :deep(h3),
.content :deep(h4) {
  a {
    text-decoration: none;
  }
}

.content :deep(a) {
  color: var(--purple);
}

.content :deep(a):hover {
  color: var(--magenta);
}

.content :deep(img) {
  max-width: 100%;
  object-fit: contain;
}
</style>

<template>
  <GoogleTagManagerNoScript />
  <main>
    <NavBar />
    <article>
      <NuxtLink to="/case-studies" class="back-button">← case studies</NuxtLink>
      <h1>{{ study!.title }}</h1>
      <div class="content">
        <ContentDoc />
      </div>
    </article>
  </main>
</template>
