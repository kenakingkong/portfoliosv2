<script setup lang="ts">
useMyHead()
</script>

<template>
  <GoogleTagManagerNoScript />
  <main>
    <NavBar />
    <section style="height: 100vh">
      <HomeDancingName />
    </section>
    <section class="section__interim">
      <p class="section__interim-mono">
        I’m a full stack software engineer.
        <br>
        See my <NuxtLink href="/dev">dev stuff</NuxtLink> →
      </p>
      <p class="section__interim-space">Keep scrolling for everything else ⌄</p>
    </section>
    <section>
      <HomeValues />
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
