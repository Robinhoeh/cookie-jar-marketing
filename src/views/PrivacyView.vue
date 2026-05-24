<script setup lang="ts">
import { useHead } from '@unhead/vue'
import MarkdownPage from '@/components/MarkdownPage.vue'
import privacyMd from '@/content/privacy-policy.md?raw'

const PRIVACY_DESCRIPTION =
  "How Cookie Jar collects, stores, and protects workspace data."

useHead({
  title: 'Privacy Policy — Cookie Jar',
  meta: [
    { name: 'description', content: PRIVACY_DESCRIPTION },
    { property: 'og:title', content: 'Privacy Policy — Cookie Jar' },
    { property: 'og:description', content: PRIVACY_DESCRIPTION },
  ],
})
</script>

<template>
  <MarkdownPage :source="privacyMd" />
</template>
