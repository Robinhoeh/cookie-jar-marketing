<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { addToSlackUrl } from '@/config/links'
import SlackGlyph from '@/components/marks/SlackGlyph.vue'
import CookieMeFrame from '@/components/frames/CookieMeFrame.vue'
import CookieShelfFrame from '@/components/frames/CookieShelfFrame.vue'
import CookieDidYouMeanFrame from '@/components/frames/CookieDidYouMeanFrame.vue'
import ProblemSection from '@/components/home/ProblemSection.vue'
import WhoForHomeSection from '@/components/home/WhoForHomeSection.vue'
import FinalCtaSection from '@/components/home/FinalCtaSection.vue'

const { t } = useI18n()

const HOME_DESCRIPTION =
  "Slack access management for small teams. /cookie like @teammate clones a coworker's tool list. Request GitHub, Figma, AWS — approve in Slack."

useHead({
  title: 'Cookie Jar — Slack access management',
  meta: [
    { name: 'description', content: HOME_DESCRIPTION },
    { property: 'og:title', content: 'Cookie Jar — Slack access management' },
    { property: 'og:description', content: HOME_DESCRIPTION },
  ],
})
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
          class="font-display font-bold m-0 text-ink text-[40px] leading-[1] tracking-[-1.2px] min-[1024px]:text-[64px] min-[1024px]:leading-[1] min-[1024px]:tracking-[-1.4px]"
        >
          {{ t('home.hero.headlineLine1') }}<br />
          <span class="text-purple">{{ t('home.hero.headlineLine2') }}</span>
        </h1>

        <!-- Dual-audience H2 lines: same broken loop from both sides.
             Green = employee, gold = admin (matches ProblemSection + PipelineSection role colors). -->
        <div class="mt-5 min-[1024px]:mt-7 flex flex-col gap-4 min-[1024px]:gap-5">
          <div>
            <div class="font-mono text-[10.5px] min-[1024px]:text-[11px] font-bold uppercase tracking-[1.2px] text-green">
              {{ t('home.hero.employee.role') }}
            </div>
            <h2 class="font-display font-bold m-0 mt-1 text-[15.5px] min-[1024px]:text-[17px] leading-[1.3] tracking-[-0.2px] text-green">
              {{ t('home.hero.employee.line') }}
            </h2>
          </div>
          <div>
            <div class="font-mono text-[10.5px] min-[1024px]:text-[11px] font-bold uppercase tracking-[1.2px]" style="color: #8A5E00;">
              {{ t('home.hero.admin.role') }}
            </div>
            <h2 class="font-display font-bold m-0 mt-1 text-[15.5px] min-[1024px]:text-[17px] leading-[1.3] tracking-[-0.2px]" style="color: #8A5E00;">
              {{ t('home.hero.admin.line') }}
            </h2>
          </div>
        </div>

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
        </div>

        <p class="mt-4 min-[1024px]:mt-5 text-[13.5px] min-[1024px]:text-[14.5px] text-ink leading-[1.5] m-0 max-w-[520px]">
          {{ t('home.hero.tagline') }}
        </p>

        <div class="mt-[14px] min-[1024px]:mt-4 text-[12.5px] min-[1024px]:text-[13px] text-ink-muted">
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

  <!-- Section 2: PAIN expanded — two-role problem cards -->
  <ProblemSection />

  <!-- Section 3: FIT — sweet spot + honest not-for -->
  <WhoForHomeSection />

  <!-- Section 4: Final CTA -->
  <FinalCtaSection />
</template>
