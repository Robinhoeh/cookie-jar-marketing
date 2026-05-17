<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { addToSlackUrl } from '@/config/links'
import { RouterLink } from 'vue-router'
import SlackGlyph from '@/components/marks/SlackGlyph.vue'

const { t, tm, rt } = useI18n()

interface SetupStep {
  n: string
  title: string
  body: string
}

const steps = computed(() =>
  (tm('home.setup.steps') as SetupStep[]).map((step) => ({
    n: rt(step.n),
    title: rt(step.title),
    body: rt(step.body),
  })),
)
</script>

<template>
  <section class="bg-white">
    <div
      class="mx-auto max-w-[1180px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-24"
    >
      <!-- Eyebrow -->
      <div
        class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-purple" />
        {{ t('home.setup.eyebrow') }}
      </div>

      <!-- Title -->
      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[34px] leading-[1.05] tracking-[-0.8px] min-[1024px]:text-[52px] min-[1024px]:leading-[1.02] min-[1024px]:tracking-[-1px] min-[1024px]:max-w-[680px]"
      >
        {{ t('home.setup.titleLine1') }}<br />
        <span class="text-purple">{{ t('home.setup.titleLine2') }}</span>
      </h2>

      <!-- Lede -->
      <p
        class="text-[15.5px] min-[1024px]:text-[16px] leading-[1.6] text-ink-muted mt-4 min-[1024px]:mt-5 mb-0 max-w-[660px]"
      >
        {{ t('home.setup.lede') }}
      </p>

      <!-- Steps: 1 col mobile, 3 col desktop -->
      <div
        class="mt-8 min-[1024px]:mt-12 grid grid-cols-1 min-[1024px]:grid-cols-3 gap-4 min-[1024px]:gap-6"
      >
        <article
          v-for="step in steps"
          :key="step.n"
          class="bg-cream-tint border border-cream-border rounded-[14px] min-[1024px]:rounded-[16px] p-5 min-[1024px]:p-7 flex flex-col gap-3.5"
        >
          <div
            class="font-mono text-[12px] min-[1024px]:text-[13px] font-bold tracking-[1.4px] text-purple"
          >
            STEP {{ step.n }}
          </div>
          <h3
            class="font-display font-bold text-ink m-0 text-[20px] min-[1024px]:text-[24px] leading-[1.15] tracking-[-0.3px]"
          >
            {{ step.title }}
          </h3>
          <p
            class="text-[14px] min-[1024px]:text-[14.5px] text-ink-muted leading-[1.55] m-0"
          >
            {{ step.body }}
          </p>
        </article>
      </div>

      <!-- CTA row -->
      <div
        class="mt-9 min-[1024px]:mt-12 flex flex-col gap-3 min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:gap-4"
      >
        <a
          :href="addToSlackUrl"
          class="inline-flex items-center justify-center gap-2.5 px-5 py-[15px] rounded-[12px] bg-ink text-gold text-[16px] font-bold no-underline hover:brightness-110 transition min-[1024px]:rounded-[10px] min-[1024px]:py-3.5 min-[1024px]:px-5 min-[1024px]:text-[15px]"
        >
          <SlackGlyph :size="18" />
          {{ t('home.setup.ctaPrimary') }}
        </a>
        <RouterLink
          to="/pricing"
          class="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-[12px] border border-cream-border bg-white text-ink text-[15px] font-semibold no-underline min-[1024px]:border-0 min-[1024px]:bg-transparent min-[1024px]:px-1"
        >
          {{ t('home.setup.ctaSecondary') }} <span class="text-purple">→</span>
        </RouterLink>
        <div
          class="text-[12.5px] min-[1024px]:text-[13px] text-ink-muted min-[1024px]:ml-2"
        >
          {{ t('home.setup.finePrint') }}
        </div>
      </div>
    </div>
  </section>
</template>
