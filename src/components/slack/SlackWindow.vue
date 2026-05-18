<script setup lang="ts">
interface Props {
  channel?: string
  dm?: boolean
  dmWith?: string
  /** Cap the window's width on wide viewports (px). Below this, the window fills its container. */
  maxWidth?: number
  sub?: string
}

const props = withDefaults(defineProps<Props>(), {
  channel: 'engineering',
  dm: false,
  dmWith: '',
  maxWidth: 560,
  sub: '',
})

const composerLabel = props.dm
  ? `Message ${props.dmWith.replace('@', '')}`
  : `Message #${props.channel}`
</script>

<template>
  <div
    class="group bg-white rounded-[10px] overflow-hidden border border-[#E8E8EA] flex flex-col font-slack w-full"
    :style="{
      maxWidth: maxWidth + 'px',
      boxShadow: '0 6px 24px rgba(45,30,47,0.10), 0 1px 3px rgba(45,30,47,0.06)',
    }"
  >
    <!-- macOS-ish chrome -->
    <div class="bg-slack-purple px-3 py-[7px] flex items-center gap-1.5">
      <span class="w-[11px] h-[11px] rounded-full bg-[#FF5F57] shrink-0" />
      <span class="w-[11px] h-[11px] rounded-full bg-[#FEBC2E] shrink-0" />
      <span class="w-[11px] h-[11px] rounded-full bg-[#28C840] shrink-0" />
      <span class="ml-3 text-white/70 text-[12px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">acme · Slack</span>
      <RouterLink
        to="/pricing"
        class="ml-auto inline-flex items-center gap-1 text-white/85 sm:text-white/45 hover:text-white text-[11px] font-semibold whitespace-nowrap no-underline transition-colors shrink-0 focus-visible:text-white focus-visible:outline-none"
      >
        Try it free
        <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">→</span>
      </RouterLink>
    </div>

    <!-- Channel header -->
    <div
      class="flex items-center gap-2.5 px-[18px] py-3 border-b border-[#E8E8EA] bg-white text-[15px] font-bold text-[#1D1C1D] font-sans min-w-0"
    >
      <template v-if="dm">
        <span class="w-2.5 h-2.5 rounded-full bg-[#2BAC76] shrink-0" />
        <span class="truncate">{{ dmWith }}</span>
        <span class="text-[#696A6C] font-medium text-[13px] ml-1 truncate">(direct message)</span>
      </template>
      <template v-else>
        <span class="text-[#696A6C] font-medium text-[18px] mr-0.5 shrink-0">#</span>
        <span class="truncate">{{ channel }}</span>
        <span v-if="sub" class="text-[#696A6C] font-medium text-[13px] ml-1.5 truncate">{{ sub }}</span>
      </template>
    </div>

    <!-- Body — auto height, content drives growth -->
    <div class="bg-white px-[18px] pt-[18px] pb-[14px] flex-1 text-[#1D1C1D] min-w-0 break-words">
      <slot />
    </div>

    <!-- Composer -->
    <div
      class="mx-[18px] mb-[14px] mt-2 border border-[#DDDDDD] rounded-[6px] px-3 py-2.5 text-[14px] text-[#1D1C1D] flex items-center gap-1.5 bg-white min-w-0"
    >
      <span class="text-[#9A9A9A] shrink-0">＋</span>
      <span class="text-[#9A9A9A] truncate">{{ composerLabel }}</span>
    </div>
  </div>
</template>
