<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { supportEmail } from '@/config/links'

const { t } = useI18n()
const year = new Date().getFullYear()

interface FooterLink {
  label: string
  to?: string
  href?: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const columns = computed<FooterColumn[]>(() => [
  {
    title: t('footer.sections.product'),
    links: [
      { label: t('footer.links.product'), to: '/' },
      { label: t('footer.links.pricing'), to: '/pricing' },
      { label: t('footer.links.howItWorks'), to: '/how-it-works' },
      { label: t('footer.links.faq'), to: '/faq' },
    ],
  },
  {
    title: t('footer.sections.company'),
    links: [
      { label: t('footer.links.support'), href: `mailto:${supportEmail}` },
    ],
  },
  {
    title: t('footer.sections.legal'),
    links: [
      { label: t('footer.links.privacy'), to: '/privacy' },
      { label: t('footer.links.terms'),   to: '/terms' },
    ],
  },
])
</script>

<template>
  <footer class="bg-ink text-cream-bg mt-0">
    <div class="mx-auto max-w-[1280px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-10 min-[768px]:py-20">
      <!-- Logo + tagline -->
      <div class="min-[768px]:hidden">
        <RouterLink to="/" class="flex items-center gap-2.5 no-underline">
          <img
            src="/cookie-jar-icon-2048-slack-marketplace.png"
            alt=""
            class="w-[30px] h-[30px] rounded-lg shrink-0"
            width="30"
            height="30"
          />
          <span class="font-display font-bold text-[17px] text-cream-bg tracking-tight">Cookie Jar</span>
        </RouterLink>
        <p class="mt-3.5 text-[13.5px] text-cream-bg/65 leading-relaxed mb-7">
          {{ t('footer.tagline') }}
        </p>
      </div>

      <!-- Desktop: 4-column grid (logo + 3 link cols) -->
      <div class="hidden min-[768px]:grid grid-cols-4 gap-12">
        <div class="col-span-1">
          <RouterLink to="/" class="flex items-center gap-2.5 no-underline">
            <img
              src="/cookie-jar-icon-2048-slack-marketplace.png"
              alt=""
              class="w-9 h-9 rounded-lg shrink-0"
              width="36"
              height="36"
            />
            <span class="font-display font-bold text-[20px] text-cream-bg tracking-tight">Cookie Jar</span>
          </RouterLink>
          <p class="mt-4 text-[14px] text-cream-bg/65 leading-relaxed max-w-[240px]">
            {{ t('footer.tagline') }}
          </p>
        </div>
        <div v-for="col in columns" :key="col.title">
          <h2 class="font-mono text-[11px] uppercase tracking-[1.2px] text-cream-bg/55 mb-4 font-bold">{{ col.title }}</h2>
          <ul class="flex flex-col gap-3 list-none m-0 p-0">
            <li v-for="link in col.links" :key="link.label">
              <RouterLink
                v-if="link.to"
                :to="link.to"
                class="text-[14px] text-cream-bg/85 hover:text-cream-bg no-underline transition-colors"
              >{{ link.label }}</RouterLink>
              <a
                v-else
                :href="link.href"
                class="text-[14px] text-cream-bg/85 hover:text-cream-bg no-underline transition-colors"
              >{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Mobile: <details> accordions -->
      <div class="min-[768px]:hidden">
        <details
          v-for="col in columns"
          :key="col.title"
          class="footer-accordion border-t border-cream-bg/10 py-3.5"
        >
          <summary
            class="list-none cursor-pointer flex items-center justify-between font-display font-bold text-[13.5px] text-gold uppercase tracking-[1px]"
          >
            <span>{{ col.title }}</span>
            <span class="text-[20px] text-cream-bg/50 footer-accordion-plus transition-transform">+</span>
          </summary>
          <ul class="flex flex-col gap-3 list-none m-0 p-0 pt-3">
            <li v-for="link in col.links" :key="link.label">
              <RouterLink
                v-if="link.to"
                :to="link.to"
                class="text-[14px] text-cream-bg/72 hover:text-cream-bg no-underline transition-colors"
              >{{ link.label }}</RouterLink>
              <a
                v-else
                :href="link.href"
                class="text-[14px] text-cream-bg/72 hover:text-cream-bg no-underline transition-colors"
              >{{ link.label }}</a>
            </li>
          </ul>
        </details>
      </div>

      <!-- Baseline -->
      <div
        class="mt-6 min-[768px]:mt-14 pt-[18px] min-[768px]:pt-6 border-t border-cream-bg/10 flex flex-col min-[768px]:flex-row gap-1.5 min-[768px]:gap-4 min-[768px]:items-center min-[768px]:justify-between"
      >
        <div class="font-mono text-[11.5px] min-[768px]:text-[12px] text-cream-bg/55">
          {{ t('footer.copyright', { year }) }}
        </div>
        <div class="font-mono text-[11.5px] text-cream-bg/45 inline-flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-green inline-block" />
          {{ t('footer.statusPill') }}
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-accordion summary::-webkit-details-marker {
  display: none;
}
.footer-accordion[open] .footer-accordion-plus {
  transform: rotate(45deg);
}
</style>
