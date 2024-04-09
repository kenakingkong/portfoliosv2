<script lang="ts">
import { ISection } from '~/pages/dev.vue';

export default {
  inject: {
    devSections: "devSections"
  },
  computed: {
    sections() {
      return this.devSections as ISection[]
    },
  },
}
</script>

<template>
  <template v-for="section in sections" :key="section.id">
    <DevSection :id="section.id" :header="section.header" :state-property="section.stateProperty"
      v-bind="section.categoryDisplay && { categoryDisplay: section.categoryDisplay }" />
  </template>
</template>