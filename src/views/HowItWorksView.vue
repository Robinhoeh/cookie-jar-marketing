<script setup lang="ts">
import { addToSlackUrl } from '@/config/links'
import { RouterLink } from 'vue-router'
import SlackGlyph from '@/components/marks/SlackGlyph.vue'
import VideoSection from '@/components/home/VideoSection.vue'
import SetupSection from '@/components/home/SetupSection.vue'
import PipelineSection from '@/components/home/PipelineSection.vue'
import DashboardSection from '@/components/home/DashboardSection.vue'
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
