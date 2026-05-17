<script setup lang="ts">
type Variant = 'default' | 'primary' | 'danger' | 'coral' | 'purple' | 'gold'

interface Props {
  variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const variants: Record<Variant, { bg: string; color: string; border: string }> = {
  default: { bg: '#FFFFFF', color: '#1D1C1D', border: '1px solid #DDDDDD' },
  primary: { bg: '#007a5a', color: '#fff', border: '1px solid #007a5a' },
  danger:  { bg: '#FFFFFF', color: '#A12923', border: '1px solid #DDDDDD' },
  coral:   { bg: '#FF6B6B', color: '#fff', border: '1px solid #FF6B6B' },
  purple:  { bg: '#B000FF', color: '#fff', border: '1px solid #B000FF' },
  gold:    { bg: '#FFB703', color: '#2D1E2F', border: '1px solid #FFB703' },
}

const v = variants[props.variant]
</script>

<template>
  <button
    type="button"
    class="rounded-[4px] px-[13px] py-[7px] font-slack text-[14px] font-bold cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 hover:brightness-105 transition"
    :style="{ background: v.bg, color: v.color, border: v.border }"
  >
    <slot name="icon" />
    <slot />
  </button>
</template>
