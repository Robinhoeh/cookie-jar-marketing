<script setup lang="ts">
import SlackWindow from '@/components/slack/SlackWindow.vue'
import Slash from '@/components/slack/Slash.vue'
import { SHELF_TOOLS } from './frameData'

const shelfNames = SHELF_TOOLS.map((t) => t.name)
</script>

<template>
  <SlackWindow channel="general" :max-width="620">
    <div class="text-[11px] text-[#616061] mb-1.5 flex items-center gap-1.5">
      <span
        class="w-3 h-3 rounded-full inline-block relative"
        style="border: 1.5px solid #616061"
      >
        <span
          class="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full"
          style="background: #616061"
        />
      </span>
      Only visible to you
    </div>
    <div class="text-[14px] text-[#1D1C1D] leading-[1.7]">
      <b class="font-bold">githb</b> isn't on the shelf. Did you mean <Slash>/cookie github</Slash>?
    </div>
    <div class="text-[14px] text-[#1D1C1D] mt-2.5 leading-[1.9]">
      On the shelf:
      <template v-for="(name, i) in shelfNames" :key="name">
        <Slash>{{ name }}</Slash><span v-if="i < shelfNames.length - 1" class="text-[#1D1C1D]">, </span>
      </template>
    </div>
  </SlackWindow>
</template>
