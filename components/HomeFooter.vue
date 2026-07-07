<template>
  <div class="section__int-links">
    <p class="section__title">Makena Kong</p>
    <nav>
      <ul class="section__int-links-list">
        <li>
          <NuxtLink href="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/def">Software</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/art">Artwork</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/design">Design</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/contact">Contact Me</NuxtLink>
        </li>
      </ul>
      <ul class="section__int-links-list">
        <li>
          <NuxtLink href="/field-notes">Field Notes</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/tutorials">Tutorials</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
  <div class="section__ext-links">
    <p class="section__title">Software/Dev</p>
    <nav>
      <ul>
        <li>
          <a ref="noreferrer noopener" href="https://linkedin.com/in/makenakong" target="_blank">
            linkedin.com/in/makenakong
          </a>
        </li>
        <li>
          <a ref="noreferrer noopener" href="https://github.com/kenakingkong" target="_blank">
            github.com/kenakingkong
          </a>
        </li>
        <li>
          <a ref="noreferrer noopener" href="https://medium.com/@makenakong" target="_blank">
            medium.com/@makenakong
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="section__ext-links">
    <p class="section__title">_mak_archives</p>
    <nav>
      <ul>
        <li>
          <a ref="noreferrer noopener" href="https://makarchives.com" target="_blank">
            makarchives.com
          </a>
        </li>
        <li>
          <a ref="noreferrer noopener" href="https://etsy.makarchives.com" target="_blank">
            etsy.makarchives.com
          </a>
        </li>
        <li>
          <a ref="noreferrer noopener" href="https://instagram.com/_mak_archives" target="_blank">
            instagram.com/_mak_archives
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="section__ext-links">
    <p class="section__title">Other</p>
    <nav>
      <ul>
        <li>
          <a ref="noreferrer noopener" href="https://youtube.com/@makenakong" target="_blank">
            youtube.com/@makenakong
          </a>
        </li>
        <li>
          <a ref="noreferrer noopener" href="https://instagram.com/maks_ugly_ass_art" target="_blank">
            instagram.com/maks_ugly_ass_art
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped lang="css">
.section__int-links,
.section__ext-links {
  width: auto;
  height: auto;
  padding: var(--space-1);
  font-family: var(--font-space);
  font-size: var(--text-xs);
  border: 1px solid black;
}

.section__title {
  margin: 0;
  padding: 0;
  font-weight: bolder;
}

.section__int-links {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.section__int-links-list {
  display: flex;
  gap: var(--space-1);
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>