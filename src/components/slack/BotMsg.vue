<script setup lang="ts">
import CookieJarMark from '@/components/marks/CookieJarMark.vue'

interface Props {
  ts?: string
  avatarBg?: string
}

withDefaults(defineProps<Props>(), {
  ts: '10:42 AM',
  avatarBg: '#B000FF',
})
</script>

<template>
  <div class="flex gap-2.5 items-start py-1.5">
    <div
      class="w-9 h-9 rounded-md flex items-center justify-center shrink-0 relative"
      :style="{ background: avatarBg }"
    >
      <slot name="avatar">
        <CookieJarMark :size="22" />
      </slot>
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-baseline gap-1.5 whitespace-nowrap">
        <span class="font-extrabold text-[15px] text-[#1D1C1D]">Cookie Jar</span>
        <span class="text-[10px] font-bold bg-[#E8E8EA] text-[#616061] px-1 py-px rounded-sm uppercase tracking-wider">App</span>
        <span class="text-[12px] text-[#696A6C]">{{ ts }}</span>
      </div>
      <div class="mt-0.5">
        <slot />
      </div>
    </div>
  </div>
</template>
