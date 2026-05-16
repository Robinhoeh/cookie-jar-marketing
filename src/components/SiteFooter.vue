<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { supportEmail } from '@/config/links'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink text-cream-bg mt-0">
    <div class="mx-auto max-w-[1280px] px-6 min-[1024px]:px-8 py-16 min-[768px]:py-20">
      <div class="grid gap-10 min-[768px]:grid-cols-4 min-[768px]:gap-12">
        <div class="min-[768px]:col-span-1">
          <RouterLink
            to="/"
            class="flex items-center gap-2.5 no-underline"
          >
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

        <div>
          <h2 class="font-mono text-[11px] uppercase tracking-[1.2px] text-cream-bg/55 mb-4 font-bold">{{ t('footer.sections.product') }}</h2>
          <ul class="flex flex-col gap-3 list-none m-0 p-0">
            <li><RouterLink to="/" class="text-[14px] text-cream-bg/85 hover:text-cream-bg no-underline transition-colors">{{ t('footer.links.product') }}</RouterLink></li>
            <li><RouterLink to="/pricing" class="text-[14px] text-cream-bg/85 hover:text-cream-bg no-underline transition-colors">{{ t('footer.links.pricing') }}</RouterLink></li>
          </ul>
        </div>

        <div>
          <h2 class="font-mono text-[11px] uppercase tracking-[1.2px] text-cream-bg/55 mb-4 font-bold">{{ t('footer.sections.company') }}</h2>
          <ul class="flex flex-col gap-3 list-none m-0 p-0">
            <li><a :href="`mailto:${supportEmail}`" class="text-[14px] text-cream-bg/85 hover:text-cream-bg no-underline transition-colors">{{ t('footer.links.support') }}</a></li>
          </ul>
        </div>

        <div>
          <h2 class="font-mono text-[11px] uppercase tracking-[1.2px] text-cream-bg/55 mb-4 font-bold">{{ t('footer.sections.legal') }}</h2>
          <ul class="flex flex-col gap-3 list-none m-0 p-0">
            <li><RouterLink to="/privacy" class="text-[14px] text-cream-bg/85 hover:text-cream-bg no-underline transition-colors">{{ t('footer.links.privacy') }}</RouterLink></li>
            <li><RouterLink to="/terms" class="text-[14px] text-cream-bg/85 hover:text-cream-bg no-underline transition-colors">{{ t('footer.links.terms') }}</RouterLink></li>
          </ul>
        </div>
      </div>

      <div class="mt-14 pt-6 border-t border-cream-bg/10 flex flex-col min-[768px]:flex-row gap-4 min-[768px]:items-center min-[768px]:justify-between">
        <div class="text-[12px] text-cream-bg/55">
          {{ t('footer.copyright', { year }) }}
        </div>
        <div class="text-[11px] font-mono text-cream-bg/45 inline-flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-green inline-block" />
          {{ t('footer.statusPill') }}
        </div>
      </div>
    </div>
  </footer>
</template>
