<script setup lang="ts">
import SlackWindow from '@/components/slack/SlackWindow.vue'
import BotMsg from '@/components/slack/BotMsg.vue'
import BotCard from '@/components/slack/BotCard.vue'
import EphemeralTag from '@/components/slack/EphemeralTag.vue'
import SlackBtn from '@/components/slack/SlackBtn.vue'

interface Tool {
  name: string
  note: string
  checked: boolean
  owner: string
}

const tools: Tool[] = [
  { name: 'GitHub',    note: 'org: acme-inc',          checked: true,  owner: 'Priya' },
  { name: 'Linear',    note: 'workspace: acme',        checked: true,  owner: 'auto' },
  { name: 'Figma',     note: 'team: design-system',    checked: true,  owner: 'Eli' },
  { name: 'Vercel',    note: 'team: acme-prod',        checked: true,  owner: 'Priya' },
  { name: 'Sentry',    note: 'project: api',           checked: false, owner: 'Devon' },
  { name: 'PagerDuty', note: 'on-call: backend',       checked: false, owner: 'Devon' },
]
</script>

<template>
  <SlackWindow channel="engineering" :max-width="560">
    <BotMsg>
      <BotCard accent="#B000FF" tint="#FFF8EE">
        <div class="font-display font-bold text-[19px] text-ink">Cloning Sarah's jar 🍪</div>
        <div class="text-[14px] text-ink-muted mt-0.5 mb-3">
          Sarah has <b class="text-ink">6 cookies</b>. Pick which ones Marcus needs.
        </div>

        <div class="flex flex-col gap-1.5">
          <label
            v-for="tool in tools"
            :key="tool.name"
            class="flex items-start gap-2.5 px-2.5 py-2 bg-white rounded-lg border border-cream-border cursor-pointer"
          >
            <span
              class="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center text-white text-[12px] font-extrabold shrink-0 mt-0.5"
              :style="tool.checked
                ? { background: '#B000FF', border: '1px solid #B000FF' }
                : { background: '#FFFFFF', border: '1.5px solid #C7BBC9' }"
            >{{ tool.checked ? '✓' : '' }}</span>
            <div class="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span class="text-[14px] font-bold text-ink">{{ tool.name }}</span>
              <span class="font-mono text-[11.5px] text-ink-muted truncate">{{ tool.note }}</span>
              <span class="min-[420px]:ml-auto text-[11.5px] text-ink-muted">
                <span v-if="tool.owner === 'auto'" class="text-green font-bold">auto-approved</span>
                <template v-else>owner: <b class="text-ink font-semibold">{{ tool.owner }}</b></template>
              </span>
            </div>
          </label>
        </div>

        <div class="flex gap-2 mt-3.5 items-center flex-wrap">
          <SlackBtn variant="purple">
            <template #icon><span>🍪</span></template>
            Request 4 cookies
          </SlackBtn>
          <SlackBtn>Cancel</SlackBtn>
          <span class="min-[420px]:ml-auto text-[12px] text-ink-muted">4 selected · 3 owners pinged</span>
        </div>
      </BotCard>
      <EphemeralTag />
    </BotMsg>
  </SlackWindow>
</template>
