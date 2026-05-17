<script setup lang="ts">
interface Props {
  user: string
  initial: string
  command: string
  color?: string
  ts?: string
}

withDefaults(defineProps<Props>(), {
  color: '#B000FF',
  ts: '10:42 AM',
})
</script>

<template>
  <div class="flex gap-2.5 items-start py-1.5">
    <div
      class="w-9 h-9 rounded-md flex items-center justify-center font-display font-bold text-[18px] text-white shrink-0"
      :style="{ background: color }"
    >
      {{ initial }}
    </div>
    <div class="flex-1">
      <div class="flex items-baseline gap-1.5 whitespace-nowrap">
        <span class="font-extrabold text-[15px] text-[#1D1C1D]">{{ user }}</span>
        <span class="text-[12px] text-[#696A6C]">{{ ts }}</span>
      </div>
      <div class="mt-0.5 text-[14.5px]">
        <span class="font-mono text-[13px] text-blue bg-[#F4F4F4] px-1.5 py-0.5 rounded whitespace-nowrap">
          /{{ command }}
        </span>
        <span v-if="$slots.default" class="ml-1.5 text-[#1D1C1D]">
          <slot />
        </span>
      </div>
    </div>
  </div>
</template>
