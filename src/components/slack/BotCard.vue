<script setup lang="ts">
interface Props {
  accent?: string
  tint?: string
}

withDefaults(defineProps<Props>(), {
  accent: '#B000FF',
  tint: '#FFF3E6',
})
</script>

<template>
  <div
    class="mt-1.5 rounded-r-[10px] px-4 py-3.5"
    :style="{ borderLeft: `3px solid ${accent}`, background: tint }"
  >
    <slot />
  </div>
</template>
