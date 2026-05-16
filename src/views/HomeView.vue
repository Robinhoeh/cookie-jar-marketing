<script setup lang="ts">
import CookieMeFrame from '@/components/frames/CookieMeFrame.vue'
import CookieShelfFrame from '@/components/frames/CookieShelfFrame.vue'
import CookieDidYouMeanFrame from '@/components/frames/CookieDidYouMeanFrame.vue'
import CookieWhoPersonFrame from '@/components/frames/CookieWhoPersonFrame.vue'
import CookieTakeAllFrame from '@/components/frames/CookieTakeAllFrame.vue'
import CookieHelpFrame from '@/components/frames/CookieHelpFrame.vue'
import Flow1A_Frame2 from '@/components/frames/Flow1A_Frame2.vue'
import Flow2A_Frame1 from '@/components/frames/Flow2A_Frame1.vue'
import Flow4A_Dashboard from '@/components/frames/Flow4A_Dashboard.vue'
import ScaledFrame from '@/components/primitives/ScaledFrame.vue'

const frames = [
  { name: 'CookieMeFrame', component: CookieMeFrame },
  { name: 'CookieShelfFrame', component: CookieShelfFrame },
  { name: 'CookieDidYouMeanFrame', component: CookieDidYouMeanFrame },
  { name: 'CookieWhoPersonFrame', component: CookieWhoPersonFrame },
  { name: 'CookieTakeAllFrame', component: CookieTakeAllFrame },
  { name: 'CookieHelpFrame', component: CookieHelpFrame },
  { name: 'Flow1A_Frame2', component: Flow1A_Frame2 },
  { name: 'Flow2A_Frame1', component: Flow2A_Frame1 },
]
</script>

<template>
  <section class="mx-auto max-w-[1280px] px-4 min-[640px]:px-6 py-12">
    <div class="bg-cream-tint border border-cream-border rounded-2xl p-6 mb-10">
      <p class="font-mono text-[12px] uppercase tracking-[1.4px] text-purple font-bold mb-2">
        Phase 2 sandbox · temporary
      </p>
      <h1 class="font-display text-[28px] text-ink m-0">
        Slack mock library — verification view
      </h1>
      <p class="text-[14px] text-ink-muted mt-2 m-0">
        Each frame below is a real Vue component (not a screenshot).
        Once verified, this sandbox is replaced by the actual home page in Phase 3.
      </p>
    </div>

    <div class="flex flex-col gap-12">
      <div v-for="frame in frames" :key="frame.name">
        <div class="flex items-baseline gap-3 mb-4">
          <span class="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-muted font-bold">
            {{ frame.name }}
          </span>
        </div>
        <div class="flex justify-center">
          <component :is="frame.component" />
        </div>
      </div>

      <div>
        <div class="flex items-baseline gap-3 mb-4">
          <span class="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-muted font-bold">
            Flow4A_Dashboard · scaled to 0.62 (rendered size on home page)
          </span>
        </div>
        <div class="flex justify-center">
          <ScaledFrame :scale="0.62">
            <Flow4A_Dashboard />
          </ScaledFrame>
        </div>
      </div>
    </div>
  </section>
</template>
