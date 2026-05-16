<script setup lang="ts">
import SlackWindow from '@/components/slack/SlackWindow.vue'
import BotMsg from '@/components/slack/BotMsg.vue'
import EphemeralTag from '@/components/slack/EphemeralTag.vue'
import Mention from '@/components/slack/Mention.vue'
import Slash from '@/components/slack/Slash.vue'
import { ROBIN_JAR } from './frameData'
</script>

<template>
  <SlackWindow channel="general" :max-width="620">
    <BotMsg ts="12:36 PM">
      <div class="text-[14.5px] font-extrabold text-[#1D1C1D] mb-2">
        In <Mention color="#B000FF">priya</Mention>'s jar:
      </div>
      <ul class="list-none p-0 m-0 flex flex-col gap-1">
        <li
          v-for="item in ROBIN_JAR"
          :key="item.tool"
          class="text-[14px] text-[#1D1C1D] leading-[1.65]"
        >
          <span class="text-[#1D1C1D] mr-2">•</span>
          <b class="font-bold">{{ item.tool }}</b>
          <span class="text-[#1D1C1D]"> — from </span>
          <Mention v-if="item.grantor === 'mention'" color="#B000FF">priya</Mention>
          <span v-else class="text-[#1D1C1D]">Priya Shah</span>
        </li>
      </ul>
      <div class="mt-3.5 text-[13.5px] text-[#616061] italic">
        Want the same cookies? Try <Slash>/cookie like @priya</Slash>
      </div>
      <EphemeralTag />
    </BotMsg>
  </SlackWindow>
</template>
