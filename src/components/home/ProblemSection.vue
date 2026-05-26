<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const EMPLOYEE_COLOR = '#16A34A'
const OWNER_COLOR = '#FFB703'

function hexToRgba(hex: string, alpha: number): string {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
</script>

<template>
  <section class="bg-white">
    <div
      class="mx-auto max-w-[1080px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-20"
    >
      <!-- Eyebrow -->
      <div
        class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px]"
        style="color: #FF6B6B;"
      >
        <span class="w-1.5 h-1.5 rounded-full" style="background: #FF6B6B;" />
        {{ t('home.problem.eyebrow') }}
      </div>

      <!-- SEO-leaning headline -->
      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[30px] min-[1024px]:text-[48px] leading-[1.05] tracking-[-0.8px] min-[1024px]:max-w-[900px]"
      >
        {{ t('home.problem.headline') }}
      </h2>

      <!-- Cute sub-tagline -->
      <p
        class="mt-3 font-display italic text-[18px] min-[1024px]:text-[22px] leading-[1.3] tracking-[-0.3px] m-0"
        style="color: #8A5E00;"
      >
        {{ t('home.problem.sub') }}
      </p>

      <!-- Lede -->
      <p
        class="mt-5 min-[1024px]:mt-6 text-[15.5px] min-[1024px]:text-[17px] leading-[1.6] text-ink-muted mb-0 max-w-[760px]"
      >
        {{ t('home.problem.lede') }}
      </p>

      <!-- Two role cards: side-by-side at lg+, stacked on mobile -->
      <div
        class="mt-9 min-[1024px]:mt-12 grid grid-cols-1 min-[1024px]:grid-cols-2 gap-4 min-[1024px]:gap-6"
      >
        <!-- Employee card -->
        <article
          class="relative rounded-[14px] p-5 min-[1024px]:p-7 border overflow-hidden"
          :style="{
            background: hexToRgba(EMPLOYEE_COLOR, 0.04),
            borderColor: hexToRgba(EMPLOYEE_COLOR, 0.25),
          }"
        >
          <span
            aria-hidden="true"
            class="absolute left-0 top-0 bottom-0 w-1"
            :style="{ background: EMPLOYEE_COLOR }"
          />
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[10.5px] min-[1024px]:text-[11px] font-bold uppercase tracking-[1.2px]"
            :style="{
              background: hexToRgba(EMPLOYEE_COLOR, 0.14),
              color: EMPLOYEE_COLOR,
            }"
          >
            {{ t('home.problem.employee.roleChip') }}
          </span>
          <h3
            class="mt-3.5 min-[1024px]:mt-4 font-display font-bold text-ink m-0 text-[19px] min-[1024px]:text-[22px] leading-[1.25] tracking-[-0.3px]"
          >
            {{ t('home.problem.employee.headline') }}
          </h3>
          <p
            class="mt-2.5 min-[1024px]:mt-3 text-[14px] min-[1024px]:text-[15px] text-ink-muted leading-[1.6] m-0"
          >
            {{ t('home.problem.employee.body') }}
          </p>
        </article>

        <!-- Owner card -->
        <article
          class="relative rounded-[14px] p-5 min-[1024px]:p-7 border overflow-hidden"
          :style="{
            background: hexToRgba(OWNER_COLOR, 0.05),
            borderColor: hexToRgba(OWNER_COLOR, 0.3),
          }"
        >
          <span
            aria-hidden="true"
            class="absolute left-0 top-0 bottom-0 w-1"
            :style="{ background: OWNER_COLOR }"
          />
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[10.5px] min-[1024px]:text-[11px] font-bold uppercase tracking-[1.2px]"
            :style="{
              background: hexToRgba(OWNER_COLOR, 0.18),
              color: '#8A5E00',
            }"
          >
            {{ t('home.problem.owner.roleChip') }}
          </span>
          <h3
            class="mt-3.5 min-[1024px]:mt-4 font-display font-bold text-ink m-0 text-[19px] min-[1024px]:text-[22px] leading-[1.25] tracking-[-0.3px]"
          >
            {{ t('home.problem.owner.headline') }}
          </h3>
          <p
            class="mt-2.5 min-[1024px]:mt-3 text-[14px] min-[1024px]:text-[15px] text-ink-muted leading-[1.6] m-0"
          >
            {{ t('home.problem.owner.body') }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
