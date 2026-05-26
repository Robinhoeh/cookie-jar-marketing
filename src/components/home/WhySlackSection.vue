<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t, tm, rt } = useI18n()

const bullets = computed(() =>
  (tm('home.whySlack.bullets') as string[]).map((b) => rt(b)),
)
</script>

<template>
  <section class="bg-white">
    <div
      class="mx-auto max-w-[820px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-20"
    >
      <div
        class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-purple" />
        {{ t('home.whySlack.eyebrow') }}
      </div>

      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[30px] min-[1024px]:text-[44px] leading-[1.05] tracking-[-0.7px] min-[1024px]:max-w-[680px]"
      >
        {{ t('home.whySlack.title') }}
      </h2>

      <ul class="mt-7 min-[1024px]:mt-9 list-none p-0 m-0 flex flex-col gap-3.5 min-[1024px]:gap-4">
        <li
          v-for="bullet in bullets"
          :key="bullet"
          class="flex gap-3 min-[1024px]:gap-3.5 items-start text-[14.5px] min-[1024px]:text-[16px] text-ink leading-[1.55]"
        >
          <span class="text-purple shrink-0 mt-1 font-display font-bold text-[16px]">✓</span>
          <span>{{ bullet }}</span>
        </li>
      </ul>

      <div class="mt-7 min-[1024px]:mt-9">
        <RouterLink
          to="/how-it-works"
          class="inline-flex items-center gap-1.5 text-[14.5px] min-[1024px]:text-[15px] font-semibold text-purple no-underline hover:underline"
        >
          See the full walkthrough <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
