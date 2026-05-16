<script setup lang="ts">
interface Props {
  ts?: string
}

withDefaults(defineProps<Props>(), {
  ts: '10:42 AM',
})
</script>

<template>
  <div class="flex gap-2.5 items-start py-1.5">
    <div class="w-9 h-9 rounded-md overflow-hidden shrink-0 relative">
      <slot name="avatar">
        <!-- Default: Cookie Jar marketplace logo (matches the real Slack app icon) -->
        <img
          src="/cookie-jar-icon-2048-slack-marketplace.png"
          alt=""
          class="w-full h-full block"
          width="36"
          height="36"
        />
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
