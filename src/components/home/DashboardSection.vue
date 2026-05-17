<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Flow4A_Dashboard from '@/components/frames/Flow4A_Dashboard.vue'

const { t, tm, rt } = useI18n()

const bullets = computed(() =>
  (tm('home.dashboard.bullets') as string[]).map((b) => rt(b)),
)
</script>

<template>
  <section style="background: #FFF3E6;">
    <div
      class="mx-auto max-w-[1180px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-24"
    >
      <div
        class="grid grid-cols-1 min-[1024px]:grid-cols-[1fr_1.1fr] gap-9 min-[1024px]:gap-14 items-center"
      >
        <!-- Copy column -->
        <div>
          <div
            class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-purple" />
            {{ t('home.dashboard.eyebrow') }}
          </div>

          <h2
            class="font-display font-bold text-ink m-0 mt-3 text-[34px] leading-[1.05] tracking-[-0.8px] min-[1024px]:text-[48px] min-[1024px]:leading-[1.02] min-[1024px]:tracking-[-1px]"
          >
            {{ t('home.dashboard.titleLine1') }}<br />
            <span class="text-purple">{{ t('home.dashboard.titleLine2') }}</span>
          </h2>

          <p
            class="text-[15.5px] min-[1024px]:text-[16px] leading-[1.6] text-ink-muted mt-4 min-[1024px]:mt-5 mb-0 max-w-[520px]"
          >
            {{ t('home.dashboard.lede') }}
          </p>

          <ul class="mt-5 min-[1024px]:mt-6 flex flex-col gap-2.5 list-none p-0 m-0">
            <li
              v-for="bullet in bullets"
              :key="bullet"
              class="flex gap-2.5 text-[14.5px] min-[1024px]:text-[15px] text-ink leading-[1.5]"
            >
              <span class="text-purple shrink-0 mt-0.5">✓</span>
              <span>{{ bullet }}</span>
            </li>
          </ul>
        </div>

        <!-- Dashboard image -->
        <div>
          <Flow4A_Dashboard />
        </div>
      </div>
    </div>
  </section>
</template>
