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
  methods: {
    animate: function () {
      if (this.animation) this.animation.restart()
    }
  },
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
  }
}
</script>

<style scoped lang="css">
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
  font-size: var(--xxl);
  font-weight: 600;
  font-family: var(--font-sans);
  line-height: 50%;
  display: inline-block;
}
</style>

<template>
  <div>
    <h1>makena kong</h1>
    <div ref="content" @mouseenter="animate">
      <p>m</p>
      <p>a</p>
      <p>k</p>
      <p>e</p>
      <p>n</p>
      <p>a</p>
      <br />
      <p>k</p>
      <p>o</p>
      <p>n</p>
      <p>g</p>
    </div>
  </div>
</template>
