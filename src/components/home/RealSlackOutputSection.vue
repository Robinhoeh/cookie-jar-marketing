<script setup lang="ts">
import { computed, markRaw } from 'vue'
import type { Component } from 'vue'
import { useI18n } from 'vue-i18n'
import CodeChip from '@/components/primitives/CodeChip.vue'
import ScrollableMock from '@/components/mobile/ScrollableMock.vue'
import CookieDidYouMeanFrame from '@/components/frames/CookieDidYouMeanFrame.vue'
import CookieMeFrame from '@/components/frames/CookieMeFrame.vue'
import CookieWhoPersonFrame from '@/components/frames/CookieWhoPersonFrame.vue'
import CookieShelfFrame from '@/components/frames/CookieShelfFrame.vue'

const { t, tm, rt } = useI18n()

interface DemoCopy {
  cmd: string
  desc: string
}

// Frames live in code, not i18n — they're not translation content.
// Index aligns with the order in en.json home.realSlackOutput.demos.
const frames: Component[] = [
  markRaw(CookieDidYouMeanFrame),
  markRaw(CookieMeFrame),
  markRaw(CookieWhoPersonFrame),
  markRaw(CookieShelfFrame),
]

const demos = computed(() =>
  (tm('home.realSlackOutput.demos') as DemoCopy[]).map((demo, i) => ({
    cmd: rt(demo.cmd),
    desc: rt(demo.desc),
    component: frames[i],
  })),
)
</script>

<template>
  <section style="background: #FFF3E6;">
    <div
      class="mx-auto max-w-[1180px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-24"
    >
      <!-- Eyebrow -->
      <div
        class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-purple" />
        {{ t('home.realSlackOutput.eyebrow') }}
      </div>

      <!-- Title -->
      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[34px] leading-[1.05] tracking-[-0.8px] min-[1024px]:text-[52px] min-[1024px]:leading-[1.02] min-[1024px]:tracking-[-1px] min-[1024px]:max-w-[780px]"
      >
        {{ t('home.realSlackOutput.titleLine1') }}<br />
        <span class="text-purple">{{ t('home.realSlackOutput.titleLine2') }}</span>
      </h2>

      <!-- Lede -->
      <p
        class="text-[15.5px] min-[1024px]:text-[16px] leading-[1.6] text-ink-muted mt-4 min-[1024px]:mt-5 mb-0 max-w-[660px]"
      >
        {{ t('home.realSlackOutput.lede') }}
      </p>

      <!-- Demo cards: 1 col mobile, 2 col desktop -->
      <div
        class="mt-7 min-[1024px]:mt-11 grid grid-cols-1 min-[1024px]:grid-cols-2 gap-[18px] min-[1024px]:gap-7"
      >
        <article
          v-for="demo in demos"
          :key="demo.cmd"
          class="bg-white rounded-[14px] min-[1024px]:rounded-[16px] border border-cream-border p-4 min-[1024px]:p-6 flex flex-col gap-3.5"
        >
          <div>
            <CodeChip>{{ demo.cmd }}</CodeChip>
            <div class="text-[13.5px] min-[1024px]:text-[14px] text-ink-muted mt-2.5 leading-[1.55]">
              {{ demo.desc }}
            </div>
          </div>
          <!-- Frame: fit-to-card on mobile (smaller cards), 0.7 scale on desktop -->
          <div class="mt-auto flex justify-center">
            <ScrollableMock mode="fit">
              <component :is="demo.component" />
            </ScrollableMock>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
