<script setup lang="ts">
import { useHead } from '@unhead/vue'
import MarkdownPage from '@/components/MarkdownPage.vue'
import termsMd from '@/content/terms-of-service.md?raw'

const TERMS_DESCRIPTION =
  'The terms governing your use of the Cookie Jar Slack app and website.'

useHead({
  title: 'Terms of Service — Cookie Jar',
  meta: [
    { name: 'description', content: TERMS_DESCRIPTION },
    { property: 'og:title', content: 'Terms of Service — Cookie Jar' },
    { property: 'og:description', content: TERMS_DESCRIPTION },
  ],
})
</script>

<template>
  <MarkdownPage :source="termsMd" />
</template>
