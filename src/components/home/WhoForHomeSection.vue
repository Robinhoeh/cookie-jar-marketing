<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section style="background: #FFF3E6;">
    <div
      class="mx-auto max-w-[820px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-20"
    >
      <div
        class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-purple" />
        {{ t('home.whoForHome.eyebrow') }}
      </div>

      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[30px] min-[1024px]:text-[44px] leading-[1.05] tracking-[-0.7px]"
      >
        {{ t('home.whoForHome.title') }}
      </h2>

      <p
        class="mt-5 min-[1024px]:mt-6 text-[15.5px] min-[1024px]:text-[17px] leading-[1.6] text-ink mb-0"
      >
        {{ t('home.whoForHome.body') }}
      </p>

      <div
        class="mt-7 min-[1024px]:mt-8 rounded-[12px] bg-white border border-cream-border px-5 py-4 min-[1024px]:px-6 min-[1024px]:py-5"
      >
        <span
          class="font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1px]"
          style="color: #FF6B6B;"
        >{{ t('home.whoForHome.notForLabel') }}</span>
        <span
          class="ml-2 text-[14.5px] min-[1024px]:text-[15.5px] text-ink-muted leading-[1.55]"
        >{{ t('home.whoForHome.notForBody') }}</span>
      </div>
    </div>
  </section>
</template>
