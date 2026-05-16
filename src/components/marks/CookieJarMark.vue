<script setup lang="ts">
interface Props {
  size?: number
  tone?: 'on-purple' | 'on-cream'
}

const props = withDefaults(defineProps<Props>(), {
  size: 22,
  tone: 'on-purple',
})

const jarFill = props.tone === 'on-purple' ? '#FFF3E6' : '#2D1E2F'
const cookieFill = props.tone === 'on-purple' ? '#FFB703' : '#B000FF'
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="3.5" rx="1.5" :fill="jarFill" />
    <rect x="5" y="8.5" width="14" height="11.5" rx="2.5" :fill="jarFill" />
    <circle cx="12" cy="14.5" r="3.2" :fill="cookieFill" />
    <circle cx="11" cy="13.5" r="0.5" :fill="jarFill" />
    <circle cx="13" cy="15" r="0.5" :fill="jarFill" />
    <circle cx="12.5" cy="13" r="0.4" :fill="jarFill" />
  </svg>
</template>
