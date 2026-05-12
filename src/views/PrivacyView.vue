<script setup lang="ts">
import MarkdownPage from '@/components/MarkdownPage.vue'
import privacyMd from '@/content/privacy-policy.md?raw'
</script>

<template>
  <MarkdownPage :source="privacyMd" />
</template>
