<script setup lang="ts">
interface Props {
  size?: number
}

withDefaults(defineProps<Props>(), {
  size: 18,
})
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="10" width="6" height="2.5" rx="1.25" fill="#E01E5A" />
    <rect x="11.5" y="3" width="2.5" height="6" rx="1.25" fill="#36C5F0" />
    <rect x="15" y="11.5" width="6" height="2.5" rx="1.25" fill="#2EB67D" />
    <rect x="10" y="15" width="2.5" height="6" rx="1.25" fill="#ECB22E" />
  </svg>
</template>
