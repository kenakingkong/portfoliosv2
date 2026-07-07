<script lang="ts">
import { ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  setup() {
    const content = ref()
    return { content }
  },
  data: () => ({
    animation: null as GSAPTween | null
  }),
  mounted() {
    if (!this.content) return;

    this.animation = gsap.fromTo(
      this.content,
      { '--aura-size': '5%' },
      {
        '--aura-size': '50%',
        ease: 'none',
        scrollTrigger: {
          trigger: this.content,
          start: 'top 90%',
          end: 'center center',
          scrub: true,
          once: true,
        },
      }
    );
  },
  unmounted() {
    if (this.animation) this.animation.kill()
  },
}
</script>

<template>
  <div class="aura" ref="content">
    <p class="aura-text">✶ ✶ ✶</p>
    <p class="aura-text">Creativity, craftsmanship and conviction.</p>
    <p class="aura-text">✶ ✶ ✶</p>
  </div>
</template>

<style lang="css" scoped>
.aura {
  --aura-size: 5%;

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

  background: radial-gradient(ellipse var(--aura-size) var(--aura-size) at center, rgba(255, 0, 255, 0.5) 0%, rgba(255, 240, 245, 0.5) 100%);
  color: var(--light-pink);
}

.aura-text {
  margin: 0;
  padding: 0;
  max-width: 60vw;
}
</style>
