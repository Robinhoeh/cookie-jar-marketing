<script setup lang="ts">
interface Props {
  color?: string
  withDot?: boolean
}

withDefaults(defineProps<Props>(), {
  color: '#B000FF',
  withDot: false,
})
</script>

<template>
  <div
    class="inline-flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[1.4px]"
    :style="{ color }"
  >
    <span
      v-if="withDot"
      class="w-1.5 h-1.5 rounded-full inline-block"
      :style="{ background: color }"
    />
    <slot />
  </div>
</template>
