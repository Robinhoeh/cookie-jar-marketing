<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

interface PipelineStep {
  n: string
  actor: string
  title: string
  body: string
}

// Step "tags" are visual state (auto / manual / pro) — not translation content.
const stepMeta = [
  { tag: 'auto',   soon: false },
  { tag: 'auto',   soon: false },
  { tag: 'auto',   soon: false },
  { tag: 'manual', soon: true  },
  { tag: 'auto',   soon: false },
  { tag: 'manual', soon: true  },
] as const

const tagColor: Record<string, string> = {
  auto:   '#16A34A',
  manual: '#FF6B6B',
}
const tagLabel: Record<string, string> = {
  auto:   'AUTO',
  manual: 'MANUAL',
}

// Legend colors mirror the step-tag system.
const legendColors = ['#16A34A', '#FF6B6B', '#FFB703']

const steps = computed(() =>
  (tm('home.pipeline.steps') as PipelineStep[]).map((step, i) => ({
    n: rt(step.n),
    actor: rt(step.actor),
    title: rt(step.title),
    body: rt(step.body),
    ...stepMeta[i],
  })),
)

interface LegendItem { label: string }
const legend = computed(() =>
  (tm('home.pipeline.legend') as LegendItem[]).map((item, i) => ({
    label: rt(item.label),
    color: legendColors[i] ?? '#B000FF',
  })),
)

// Mobile-only: which step is open. Desktop shows all bodies always.
const openIndex = ref<number>(0)
function toggle(i: number) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<template>
  <section style="background: #FFF3E6;">
    <div
      class="mx-auto max-w-[760px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-[88px]"
    >
      <!-- Eyebrow -->
      <div
        class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-purple" />
        {{ t('home.pipeline.eyebrow') }}
      </div>

      <!-- Headline -->
      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[34px] leading-[1.05] tracking-[-0.8px] min-[1024px]:text-[48px] min-[1024px]:leading-[1.02] min-[1024px]:tracking-[-1px]"
      >
        {{ t('home.pipeline.headlineLine1') }}<br />
        <span class="text-purple">{{ t('home.pipeline.headlineLine2') }}</span>
      </h2>

      <!-- Legend -->
      <div class="flex gap-3 min-[1024px]:gap-3.5 mt-4 min-[1024px]:mt-[18px] mb-5 min-[1024px]:mb-7 flex-wrap">
        <span
          v-for="item in legend"
          :key="item.label"
          class="inline-flex items-center gap-1.5 font-mono text-[10.5px] min-[1024px]:text-[11.5px] font-bold uppercase tracking-[0.8px] text-ink whitespace-nowrap"
        >
          <span class="w-[7px] h-[7px] min-[1024px]:w-2.5 min-[1024px]:h-2.5 rounded-full inline-block" :style="{ background: item.color }" />
          {{ item.label }}
        </span>
      </div>

      <!-- MOBILE LAYOUT: single-open accordion -->
      <div class="flex flex-col gap-2 min-[1024px]:hidden">
        <button
          v-for="(step, i) in steps"
          :key="step.n"
          type="button"
          class="text-left bg-white border border-cream-border rounded-[12px] cursor-pointer p-0 transition-shadow"
          :class="openIndex === i ? 'shadow-[0_8px_24px_-12px_rgba(45,30,47,0.18)]' : ''"
          :aria-expanded="openIndex === i"
          @click="toggle(i)"
        >
          <div class="flex items-center gap-3 px-3.5 py-3.5">
            <div class="font-mono text-[13px] font-bold text-purple shrink-0" style="min-width: 26px;">{{ step.n }}</div>
            <div class="flex-1 min-w-0">
              <div class="font-display font-bold text-ink text-[14.5px] tracking-[-0.2px] leading-[1.3]">{{ step.title }}</div>
              <div class="font-mono text-[11.5px] text-ink-faint mt-0.5 tracking-[0.3px]">{{ step.actor }}</div>
            </div>
            <span
              class="font-mono text-[9.5px] font-bold tracking-[0.6px] px-1.5 py-[3px] rounded shrink-0 whitespace-nowrap"
              :style="{ color: tagColor[step.tag], background: 'rgba(0,0,0,0.04)' }"
            >
              {{ tagLabel[step.tag] }}{{ step.soon ? ' · SOON' : '' }}
            </span>
            <span
              class="font-mono text-[14px] font-bold text-purple shrink-0 transition-transform duration-150"
              :style="openIndex === i ? 'transform: rotate(45deg);' : ''"
              aria-hidden="true"
            >+</span>
          </div>
          <div
            v-if="openIndex === i"
            class="px-3.5 pb-3.5 text-[13.5px] text-ink-muted leading-[1.6]"
            style="padding-left: 46px;"
          >
            {{ step.body }}
          </div>
        </button>
      </div>

      <!-- DESKTOP LAYOUT: badge + connecting line + always-open card -->
      <div class="hidden min-[1024px]:flex flex-col">
        <div
          v-for="(step, i) in steps"
          :key="step.n"
          class="relative flex gap-4 items-stretch"
        >
          <!-- Number badge + connector -->
          <div class="w-10 shrink-0 flex flex-col items-center">
            <div
              class="w-10 h-10 rounded-[10px] flex items-center justify-center font-mono font-bold text-[13px] shrink-0"
              :style="step.tag === 'manual'
                ? { background: '#FFF', color: '#FF6B6B', border: '2px dashed #FF6B6B' }
                : { background: '#2D1E2F', color: '#FFB703' }"
            >{{ step.n }}</div>
            <div
              v-if="i < steps.length - 1"
              class="flex-1 w-[2px] mt-1 min-h-[18px]"
              :style="step.tag === 'manual'
                ? { background: '#FF6B6B', opacity: 0.4 }
                : { background: '#2D1E2F', opacity: 0.18 }"
            />
          </div>

          <!-- Card -->
          <div
            class="flex-1 px-[18px] py-3.5 rounded-[12px] bg-white"
            :class="i < steps.length - 1 ? 'mb-1.5' : ''"
            :style="step.tag === 'manual'
              ? { border: '1.5px dashed #FF6B6B' }
              : { border: '1px solid #EEDFD2' }"
          >
            <div class="flex items-center justify-between gap-2.5 flex-wrap">
              <div class="font-mono text-[11px] text-ink-muted font-bold uppercase tracking-[1px]">
                {{ step.actor }}
              </div>
              <div class="flex gap-1.5">
                <span
                  class="font-mono text-[10px] font-bold tracking-[0.6px] px-2 py-[3px] rounded"
                  :style="{
                    color: tagColor[step.tag],
                    background: step.tag === 'manual' ? 'rgba(255,107,107,0.14)' : 'rgba(22,163,74,0.12)',
                  }"
                >{{ tagLabel[step.tag] === 'AUTO' ? 'AUTOMATED' : 'MANUAL TODAY' }}</span>
                <span
                  v-if="step.soon"
                  class="font-mono text-[10px] font-bold tracking-[0.6px] px-2 py-[3px] rounded whitespace-nowrap"
                  style="color: #8A5E00; background: rgba(255,183,3,0.18);"
                >AUTO ON PRO ROADMAP</span>
              </div>
            </div>
            <div class="font-display font-bold text-ink text-[18px] mt-1.5 tracking-[-0.2px]">
              {{ step.title }}
            </div>
            <div class="text-[14px] text-ink-muted mt-1.5 leading-[1.55]">
              {{ step.body }}
            </div>
          </div>
        </div>
      </div>

      <!-- Roadmap callout -->
      <div
        class="mt-5 min-[1024px]:mt-[26px] px-4 min-[1024px]:px-5 py-3.5 min-[1024px]:py-4 rounded-[10px] bg-white border border-cream-border flex gap-3 min-[1024px]:gap-3.5 items-start"
      >
        <span
          class="shrink-0 font-mono text-[9.5px] min-[1024px]:text-[10px] font-bold uppercase tracking-[0.6px] px-1.5 min-[1024px]:px-2 py-1 rounded whitespace-nowrap"
          style="color: #8A5E00; background: rgba(255,183,3,0.18); margin-top: 2px;"
        >
          <span class="min-[1024px]:hidden">{{ t('home.pipeline.roadmapCalloutTagShort') }}</span>
          <span class="hidden min-[1024px]:inline">{{ t('home.pipeline.roadmapCalloutTagFull') }}</span>
        </span>
        <div class="text-[13.5px] min-[1024px]:text-[14.5px] text-ink leading-[1.55]">
          {{ t('home.pipeline.roadmapCalloutBody') }}
        </div>
      </div>
    </div>
  </section>
</template>
