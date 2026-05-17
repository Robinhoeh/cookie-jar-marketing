<script setup lang="ts">
import SlackWindow from '@/components/slack/SlackWindow.vue'
import BotMsg from '@/components/slack/BotMsg.vue'
import EphemeralTag from '@/components/slack/EphemeralTag.vue'
import Mention from '@/components/slack/Mention.vue'
import Slash from '@/components/slack/Slash.vue'
import { SHELF_TOOLS } from './frameData'
</script>

<template>
  <SlackWindow dm dm-with="Cookie Jar" :max-width="620">
    <BotMsg ts="1:42 PM">
      <div class="text-[15px] font-extrabold text-[#1D1C1D]">
        The Shelf — Company-wide ({{ SHELF_TOOLS.length }} cookies)
      </div>
      <div class="text-[13.5px] text-[#616061] italic mt-0.5 mb-2.5">
        You or your teammates may already have some of these.
      </div>
      <ul class="list-none p-0 m-0 flex flex-col gap-1">
        <li
          v-for="tool in SHELF_TOOLS"
          :key="tool.name"
          class="text-[14px] text-[#1D1C1D] leading-[1.7] flex items-center flex-wrap gap-1"
        >
          <span class="text-[#1D1C1D] mr-1">•</span>
          <Slash>{{ tool.name }}</Slash>
          <span class="text-[#1D1C1D]">—</span>
          <template v-if="tool.policy === 'auto'">
            <span
              class="inline-flex items-center justify-center w-[18px] h-[18px] rounded text-white text-[11px] font-extrabold"
              style="background: #2BAC76"
            >✓</span>
            <span class="text-[#1D1C1D]">auto-approved</span>
          </template>
          <template v-else>
            <span class="text-[14px]" aria-hidden>🔒</span>
            <span class="text-[#1D1C1D]">approval needed</span>
            <template v-if="tool.owner">
              <span class="text-[#1D1C1D]">— owned by</span>
              <Mention color="#B000FF">{{ tool.owner }}</Mention>
            </template>
          </template>
        </li>
      </ul>
      <div class="mt-3.5 text-[13.5px] text-[#1D1C1D]">
        Manage: <Slash>/cookie shelf add [tool]</Slash> or <Slash>/cookie shelf remove [tool]</Slash>
      </div>
      <EphemeralTag />
    </BotMsg>
  </SlackWindow>
</template>
