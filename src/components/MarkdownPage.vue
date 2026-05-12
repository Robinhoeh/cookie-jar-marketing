<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps<{
  source: string
}>()

const md = new MarkdownIt({ html: false, linkify: true, typographer: true })

const html = computed(() => md.render(props.source))
</script>

<template>
  <article class="mx-auto max-w-3xl px-4 min-[640px]:px-6 py-12">
    <div class="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-plum prose-a:text-brand-purple" v-html="html" />
  </article>
</template>
