<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { supportEmail } from '@/config/links'

const { t } = useI18n()

const dashboardUrl = 'https://usecookiejar.com'
</script>

<template>
  <section class="bg-brand-cream min-h-[calc(100vh-4rem)]">
    <div class="mx-auto max-w-3xl px-4 min-[640px]:px-6 min-[1024px]:px-8 py-16 min-[640px]:py-24">
      <header class="text-center">
        <p class="font-mono text-xs font-bold text-brand-purple uppercase tracking-widest">
          {{ t('support.eyebrow') }}
        </p>
        <h1 class="mt-3 font-display text-4xl min-[640px]:text-5xl text-brand-plum tracking-tight">
          {{ t('support.title') }}
        </h1>
        <p class="mt-5 text-base min-[640px]:text-lg text-ui-muted leading-relaxed">
          <i18n-t keypath="support.intro" tag="span">
            <template #responseTime>
              <strong class="text-ui-text">{{ t('support.responseTime') }}</strong>
            </template>
          </i18n-t>
        </p>
      </header>

      <div class="mt-12 bg-ui-surface border border-ui-border rounded-2xl p-6 min-[640px]:p-8 shadow-sm">
        <div class="flex flex-col min-[640px]:flex-row items-start gap-6">
          <div class="shrink-0 w-14 h-14 rounded-xl bg-brand-purple/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-7 h-7 text-brand-purple"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 5L2 7" />
            </svg>
          </div>
          <div class="flex-1">
            <h2 class="font-display text-xl text-brand-plum">{{ t('support.emailCard.title') }}</h2>
            <p class="mt-1 text-sm text-ui-muted">
              {{ t('support.emailCard.body') }}
            </p>
            <a
              :href="`mailto:${supportEmail}`"
              class="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-purple text-white text-sm font-medium hover:bg-brand-purple/90 transition-colors no-underline"
            >
              {{ supportEmail }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-8 grid gap-4 min-[768px]:grid-cols-2">
        <RouterLink
          to="/faq"
          class="block bg-ui-surface border border-ui-border rounded-xl p-5 hover:border-brand-purple/40 transition-colors no-underline"
        >
          <h3 class="font-display text-base text-brand-plum">{{ t('support.fasterAnswers.title') }}</h3>
          <p class="mt-1.5 text-sm text-ui-muted">
            {{ t('support.fasterAnswers.body') }}
          </p>
          <span class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-purple">
            {{ t('support.fasterAnswers.cta') }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </RouterLink>

        <div class="bg-ui-surface border border-ui-border rounded-xl p-5">
          <h3 class="font-display text-base text-brand-plum">{{ t('support.serviceStatus.title') }}</h3>
          <p class="mt-1.5 text-sm text-ui-muted">
            <i18n-t keypath="support.serviceStatus.body" tag="span">
              <template #url>
                <a :href="dashboardUrl" class="text-brand-purple hover:underline">{{ dashboardUrl.replace('https://', '') }}</a>
              </template>
            </i18n-t>
          </p>
        </div>
      </div>

      <div class="mt-10 text-center text-sm text-ui-muted">
        {{ t('support.footer') }}
      </div>
    </div>
  </section>
</template>
