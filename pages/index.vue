<script setup lang="ts">
import HomeFooter from '~/components/HomeFooter.vue';
import { useMyHead } from '~/composables';

useMyHead()
</script>

<template>
  <GoogleTagManagerNoScript />
  <main>
    <NavBar />
    <section style="height: 100vh">
      <DancingName />
    </section>
    <section class="section__interim">
      <p class="section__interim-mono">
        I’m a full stack software engineer.
        <br >
        See my <NuxtLink href="/dev">dev stuff</NuxtLink> →
      </p>
      <p class="section__interim-space">Keep scrolling for everything else ⌄</p>
    </section>
    <section class="section__aura">
      <p class="section__aura-text">✶ ✶ ✶</p>
      <p class="section__aura-text">Creativity, craftsmanship and conviction.</p>
      <p class="section__aura-text">✶ ✶ ✶</p>
    </section>
    <section class="section__content">
      <p>WIP</p>
    </section>
    <footer>
      <div class="section__footer">
        <HomeFooter />
      </div>
      <div class="section__copyright">
        <p class="section__copyright-text">
          &copy; {{ new Date().getFullYear() }} Makena Kong
        </p>
      </div>
    </footer>
  </main>
</template>

<style scoped lang="css">
body {
  overflow: hidden;
}

main {
  background: var(--light-pink);

  display: flex;
  flex-direction: column;
}

.section__interim {
  width: 100%;
  max-width: calc(min(100vw, 1440px));
  min-height: calc(min(75vh, 400px));
  margin: auto;
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.section__interim-mono {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: var(--text-md);
}

.section__interim-space {
  font-family: var(--font-space);
  font-size: var(--text-md);
}

.section__aura {
  width: 100%;
  max-width: calc(min(100vw, 1440px));
  min-height: calc(min(90vh, 800px));
  margin: auto;
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);

  font-family: var(--font-space);
  font-size: var(--text-xl);
  letter-spacing: -5%;
  text-align: center;

  background: radial-gradient(ellipse 50% 50% at center, rgba(255, 0, 255, 0.5) 0%, rgba(255, 240, 245, 0.5) 100%);
  color: var(--light-pink);
}

.section__aura-text {
  margin: 0;
  padding: 0;
  max-width: 60vw;
}

.section__content {
  width: 100%;
  max-width: calc(min(100vw, 1440px));
  min-height: calc(min(40vh, 600px));
  margin: auto;
  text-align: center;
}

.section__footer {
  width: 100%;
  max-width: calc(min(100vw, 1440px));
  margin: auto;
  display: flex;
  flex-direction: row;
}

.section__copyright-text {
  text-align: center;
  font-family: var(--font-space);
  font-size: var(--text-xs);
}

@media only screen and (max-width: 600px) {
  .section__aura {
    font-size: var(--text-lg);
  }

  .section__footer {
    flex-direction: column;
  }
}
</style>
