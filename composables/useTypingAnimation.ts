import { ref } from "vue";

const DEFAULT_MIN_DELAY = 50;
const DEFAULT_MAX_DELAY = 100;

interface Options {
  minDelay?: number;
  maxDelay?: number;
}

export function useTypingAnimation(options: Options = {}) {
  const { minDelay = DEFAULT_MIN_DELAY, maxDelay = DEFAULT_MAX_DELAY } =
    options;

  const isAnimating = ref(false);
  const isDone = ref(false);

  function wrapWords(node: Node): HTMLSpanElement[] {
    const spans: HTMLSpanElement[] = [];

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? "";
      if (!text.trim()) return spans;

      const parts = text.split(/(\s+)/);
      const fragment = document.createDocumentFragment();

      for (const part of parts) {
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
        } else if (part) {
          const span = document.createElement("span");
          span.textContent = part;
          span.style.opacity = "0";
          fragment.appendChild(span);
          spans.push(span);
        }
      }

      node.parentNode!.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (const child of Array.from(node.childNodes)) {
        spans.push(...wrapWords(child));
      }
    }

    return spans;
  }

  async function start(el: HTMLElement) {
    isAnimating.value = true;
    isDone.value = false;

    const blocks = Array.from(
      el.querySelectorAll<HTMLElement>("p, li, h1, h2, h3, h4")
    );

    // Measure and hide each block before wrapping words
    const blockData = blocks.map((block) => {
      block.style.overflow = "hidden";
      block.style.maxHeight = "0";
      block.style.transition = "max-height 0.35s ease";
      const targetHeight = block.scrollHeight;
      const spans = wrapWords(block);
      return { block, targetHeight, spans };
    });

    for (const { block, targetHeight, spans } of blockData) {
      // Grow the block to its natural height
      block.style.maxHeight = `${targetHeight}px`;

      for (const span of spans) {
        const bgRevealEl = span.parentElement?.closest<HTMLElement>("[data-bg-reveal]");
        if (bgRevealEl && !bgRevealEl.dataset.bgTriggered) {
          bgRevealEl.dataset.bgTriggered = "true";
          bgRevealEl.style.backgroundSize = "100% 100%";
        }
        span.style.opacity = "1";
        const delay = minDelay + Math.random() * (maxDelay - minDelay);
        await new Promise<void>((resolve) => setTimeout(resolve, delay));
      }
    }

    isAnimating.value = false;
    isDone.value = true;
  }

  return { start, isAnimating, isDone };
}
