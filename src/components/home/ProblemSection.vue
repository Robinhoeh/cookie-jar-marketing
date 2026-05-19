<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

interface Milestone {
  size: string
  surface: string
  headline: string
  body: string
  quote: string
}

const accents = ['#16A34A', '#FFB703', '#FF6B6B', '#7C2D8F']

const milestones = computed(() =>
  (tm('home.problem.milestones') as Milestone[]).map((m, i) => ({
    size: rt(m.size),
    surface: rt(m.surface),
    headline: rt(m.headline),
    body: rt(m.body),
    quote: rt(m.quote),
    accent: accents[i] ?? '#B000FF',
  })),
)

function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = hex.replace('#', '')
  const r = parseInt(cleanHex.slice(0, 2), 16)
  const g = parseInt(cleanHex.slice(2, 4), 16)
  const b = parseInt(cleanHex.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function cardBg(accent: string): string {
  return hexToRgba(accent, 0.05)
}

function cardBorder(accent: string): string {
  return hexToRgba(accent, 0.22)
}
</script>

<template>
  <section class="bg-white">
    <div
      class="mx-auto max-w-[1180px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-24"
    >
      <!-- Eyebrow -->
      <div
        class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px]"
        style="color: #FF6B6B;"
      >
        <span class="w-1.5 h-1.5 rounded-full" style="background: #FF6B6B;" />
        {{ t('home.problem.eyebrow') }}
      </div>

      <!-- Headline -->
      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[34px] leading-[1.05] tracking-[-0.8px] min-[1024px]:text-[56px] min-[1024px]:leading-[1.02] min-[1024px]:tracking-[-1px]"
      >
        {{ t('home.problem.headlineLine1') }}<br />
        <span class="text-purple">{{ t('home.problem.headlineLine2') }}</span>
      </h2>

      <!-- Lede -->
      <p
        class="text-[15.5px] min-[1024px]:text-[17px] leading-[1.6] text-ink-muted mt-4 min-[1024px]:mt-5 mb-0 max-w-[760px]"
      >
        {{ t('home.problem.lede') }}
      </p>

      <!-- Timeline — Mobile (vertical) -->
      <ol class="mt-9 min-[1024px]:hidden list-none m-0 p-0 relative">
        <!-- Vertical axis line -->
        <div
          aria-hidden="true"
          class="absolute left-[15px] top-2 bottom-2 w-px"
          style="background: linear-gradient(to bottom, #16A34A 0%, #FFB703 33%, #FF6B6B 66%, #7C2D8F 100%);"
        />
        <li
          v-for="(m, i) in milestones"
          :key="m.size"
          class="relative pl-10 pr-1"
          :class="i === milestones.length - 1 ? '' : 'pb-7'"
        >
          <!-- Dot on axis -->
          <span
            aria-hidden="true"
            class="absolute left-[9px] top-1 w-[14px] h-[14px] rounded-full border-[3px] border-white"
            :style="{ background: m.accent, boxShadow: `0 0 0 2px ${m.accent}` }"
          />
          <!-- Card body with subtle progression tint -->
          <div
            class="rounded-[12px] px-4 py-3.5 border"
            :style="{ background: cardBg(m.accent), borderColor: cardBorder(m.accent) }"
          >
            <!-- Size label -->
            <div
              class="font-mono text-[11px] font-bold uppercase tracking-[1.2px]"
              :style="{ color: m.accent }"
            >
              {{ m.size }} · {{ m.surface }}
            </div>
            <!-- Headline -->
            <div class="font-display font-bold text-ink text-[17px] leading-[1.25] tracking-[-0.3px] mt-1.5">
              {{ m.headline }}
            </div>
            <!-- Body -->
            <p class="text-[14px] text-ink-muted leading-[1.55] mt-2 m-0">{{ m.body }}</p>
            <!-- Quote -->
            <p
              class="mt-2.5 pt-2.5 font-mono italic text-[12px] leading-[1.5] m-0"
              :style="{ borderTop: `1px dashed ${cardBorder(m.accent)}`, color: '#8A7A8A' }"
            >
              {{ m.quote }}
            </p>
          </div>
        </li>
      </ol>

      <!-- Timeline — Desktop (horizontal) -->
      <!-- Grid: 4 columns × 3 rows. Row 2 is the axis row (fixed height).
           Even-index cards live in row 1, odd-index in row 3 — alternating above/below. -->
      <div
        class="hidden min-[1024px]:grid mt-14 relative grid-cols-4 gap-6"
        style="grid-template-rows: minmax(220px, auto) 32px minmax(220px, auto);"
      >
        <!-- Horizontal axis line: spans all 4 columns, sits centered on the dot row -->
        <div
          aria-hidden="true"
          class="absolute left-0 right-0 h-[2px] rounded-full pointer-events-none"
          style="
            top: 50%;
            transform: translateY(-50%);
            background: linear-gradient(to right, #16A34A 0%, #FFB703 33%, #FF6B6B 66%, #7C2D8F 100%);
          "
        />

        <template v-for="(m, i) in milestones" :key="m.size">
          <!-- Card: row 1 if even-index, row 3 if odd-index. Aligned to the dot row edge. -->
          <article
            class="relative border rounded-[14px] px-5 py-5 self-end"
            :class="i % 2 === 0 ? 'row-start-1 self-end' : 'row-start-3 self-start'"
            :style="{
              gridColumnStart: i + 1,
              background: cardBg(m.accent),
              borderColor: cardBorder(m.accent),
              boxShadow: '0 1px 0 rgba(45,30,47,0.04), 0 12px 32px -20px rgba(45,30,47,0.22)',
            }"
          >
            <!-- Connector stub from card edge to dot row -->
            <span
              aria-hidden="true"
              class="absolute left-1/2 w-[2px] rounded-full"
              :style="{
                background: m.accent,
                height: '20px',
                transform: 'translateX(-50%)',
                top: i % 2 === 0 ? '100%' : 'auto',
                bottom: i % 2 === 0 ? 'auto' : '100%',
              }"
            />
            <div
              class="font-mono text-[11.5px] font-bold uppercase tracking-[1.3px]"
              :style="{ color: m.accent }"
            >
              {{ m.size }}
            </div>
            <div class="font-mono text-[11px] text-ink-muted mt-1">
              {{ m.surface }}
            </div>
            <div class="font-display font-bold text-ink text-[17px] leading-[1.25] tracking-[-0.2px] mt-3">
              {{ m.headline }}
            </div>
            <p class="text-[13.5px] text-ink-muted leading-[1.5] mt-2 m-0">{{ m.body }}</p>
            <p
              class="mt-3 pt-3 font-mono italic text-[11.5px] leading-[1.5] m-0"
              :style="{ borderTop: `1px dashed ${cardBorder(m.accent)}`, color: '#8A7A8A' }"
            >
              {{ m.quote }}
            </p>
          </article>

          <!-- Dot: always in row 2, centered horizontally in its column -->
          <span
            aria-hidden="true"
            class="row-start-2 justify-self-center self-center w-[20px] h-[20px] rounded-full border-[3px] border-white z-10"
            :style="{
              gridColumnStart: i + 1,
              background: m.accent,
              boxShadow: `0 0 0 3px ${m.accent}`,
            }"
          />
        </template>
      </div>

      <!-- Outro line -->
      <p
        class="mt-10 min-[1024px]:mt-14 text-center text-[15px] min-[1024px]:text-[17px] font-display font-semibold text-ink max-w-[600px] mx-auto"
      >
        {{ t('home.problem.outro') }}
      </p>
    </div>
  </section>
</template>
