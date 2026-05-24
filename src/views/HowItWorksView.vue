<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { addToSlackUrl } from '@/config/links'
import { RouterLink } from 'vue-router'
import SlackGlyph from '@/components/marks/SlackGlyph.vue'
import VideoSection from '@/components/home/VideoSection.vue'
import SetupSection from '@/components/home/SetupSection.vue'
import PipelineSection from '@/components/home/PipelineSection.vue'
import DashboardSection from '@/components/home/DashboardSection.vue'

const { t, tm, rt } = useI18n()

interface WhoForItem {
  title: string
  body: string
}

const whoForItems = computed(() =>
  (tm('home.whoFor.items') as WhoForItem[]).map((item) => ({
    title: rt(item.title),
    body: rt(item.body),
  })),
)

const HOW_DESCRIPTION =
  'See how Cookie Jar works: install in 3 minutes, assign tool owners, and let your startup request access in Slack with one click. Built for teams without a dedicated IT function.'

useHead({
  title: 'How it works — Cookie Jar',
  meta: [
    { name: 'description', content: HOW_DESCRIPTION },
    { property: 'og:title', content: 'How Cookie Jar works' },
    { property: 'og:description', content: HOW_DESCRIPTION },
  ],
})
</script>

<template>
  <!-- Page header strip -->
  <section style="background: radial-gradient(ellipse at top, #FFE0CF 0%, #FFF3E6 70%);">
    <div
      class="mx-auto max-w-[820px] px-4 min-[640px]:px-6 min-[1024px]:px-8 pt-12 min-[1024px]:pt-20 pb-10 min-[1024px]:pb-14 text-center"
    >
      <div
        class="font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple"
      >
        Cookie Jar
      </div>
      <h1
        class="font-display font-bold text-ink m-0 mt-3 text-[36px] min-[1024px]:text-[56px] leading-[1.05] tracking-[-0.8px]"
      >
        How Cookie Jar works
      </h1>
      <p
        class="mt-4 text-[15.5px] min-[1024px]:text-[17px] text-ink-muted max-w-[640px] mx-auto leading-[1.55]"
      >
        Install, assign owners, then let your team request access in Slack. Three minutes of setup; one click per request from then on.
      </p>
    </div>
  </section>

  <!-- Who Cookie Jar is for -->
  <section class="bg-white border-t border-cream-border">
    <div
      class="mx-auto max-w-[1080px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-20"
    >
      <div class="text-center max-w-[720px] mx-auto">
        <div
          class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-purple" />
          {{ t('home.whoFor.eyebrow') }}
        </div>
        <h2
          class="font-display font-bold text-ink m-0 mt-3 text-[28px] min-[1024px]:text-[40px] leading-[1.1] tracking-[-0.6px]"
        >
          {{ t('home.whoFor.title') }}
        </h2>
      </div>

      <div
        class="mt-9 min-[1024px]:mt-12 grid grid-cols-1 min-[1024px]:grid-cols-2 gap-3.5 min-[1024px]:gap-4"
      >
        <article
          v-for="item in whoForItems"
          :key="item.title"
          class="bg-cream-tint border border-cream-border rounded-[14px] p-5 min-[1024px]:p-6"
        >
          <h3
            class="font-display font-bold text-ink m-0 text-[18px] min-[1024px]:text-[20px] tracking-[-0.2px]"
          >
            {{ item.title }}
          </h3>
          <p
            class="text-[14px] min-[1024px]:text-[14.5px] text-ink-muted leading-[1.55] mt-2 m-0"
          >
            {{ item.body }}
          </p>
        </article>
      </div>
    </div>
  </section>

  <!-- 60-second walkthrough -->
  <VideoSection />

  <!-- Step 1: Setup -->
  <SetupSection />

  <!-- Step 2: The flow itself -->
  <PipelineSection />

  <!-- Step 3: The admin view -->
  <DashboardSection />

  <!-- Final CTA -->
  <section class="bg-white border-t border-cream-border">
    <div
      class="mx-auto max-w-[760px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[1024px]:py-20 text-center"
    >
      <h2
        class="font-display font-bold text-ink m-0 text-[28px] min-[1024px]:text-[40px] leading-[1.1] tracking-[-0.6px]"
      >
        That's the whole product.
      </h2>
      <p
        class="mt-3 text-[15.5px] min-[1024px]:text-[16px] text-ink-muted max-w-[520px] mx-auto"
      >
        First month free. Five minutes to install.
      </p>
      <div class="mt-7 inline-flex items-center gap-3 flex-wrap justify-center">
        <a
          :href="addToSlackUrl"
          class="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-[10px] bg-ink text-gold text-[16px] font-bold no-underline hover:brightness-110 transition"
        >
          <SlackGlyph :size="20" />
          Add to Slack
        </a>
        <RouterLink
          to="/pricing"
          class="inline-flex items-center justify-center gap-1.5 px-2 py-4 text-ink text-[16px] font-semibold no-underline"
        >
          See pricing <span class="text-purple">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
