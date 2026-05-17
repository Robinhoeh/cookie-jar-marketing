<script setup lang="ts">
interface Props {
  color?: string
}

withDefaults(defineProps<Props>(), {
  color: '#B000FF',
})
</script>

<template>
  <span
    class="font-semibold px-1.5 py-px rounded text-[14px]"
    :style="{ background: 'rgba(176,0,255,0.10)', color }"
  >@<slot /></span>
</template>
