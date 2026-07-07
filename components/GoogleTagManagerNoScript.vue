<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <noscript>
    <iframe
      :src="`https://www.googletagmanager.com/ns.html?id=${runtimeConfig.public.GOOGLE_TAG_MANAGER_ID || 'GTM-K3RRGZ6F'}`"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
  </noscript>
</template>