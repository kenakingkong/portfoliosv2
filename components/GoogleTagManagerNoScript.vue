<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const iframeSrc = `https://www.googletagmanager.com/ns.html?id=${runtimeConfig.public.GOOGLE_TAG_MANAGER_ID || 'GTM-K3RRGZ6F'}`
</script>

<template>
  <iframe :src="iframeSrc" height="0" width="0" style="display:none;visibility:hidden"></iframe>
</template>