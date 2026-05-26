<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { RouterLink } from 'vue-router'
import { addToSlackUrl, supportEmail } from '@/config/links'
import SlackGlyph from '@/components/marks/SlackGlyph.vue'

const { t, tm, rt } = useI18n()

const PRICING_DESCRIPTION =
  'Simple flat pricing for startups and small teams. 30-day free trial, no credit card required. One price covers your whole Slack workspace.'

useHead({
  title: 'Pricing — Cookie Jar',
  meta: [
    { name: 'description', content: PRICING_DESCRIPTION },
    { property: 'og:title', content: 'Pricing — Cookie Jar' },
    { property: 'og:description', content: PRICING_DESCRIPTION },
  ],
})

type Billing = 'monthly' | 'yearly'

// Persist toggle across visits/reloads. localStorage chosen over a cookie
// because this is purely client-side state — cookies would add request overhead
// and trip GDPR cookie-banner expectations for no real benefit.
const BILLING_STORAGE_KEY = 'pricing-billing'
function loadBilling(): Billing {
  try {
    const v = localStorage.getItem(BILLING_STORAGE_KEY)
    return v === 'yearly' ? 'yearly' : 'monthly'
  } catch {
    return 'monthly'
  }
}
const billing = ref<Billing>(loadBilling())
watch(billing, (value) => {
  try {
    localStorage.setItem(BILLING_STORAGE_KEY, value)
  } catch {
    /* private mode / disabled storage — silent */
  }
})

// Tier feature lists are arrays in i18n — pull them with tm/rt.
const starterFeatures = computed(() =>
  (tm('pricing.tiers.starter.featuresIncluded') as string[]).map((s) => rt(s))
)
const starterExcluded = computed(() =>
  (tm('pricing.tiers.starter.featuresExcluded') as string[]).map((s) => rt(s))
)
const proFeatures = computed(() =>
  (tm('pricing.tiers.pro.featuresIncluded') as string[]).map((s) => rt(s))
)
const proPipeline = computed(() =>
  (tm('pricing.tiers.pro.featuresPipeline') as string[]).map((s) => rt(s))
)
const familyFeatures = computed(() =>
  (tm('pricing.tiers.familySize.featuresIncluded') as string[]).map((s) => rt(s))
)
const familyOnRequest = computed(() =>
  (tm('pricing.tiers.familySize.featuresOnRequest') as string[]).map((s) => rt(s))
)

interface Step { n: string; head: string; body: string }
const steps = computed(() =>
  (tm('pricing.howItWorks.steps') as Step[]).map((s) => ({
    n: rt(s.n),
    head: rt(s.head),
    body: rt(s.body),
  }))
)

interface FaqItem { q: string; a?: string; a1?: string; a2?: string }
const faqItems = computed(() =>
  (tm('pricing.faq.items') as FaqItem[]).map((item) => ({
    q: rt(item.q),
    a: item.a ? rt(item.a) : undefined,
    a1: item.a1 ? rt(item.a1) : undefined,
    a2: item.a2 ? rt(item.a2) : undefined,
  }))
)

const openFaqIndex = ref<number | null>(null)
function toggleFaq(i: number) {
  openFaqIndex.value = openFaqIndex.value === i ? null : i
}

const familyMailto = `mailto:${supportEmail}?subject=${encodeURIComponent('Family Size pricing')}`
</script>

<template>
  <!-- overflow-x-hidden defends against any rogue child causing horizontal scroll;
       it also reins in the dark plum CTA's right-side bleed on narrow viewports. -->
  <div class="overflow-x-hidden">
  <!-- HERO + billing toggle -->
  <section class="bg-cream-tint">
    <div class="mx-auto max-w-[880px] px-4 min-[640px]:px-6 min-[1024px]:px-8 pt-14 min-[640px]:pt-20 min-[1024px]:pt-24 pb-6 min-[640px]:pb-8 text-center">
      <div class="font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple">
        {{ t('pricing.eyebrow') }}
      </div>
      <h1
        class="font-display font-bold text-ink m-0 mt-3.5 text-[44px] leading-[1] tracking-[-1.3px] min-[1024px]:text-[72px] min-[1024px]:leading-[0.98] min-[1024px]:tracking-[-1.6px]"
      >
        {{ t('pricing.titleLine1') }}<br />
        <span class="text-purple">{{ t('pricing.titleLine2') }}</span>
      </h1>
      <p
        class="text-[15.5px] min-[1024px]:text-[18px] leading-[1.55] text-ink-muted mt-5 min-[1024px]:mt-[22px] mb-0 max-w-[620px] mx-auto"
      >
        {{ t('pricing.lede') }}
      </p>
      <p class="mt-3 text-[14px] min-[1024px]:text-[15px] text-ink-muted">
        New to Cookie Jar?
        <RouterLink to="/how-it-works" class="font-semibold text-purple no-underline hover:underline">See how it works →</RouterLink>
      </p>

      <!-- Billing toggle -->
      <div class="mt-8 min-[1024px]:mt-9 inline-flex items-center gap-1 p-1 rounded-full bg-white border border-cream-border">
        <button
          v-for="value in (['monthly', 'yearly'] as Billing[])"
          :key="value"
          type="button"
          class="px-5 py-2 rounded-full border-0 cursor-pointer font-bold text-[13.5px] inline-flex items-center gap-2 transition"
          :class="billing === value
            ? 'bg-ink text-gold'
            : 'bg-transparent text-ink-muted hover:text-ink'"
          @click="billing = value"
        >
          {{ value === 'monthly' ? t('pricing.toggle.monthly') : t('pricing.toggle.yearly') }}
          <span
            v-if="value === 'yearly'"
            class="text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider"
            :class="billing === 'yearly'
              ? 'bg-gold text-ink'
              : 'bg-[#FFE0CF] text-ink'"
          >{{ t('pricing.toggle.yearlyBadge') }}</span>
        </button>
      </div>
      <div class="mt-3 text-[13px] text-ink-muted">
        {{ billing === 'yearly' ? t('pricing.toggle.yearlyHint') : t('pricing.toggle.monthlyHint') }}
      </div>
    </div>
  </section>

  <!-- TIERS -->
  <section class="bg-cream-tint">
    <div
      class="mx-auto max-w-[1180px] px-4 min-[640px]:px-6 min-[1024px]:px-8 pt-6 min-[640px]:pt-10 pb-14 min-[640px]:pb-20"
    >
      <div class="grid grid-cols-1 min-[1024px]:grid-cols-3 gap-4 min-[1024px]:gap-[18px] items-stretch">
        <!-- Starter -->
        <article class="bg-white rounded-[18px] p-7 min-[1024px]:p-8 border border-cream-border flex flex-col">
          <div class="font-display font-bold text-[26px] text-ink">
            {{ t('pricing.tiers.starter.name') }}
          </div>
          <p class="text-[13.5px] text-ink-muted mt-1 leading-[1.45] m-0">
            {{ t('pricing.tiers.starter.tagline') }}
          </p>
          <div class="mt-6 flex items-baseline gap-1.5 flex-wrap">
            <span
              class="font-display font-bold text-[60px] text-ink leading-none tracking-[-1.5px]"
            >${{ billing === 'yearly' ? t('pricing.tiers.starter.yearlyPrice') : t('pricing.tiers.starter.monthlyPrice') }}</span>
            <span class="text-[14px] text-ink-muted">/month</span>
          </div>
          <p class="text-[13px] text-ink-muted mt-1.5 leading-[1.5] m-0">
            {{ billing === 'yearly' ? t('pricing.tiers.starter.yearlyMeta') : t('pricing.tiers.starter.monthlyMeta') }}
            <span class="block text-ink-faint mt-0.5">{{ t('pricing.tiers.starter.metaSub') }}</span>
          </p>
          <a
            :href="addToSlackUrl"
            class="mt-6 inline-flex items-center justify-center gap-2 px-[18px] py-3 rounded-[10px] bg-white border border-ink text-ink text-[14px] font-bold no-underline hover:bg-cream-tint transition"
          >
            <SlackGlyph :size="15" />
            {{ t('pricing.tiers.starter.ctaLabel') }}
          </a>

          <!-- Included features -->
          <div class="mt-6 border-t border-cream-border-2 pt-[18px]">
            <div class="font-mono text-[11px] font-bold uppercase tracking-[1px] text-ink-muted mb-3">
              {{ t('pricing.tiers.starter.featuredListTitle') }}
            </div>
            <ul class="list-none p-0 m-0 flex flex-col gap-2.5">
              <li v-for="(item, i) in starterFeatures" :key="i" class="flex gap-2.5 text-[13.5px] text-ink leading-[1.45]">
                <span class="text-green font-extrabold shrink-0">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Excluded -->
          <div class="mt-6 border-t border-cream-border-2 pt-[18px]">
            <div class="font-mono text-[11px] font-bold uppercase tracking-[1px] text-ink-faint mb-3">
              {{ t('pricing.tiers.starter.excludedListTitle') }}
            </div>
            <ul class="list-none p-0 m-0 flex flex-col gap-2.5">
              <li v-for="(item, i) in starterExcluded" :key="i" class="flex gap-2.5 text-[13.5px] leading-[1.45]" style="color: #9A8E9A;">
                <span class="font-extrabold shrink-0" style="color: #C9BCC9;">–</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </article>

        <!-- Pro (featured, dark plum) -->
        <article
          class="rounded-[18px] p-7 min-[1024px]:p-8 flex flex-col relative min-[1024px]:scale-[1.025] shadow-xl"
          style="background: #2D1E2F; color: #FFF3E6;"
        >
          <div
            class="absolute -top-3 right-6 font-mono font-extrabold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap"
            style="background: #FFB703; color: #2D1E2F; font-size: 11px; letter-spacing: 0.6px;"
          >
            {{ t('pricing.tiers.pro.badge') }}
          </div>
          <div class="font-display font-bold text-[26px]" style="color: #FFF3E6;">
            {{ t('pricing.tiers.pro.name') }} 🍪
          </div>
          <p class="text-[13.5px] mt-1 leading-[1.45] m-0" style="color: rgba(255,243,230,0.7);">
            {{ t('pricing.tiers.pro.tagline') }}
          </p>
          <div class="mt-6 flex items-baseline gap-1.5 flex-wrap">
            <span class="font-display font-bold text-[60px] leading-none tracking-[-1.5px]" style="color: #FFB703;">
              ${{ billing === 'yearly' ? t('pricing.tiers.pro.yearlyPrice') : t('pricing.tiers.pro.monthlyPrice') }}
            </span>
            <span class="text-[14px]" style="color: rgba(255,243,230,0.7);">/month</span>
          </div>
          <p class="text-[13px] mt-1.5 leading-[1.5] m-0" style="color: rgba(255,243,230,0.6);">
            {{ billing === 'yearly' ? t('pricing.tiers.pro.yearlyMeta') : t('pricing.tiers.pro.monthlyMeta') }}
            <span class="block mt-0.5" style="color: rgba(255,243,230,0.5);">{{ t('pricing.tiers.pro.metaSub') }}</span>
          </p>
          <a
            :href="addToSlackUrl"
            class="mt-6 inline-flex items-center justify-center gap-2 px-[18px] py-3 rounded-[10px] border-0 text-[14px] font-extrabold no-underline transition hover:brightness-110"
            style="background: #FFB703; color: #2D1E2F;"
          >
            <SlackGlyph :size="15" />
            {{ t('pricing.tiers.pro.ctaLabel') }}
          </a>

          <!-- Included -->
          <div class="mt-6 pt-[18px] border-t" style="border-color: rgba(255,243,230,0.15);">
            <div class="font-mono text-[11px] font-bold uppercase tracking-[1px] mb-3" style="color: rgba(255,243,230,0.6);">
              {{ t('pricing.tiers.pro.includedListTitle') }}
            </div>
            <ul class="list-none p-0 m-0 flex flex-col gap-2.5">
              <li v-for="(item, i) in proFeatures" :key="i" class="flex gap-2.5 text-[13.5px] leading-[1.45]" style="color: #FFF3E6;">
                <span class="font-extrabold shrink-0" style="color: #FFB703;">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Pipeline -->
          <div class="mt-6 pt-[18px] border-t" style="border-color: rgba(255,243,230,0.15);">
            <div class="font-mono text-[11px] font-bold uppercase tracking-[1px] mb-3" style="color: rgba(255,243,230,0.6);">
              {{ t('pricing.tiers.pro.pipelineListTitle') }}
            </div>
            <ul class="list-none p-0 m-0 flex flex-col gap-2.5">
              <li v-for="(item, i) in proPipeline" :key="i" class="flex gap-2.5 text-[13.5px] leading-[1.45]" style="color: #FFF3E6;">
                <span class="font-extrabold shrink-0" style="color: #FFB703;">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </article>

        <!-- Family Size -->
        <article class="bg-white rounded-[18px] p-7 min-[1024px]:p-8 border border-cream-border flex flex-col">
          <div class="font-display font-bold text-[26px] text-ink">
            {{ t('pricing.tiers.familySize.name') }}
          </div>
          <p class="text-[13.5px] text-ink-muted mt-1 leading-[1.45] m-0">
            {{ t('pricing.tiers.familySize.tagline') }}
          </p>
          <div class="mt-6 flex items-baseline gap-2 flex-wrap">
            <span class="font-display font-bold text-[44px] text-purple leading-none tracking-[-1px]">
              {{ t('pricing.tiers.familySize.priceLabel') }}
            </span>
          </div>
          <p class="text-[13px] text-ink-muted mt-1.5 leading-[1.5] m-0">
            {{ t('pricing.tiers.familySize.meta') }}
          </p>
          <a
            :href="familyMailto"
            class="mt-6 inline-flex items-center justify-center gap-2 px-[18px] py-3 rounded-[10px] bg-white border border-ink text-ink text-[14px] font-bold no-underline hover:bg-cream-tint transition"
          >
            📅 {{ t('pricing.tiers.familySize.ctaLabel') }}
          </a>

          <!-- Included -->
          <div class="mt-6 border-t border-cream-border-2 pt-[18px]">
            <div class="font-mono text-[11px] font-bold uppercase tracking-[1px] text-ink-muted mb-3">
              {{ t('pricing.tiers.familySize.includedListTitle') }}
            </div>
            <ul class="list-none p-0 m-0 flex flex-col gap-2.5">
              <li v-for="(item, i) in familyFeatures" :key="i" class="flex gap-2.5 text-[13.5px] text-ink leading-[1.45]">
                <span class="text-green font-extrabold shrink-0">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- On request -->
          <div class="mt-6 border-t border-cream-border-2 pt-[18px]">
            <div class="font-mono text-[11px] font-bold uppercase tracking-[1px] text-ink-faint mb-3">
              {{ t('pricing.tiers.familySize.onRequestListTitle') }}
            </div>
            <ul class="list-none p-0 m-0 flex flex-col gap-2.5">
              <li v-for="(item, i) in familyOnRequest" :key="i" class="flex gap-2.5 text-[13.5px] leading-[1.45]" style="color: #9A8E9A;">
                <span class="font-extrabold shrink-0" style="color: #C9BCC9;">–</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>

      <p class="max-w-[760px] mx-auto mt-10 text-center text-[14px] text-ink-muted leading-[1.6]">
        {{ t('pricing.flatNote') }}
      </p>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="bg-white">
    <div class="mx-auto max-w-[980px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-20">
      <div class="font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-green">
        {{ t('pricing.howItWorks.eyebrow') }}
      </div>
      <h2 class="font-display font-bold m-0 mt-3 text-[30px] min-[1024px]:text-[40px] leading-[1.05] tracking-[-0.8px] text-ink">
        {{ t('pricing.howItWorks.title') }}
      </h2>

      <ol class="list-none p-0 m-0 mt-8 flex flex-col gap-3.5">
        <li
          v-for="step in steps"
          :key="step.n"
          class="flex gap-4 min-[640px]:gap-[18px] items-start bg-cream-tint rounded-[12px] p-4 min-[640px]:p-5 border border-cream-border"
        >
          <div
            class="shrink-0 w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-display font-extrabold text-[17px]"
            style="background: #16A34A;"
          >{{ step.n }}</div>
          <div>
            <div class="font-display font-bold text-[16px] min-[640px]:text-[17px] text-ink">
              {{ step.head }}
            </div>
            <p class="text-[14px] min-[640px]:text-[14.5px] text-ink-muted mt-1 leading-[1.55] m-0">
              {{ step.body }}
            </p>
          </div>
        </li>
      </ol>
      <p class="text-[14px] text-ink-muted mt-[18px] leading-[1.6]">
        {{ t('pricing.howItWorks.footnote') }}
      </p>
    </div>
  </section>

  <!-- FAQ -->
  <section class="bg-cream-tint">
    <div class="mx-auto max-w-[820px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-20">
      <div class="font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple text-center">
        {{ t('pricing.faq.eyebrow') }}
      </div>
      <h2 class="font-display font-bold m-0 mt-3 text-[32px] min-[1024px]:text-[44px] leading-[1.05] tracking-[-0.8px] text-ink text-center">
        {{ t('pricing.faq.title') }}
      </h2>

      <ul class="list-none p-0 m-0 mt-9 flex flex-col gap-3">
        <li
          v-for="(faq, i) in faqItems"
          :key="faq.q"
          class="border border-cream-border rounded-[12px] overflow-hidden bg-white"
        >
          <button
            type="button"
            class="w-full flex items-center justify-between gap-4 px-4 min-[1024px]:px-[22px] py-4 min-[1024px]:py-[18px] text-left bg-transparent border-0 cursor-pointer"
            :aria-expanded="openFaqIndex === i"
            @click="toggleFaq(i)"
          >
            <span class="font-display font-bold text-ink text-[15.5px] min-[1024px]:text-[17px] leading-[1.35]">{{ faq.q }}</span>
            <span
              class="text-purple text-[22px] font-display shrink-0 transition-transform"
              :class="openFaqIndex === i ? 'rotate-45' : ''"
            >+</span>
          </button>
          <div
            v-if="openFaqIndex === i"
            class="px-4 min-[1024px]:px-[22px] pb-4 min-[1024px]:pb-[18px] text-[14.5px] min-[1024px]:text-[15px] text-ink-muted leading-[1.65]"
          >
            <template v-if="faq.a">
              <p class="m-0 mt-[14px]">{{ faq.a }}</p>
            </template>
            <template v-else>
              <p v-if="faq.a1" class="m-0 mt-[14px]">{{ faq.a1 }}</p>
              <p v-if="faq.a2" class="m-0 mt-3">{{ faq.a2 }}</p>
            </template>
          </div>
        </li>
      </ul>
    </div>
  </section>

  <!-- Bigger team / Family Size CTA -->
  <section class="bg-cream-tint">
    <div class="mx-auto max-w-[980px] px-4 min-[640px]:px-6 min-[1024px]:px-8 pb-16 min-[640px]:pb-20 min-[1024px]:pb-24 pt-2">
      <div
        class="rounded-[18px] p-7 min-[640px]:p-9 grid grid-cols-1 min-[1024px]:grid-cols-[1fr_auto] gap-6 items-center"
        style="background: #2D1E2F; color: #FFF3E6;"
      >
        <div>
          <div class="font-display font-bold text-[22px] min-[640px]:text-[26px] tracking-[-0.4px]" style="color: #FFF3E6;">
            {{ t('pricing.biggerTeam.title') }}
          </div>
          <p class="text-[14.5px] min-[640px]:text-[15px] leading-[1.55] mt-2 m-0 max-w-[600px]" style="color: rgba(255,243,230,0.75);">
            {{ t('pricing.biggerTeam.body') }}
          </p>
        </div>
        <a
          :href="familyMailto"
          class="inline-flex items-center justify-center gap-2 px-[22px] py-3.5 rounded-[10px] text-[15px] font-bold no-underline whitespace-nowrap transition hover:brightness-110"
          style="background: #FFB703; color: #2D1E2F;"
        >
          {{ t('pricing.biggerTeam.ctaLabel') }}
        </a>
      </div>
    </div>
  </section>
  </div>
</template>
