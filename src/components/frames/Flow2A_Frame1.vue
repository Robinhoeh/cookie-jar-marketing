<script setup lang="ts">
import SlackWindow from '@/components/slack/SlackWindow.vue'
import BotMsg from '@/components/slack/BotMsg.vue'
import BotCard from '@/components/slack/BotCard.vue'
import Mention from '@/components/slack/Mention.vue'
import SlackBtn from '@/components/slack/SlackBtn.vue'
</script>

<template>
  <SlackWindow dm dm-with="Cookie Jar" :max-width="560">
    <BotMsg>
      <BotCard accent="#B000FF" tint="#FFF8EE">
        <div class="flex items-center gap-2.5 mb-2.5">
          <div
            class="w-9 h-9 rounded-full text-white flex items-center justify-center font-display font-bold text-[16px] shrink-0"
            style="background: #FF6B6B"
          >M</div>
          <div>
            <div class="text-[14px] text-ink">
              <Mention>marcus</Mention> wants <b>github</b>
            </div>
            <div class="text-[12px] text-ink-muted">
              org: acme-inc · role: member · 2 min ago
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-lg px-3 py-2.5 border border-cream-border text-[13.5px] text-ink italic leading-[1.5]"
        >
          "joining the API team this week — need it for the auth refactor."
        </div>

        <div class="flex gap-2 mt-3 items-center">
          <SlackBtn variant="primary">
            <template #icon><span>✓</span></template>
            Approve
          </SlackBtn>
          <SlackBtn variant="danger">Deny</SlackBtn>
          <SlackBtn>Ask why</SlackBtn>
          <span class="ml-auto text-[11.5px] text-ink-muted">You + 2 co-owners</span>
        </div>
      </BotCard>
    </BotMsg>
  </SlackWindow>
</template>
