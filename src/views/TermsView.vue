<script setup lang="ts">
import MarkdownPage from '@/components/MarkdownPage.vue'
import termsMd from '@/content/terms-of-service.md?raw'
</script>

<template>
  <MarkdownPage :source="termsMd" />
</template>
