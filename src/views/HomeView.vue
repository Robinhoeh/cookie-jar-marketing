<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { addToSlackUrl, signInUrl } from '@/config/links'
import SlackGlyph from '@/components/marks/SlackGlyph.vue'
import CookieMeFrame from '@/components/frames/CookieMeFrame.vue'
import CookieShelfFrame from '@/components/frames/CookieShelfFrame.vue'
import CookieDidYouMeanFrame from '@/components/frames/CookieDidYouMeanFrame.vue'
import ProblemSection from '@/components/home/ProblemSection.vue'
import PipelineSection from '@/components/home/PipelineSection.vue'
import Standout1Section from '@/components/home/Standout1Section.vue'
import Standout2Section from '@/components/home/Standout2Section.vue'
import Standout3Section from '@/components/home/Standout3Section.vue'
import OffboardingSection from '@/components/home/OffboardingSection.vue'
import FeaturesGridSection from '@/components/home/FeaturesGridSection.vue'
import RealSlackOutputSection from '@/components/home/RealSlackOutputSection.vue'
import DashboardSection from '@/components/home/DashboardSection.vue'
import SetupSection from '@/components/home/SetupSection.vue'
import ProRoadmapSection from '@/components/home/ProRoadmapSection.vue'
import TrustSection from '@/components/home/TrustSection.vue'
import FaqSection from '@/components/home/FaqSection.vue'
import FinalCtaSection from '@/components/home/FinalCtaSection.vue'

const { t } = useI18n()
</script>

<template>
  <!-- HERO -->
  <section
    id="home-hero"
    class="relative overflow-hidden"
    style="background: radial-gradient(ellipse at top right, #FFE0CF 0%, #FFF3E6 55%);"
  >
    <div
      class="mx-auto max-w-[1180px] px-4 min-[640px]:px-6 min-[1024px]:px-8 pt-9 min-[640px]:pt-16 min-[1024px]:pt-24 pb-0 min-[1024px]:py-24 min-[1024px]:grid min-[1024px]:grid-cols-[1.05fr_1fr] min-[1024px]:gap-[60px] min-[1024px]:items-center"
    >
      <!-- Left: copy -->
      <div>
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-cream-border text-[11.5px] min-[1024px]:text-[12.5px] text-ink font-semibold mb-4 min-[1024px]:mb-6 whitespace-nowrap"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-green shrink-0" />
          <span class="min-[1024px]:hidden">{{ t('home.hero.statusPillMobile') }}</span>
          <span class="hidden min-[1024px]:inline">{{ t('home.hero.statusPillDesktop') }}</span>
        </div>

        <h1
          class="font-display font-bold m-0 text-ink text-[44px] leading-[1] tracking-[-1.3px] min-[1024px]:text-[76px] min-[1024px]:leading-[0.98] min-[1024px]:tracking-[-1.6px]"
        >
          {{ t('home.hero.headlineLine1') }}<br />
          {{ t('home.hero.headlineLine2') }}<br />
          <span class="text-purple">{{ t('home.hero.headlineLine3') }}</span>
        </h1>

        <p
          class="font-display font-semibold text-ink text-[17px] leading-[1.4] mt-[18px] mb-0 tracking-[-0.2px] min-[1024px]:text-[22px] min-[1024px]:mt-7 min-[1024px]:tracking-[-0.3px] min-[1024px]:max-w-[520px]"
        >
          {{ t('home.hero.subheadline') }}
        </p>
        <p
          class="text-[14.5px] leading-[1.55] text-ink-muted mt-2 mb-0 min-[1024px]:text-[17px] min-[1024px]:mt-3 min-[1024px]:max-w-[480px]"
        >
          {{ t('home.hero.lede') }}
        </p>

        <!-- CTAs: full-width stacked on mobile, inline on desktop -->
        <div
          class="flex flex-col gap-2.5 mt-6 min-[1024px]:flex-row min-[1024px]:gap-3 min-[1024px]:items-center min-[1024px]:flex-wrap min-[1024px]:mt-8"
        >
          <a
            :href="addToSlackUrl"
            class="inline-flex items-center justify-center gap-2.5 px-5 py-[15px] rounded-[12px] bg-ink text-gold text-[16px] font-bold no-underline hover:brightness-110 transition min-[1024px]:rounded-[10px] min-[1024px]:py-3.5 min-[1024px]:px-5 min-[1024px]:text-[15px] min-[1024px]:justify-start"
          >
            <SlackGlyph :size="18" />
            {{ t('home.hero.ctaPrimary') }}
          </a>
          <a
            :href="signInUrl"
            class="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-[12px] border border-cream-border bg-white text-ink text-[15px] font-semibold no-underline min-[1024px]:border-0 min-[1024px]:bg-transparent min-[1024px]:px-1 min-[1024px]:py-3.5"
          >
            {{ t('home.hero.ctaSecondary') }} <span class="text-purple">→</span>
          </a>
        </div>

        <div class="mt-[18px] min-[1024px]:mt-7 text-[12.5px] min-[1024px]:text-[13px] text-ink-muted">
          {{ t('home.hero.finePrint') }}
        </div>
      </div>

      <!-- Right: stacked Slack mocks -->
      <!-- Mobile: 2 mocks layered with rotation, bleed edge-to-edge.
           Desktop: 3 mocks scaled + overlapped within the column. -->
      <div class="mt-9 min-[1024px]:mt-0 min-[1024px]:relative">
        <!-- Mobile layout — front mock shifted right so its rotated edge isn't clipped,
             back mock bleeds to the right viewport edge.
             Negative right margin lets the back card bleed; left edge stays inside the
             cream background so it sits behind the cards instead of around them. -->
        <div class="relative h-[290px] min-[1024px]:hidden -mr-4 min-[640px]:-mr-6">
          <div
            class="absolute top-0 left-3 min-[400px]:left-6 z-20"
            style="transform: rotate(-3deg); filter: drop-shadow(0 12px 24px rgba(45,30,47,0.18));"
          >
            <CookieMeFrame />
          </div>
          <div
            class="absolute top-6 right-0 z-10"
            style="transform: rotate(5deg); filter: drop-shadow(0 12px 24px rgba(45,30,47,0.18)); opacity: 0.95;"
          >
            <CookieShelfFrame />
          </div>
        </div>

        <!-- Desktop layout — matches design exactly: scale 0.85 / 0.62 / 0.6, opacity 0.92 on back mocks. -->
        <div class="hidden min-[1024px]:block relative">
          <div
            class="relative z-20"
            style="transform: rotate(-2deg);"
          >
            <div style="transform: scale(0.85); transform-origin: top left;">
              <CookieMeFrame />
            </div>
          </div>
          <div
            class="absolute -top-6 -right-6 z-10"
            style="transform: rotate(4deg); opacity: 0.92; filter: drop-shadow(0 12px 24px rgba(45,30,47,0.12));"
          >
            <div style="transform: scale(0.62); transform-origin: top right;">
              <CookieShelfFrame />
            </div>
          </div>
          <div
            class="absolute -bottom-9 -left-7 z-10"
            style="transform: rotate(-5deg); opacity: 0.92; filter: drop-shadow(0 12px 24px rgba(45,30,47,0.12));"
          >
            <div style="transform: scale(0.6); transform-origin: bottom left;">
              <CookieDidYouMeanFrame />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section break — dashed line marks hero → Problem transition on all viewports -->
  <div class="mx-auto max-w-[1180px] px-4 min-[640px]:px-6 min-[1024px]:px-8">
    <div class="border-t border-dashed border-cream-border-2" />
  </div>

  <!-- Section 2: The Problem -->
  <ProblemSection />

  <!-- Section 3: How-it-works pipeline -->
  <PipelineSection />

  <!-- Section 4: Standout feature 1 — /cookie like @sarah -->
  <Standout1Section />

  <!-- Section 5: Standout feature 2 — Owners, not the CTO inbox -->
  <Standout2Section />

  <!-- Section 6: Standout feature 3 — Slack-first -->
  <Standout3Section />

  <!-- Section 7: Offboarding (Pro roadmap, dark plum) -->
  <OffboardingSection />

  <!-- Section 8: Features grid — what's in the jar today (dark continuation) -->
  <FeaturesGridSection />

  <!-- Section 9: Real Slack output — 4 command demos -->
  <RealSlackOutputSection />

  <!-- Section 10: Dashboard strip — the admin view -->
  <DashboardSection />

  <!-- Section 11: Five-minute setup — 3 numbered cards + CTA -->
  <SetupSection />

  <!-- Section 12: What's coming · Pro — 8 roadmap cards -->
  <ProRoadmapSection />

  <!-- Section 13: Trust & security — 7 checks + dark honesty card + sec FAQ accordion -->
  <TrustSection />

  <!-- Section 14: Product FAQ accordion -->
  <FaqSection />

  <!-- Section 15: Final CTA — centered, 🍪 emoji -->
  <FinalCtaSection />
</template>
