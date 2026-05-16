<script setup lang="ts">
import SlackWindow from '@/components/slack/SlackWindow.vue'
import BotMsg from '@/components/slack/BotMsg.vue'
import EphemeralTag from '@/components/slack/EphemeralTag.vue'
import Mention from '@/components/slack/Mention.vue'
import SlackBtn from '@/components/slack/SlackBtn.vue'
import { ROBIN_JAR } from './frameData'

const tools = ROBIN_JAR.map((it) => it.tool)
</script>

<template>
  <SlackWindow dm dm-with="Cookie Jar" :max-width="620">
    <BotMsg ts="1:55 PM">
      <div class="text-[15px] font-extrabold text-[#1D1C1D]">Are you sure?</div>
      <div class="text-[14px] text-[#1D1C1D] mt-2.5 leading-[1.55]">
        This will take <b>{{ tools.length }} cookies</b> from <Mention color="#B000FF">priya</Mention>:
        {{ tools.join(', ') }}.
      </div>
      <div class="text-[14px] text-[#1D1C1D] mt-2.5">This cannot be undone.</div>
      <div class="flex gap-2 mt-3.5">
        <button
          type="button"
          class="rounded-[4px] px-4 py-2 font-slack text-[14px] font-bold cursor-pointer text-white"
          style="background: #E01E5A; border: none;"
        >Take all</button>
        <SlackBtn>Cancel</SlackBtn>
      </div>
      <EphemeralTag />
    </BotMsg>
  </SlackWindow>
</template>
