<script lang="ts">
import { ref } from "vue";
import { gsap } from "gsap";

export default {
  setup() {
    const content = ref()
    return { content }
  },
  data: () => ({
    animation: null as GSAPTimeline | null
  }),
  mounted() {
    if (!this.content) return;

    const duration = 1;
    const stagger = 0.1;
    const q = gsap.utils.selector(this.content);

    const animation1 = gsap.to(q("p"), {
      duration: duration / 4,
      stagger: stagger,
      ease: "Power2.easeOut",
      y: -25,
      scale: 1.1,
    });

    const animation2 = gsap.to(q("p"), {
      duration: duration / 2,
      stagger: stagger,
      ease: "Bounce.easeOut",
      y: 0,
      scale: 1,
    });

    this.animation = gsap
      .timeline()
      .add(animation1)
      .add(animation2, duration / 4)
      .play();
  },
  unmounted() {
    if (this.animation) this.animation.kill()
  },
  methods: {
    animate: function () {
      if (this.animation) this.animation.restart()
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>makena kong</h1>
    <div ref="content" @mouseenter="animate">
      <p>M</p>
      <p>a</p>
      <p>k</p>
      <p>e</p>
      <p>n</p>
      <p>a</p>
      <br>
      <p>K</p>
      <p>o</p>
      <p>n</p>
      <p>g</p>
    </div>
  </div>
</template>

<style scoped lang="css">
.container {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 0, 255, 0.5) 0%, rgba(255, 240, 245, 1) 100%);
}

h1 {
  display: none;
}

div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
}

p {
  margin: var(--space-y-2);
  font-size: var(--text-xxl);
  font-weight: light;
  font-family: var(--font-space);
  line-height: 50%;
  display: inline-block;
}
</style>
