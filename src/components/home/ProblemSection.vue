<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

interface ProblemCard {
  n: string
  tag: string
  head: string
  body: string
  quote: string
}

// Accent colors aren't translation content — they live in code so they're consistent.
const accents = ['#FF6B6B', '#B000FF', '#FFB703', '#16A34A']

const cards = computed(() =>
  (tm('home.problem.cards') as ProblemCard[]).map((card, i) => ({
    n: rt(card.n),
    tag: rt(card.tag),
    head: rt(card.head),
    body: rt(card.body),
    quote: rt(card.quote),
    accent: accents[i] ?? '#B000FF',
  })),
)
</script>

<template>
  <section class="bg-white">
    <div
      class="mx-auto max-w-[980px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-20"
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

      <!-- Cards: single column mobile, 2x2 grid desktop -->
      <div
        class="mt-7 min-[1024px]:mt-11 grid grid-cols-1 min-[768px]:grid-cols-2 gap-3.5 min-[1024px]:gap-[18px]"
      >
        <article
          v-for="card in cards"
          :key="card.n"
          class="relative overflow-hidden rounded-[14px] min-[1024px]:rounded-[16px] border border-cream-border px-[18px] py-5 pb-[18px] min-[1024px]:px-[26px] min-[1024px]:py-[26px] min-[1024px]:pb-6"
          style="background: #FFF3E6; box-shadow: 0 1px 0 rgba(45,30,47,0.04), 0 8px 24px -16px rgba(45,30,47,0.18);"
        >
          <!-- Top accent stripe -->
          <div
            class="absolute top-0 left-0 right-0 h-[3px] min-[1024px]:h-[4px]"
            :style="{ background: card.accent }"
          />

          <!-- Watermark number -->
          <div
            class="absolute top-3.5 right-[18px] min-[1024px]:top-[18px] min-[1024px]:right-[22px] font-mono font-bold pointer-events-none select-none text-[32px] min-[1024px]:text-[44px]"
            :style="{ color: card.accent, opacity: 0.18, letterSpacing: '-1px', lineHeight: '1' }"
          >
            {{ card.n }}
          </div>

          <!-- Tag -->
          <div
            class="inline-flex items-center gap-1.5 min-[1024px]:gap-[7px] font-mono text-[10px] min-[1024px]:text-[11px] font-bold uppercase tracking-[1.2px] mb-2.5 min-[1024px]:mb-3"
            :style="{ color: card.accent }"
          >
            <span
              class="w-[5px] h-[5px] min-[1024px]:w-1.5 min-[1024px]:h-1.5 rounded-full inline-block"
              :style="{ background: card.accent }"
            />
            {{ card.tag }}
          </div>

          <!-- Headline -->
          <div
            class="font-display font-bold text-ink text-[18px] min-[1024px]:text-[22px] leading-[1.2] tracking-[-0.3px] min-[1024px]:tracking-[-0.4px]"
            style="padding-right: 30px;"
          >
            {{ card.head }}
          </div>

          <!-- Body -->
          <div class="text-[13.5px] min-[1024px]:text-[14.5px] text-ink-muted mt-2 min-[1024px]:mt-2.5 leading-[1.55]">
            {{ card.body }}
          </div>

          <!-- Quote -->
          <div
            class="mt-3 min-[1024px]:mt-4 pt-2.5 min-[1024px]:pt-3.5 font-mono italic text-[11.5px] min-[1024px]:text-[12.5px] leading-[1.5]"
            style="border-top: 1px dashed #E5D3C2; color: #8A7A8A;"
          >
            {{ card.quote }}
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
