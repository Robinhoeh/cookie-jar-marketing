<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { addToSlackUrl } from '@/config/links'
import SlackGlyph from '@/components/marks/SlackGlyph.vue'

const { t } = useI18n()
</script>

<template>
  <section class="bg-white">
    <div
      class="mx-auto max-w-[760px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-16 min-[640px]:py-20 min-[1024px]:py-24 text-center"
    >
      <!-- Big emoji -->
      <div class="text-[48px] min-[1024px]:text-[56px] leading-none mb-3 min-[1024px]:mb-4">
        {{ t('home.finalCta.emoji') }}
      </div>

      <!-- Title — purple accent on line 2 -->
      <h2
        class="font-display font-bold text-ink m-0 text-[36px] min-[1024px]:text-[56px] leading-[1.02] tracking-[-1px]"
      >
        {{ t('home.finalCta.titleLine1') }}<br />
        <span class="text-purple">{{ t('home.finalCta.titleLine2') }}</span>
      </h2>

      <!-- Lede -->
      <p
        class="text-[15.5px] min-[1024px]:text-[17px] leading-[1.5] text-ink-muted mt-4 min-[1024px]:mt-5 mb-0"
      >
        {{ t('home.finalCta.lede') }}
      </p>

      <!-- CTAs -->
      <div
        class="mt-7 min-[1024px]:mt-7 inline-flex items-center gap-3 flex-wrap justify-center"
      >
        <a
          :href="addToSlackUrl"
          class="inline-flex items-center justify-center gap-2.5 px-7 min-[1024px]:px-[28px] py-4 min-[1024px]:py-[16px] rounded-[10px] bg-ink text-gold text-[16px] font-bold no-underline hover:brightness-110 transition"
        >
          <SlackGlyph :size="20" />
          {{ t('home.finalCta.ctaPrimary') }}
        </a>
        <RouterLink
          to="/pricing"
          class="inline-flex items-center justify-center gap-1.5 px-2 py-4 min-[1024px]:py-[16px] text-ink text-[16px] font-semibold no-underline"
        >
          {{ t('home.finalCta.ctaSecondary') }} <span class="text-purple">→</span>
        </RouterLink>
      </div>

      <!-- Inline FAQ link -->
      <div class="mt-5 min-[1024px]:mt-6">
        <RouterLink
          to="/faq"
          class="inline-flex items-center gap-1 text-[14px] text-ink-muted no-underline hover:text-ink transition-colors"
        >
          Got questions? See FAQ &amp; security <span class="text-purple">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
