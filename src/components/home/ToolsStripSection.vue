<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

const tools = computed(() =>
  (tm('home.toolsStrip.tools') as string[]).map((tool) => rt(tool)),
)
</script>

<template>
  <section style="background: #FFF3E6;" class="border-y border-cream-border">
    <div
      class="mx-auto max-w-[1080px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-12 min-[640px]:py-14 min-[1024px]:py-16"
    >
      <!-- Eyebrow (now the tagline per the new copy) -->
      <div
        class="font-mono text-[11px] min-[1024px]:text-[12.5px] font-bold uppercase tracking-[1.4px] text-purple text-center max-w-[680px] mx-auto"
      >
        {{ t('home.toolsStrip.eyebrow') }}
      </div>

      <!-- Slack-native framing line + linked CTA (absorbed from killed WhySlackSection) -->
      <p
        class="mt-4 min-[1024px]:mt-5 text-center text-[15px] min-[1024px]:text-[17px] text-ink leading-[1.5] max-w-[640px] mx-auto m-0"
      >
        {{ t('home.toolsStrip.framing') }}
      </p>
      <!-- Pill grid -->
      <ul
        class="mt-8 min-[1024px]:mt-10 list-none p-0 m-0 flex flex-wrap items-center justify-center gap-2 min-[1024px]:gap-2.5"
      >
        <li
          v-for="tool in tools"
          :key="tool"
          class="inline-flex items-center px-3 min-[1024px]:px-3.5 py-1.5 min-[1024px]:py-2 rounded-full bg-white border border-cream-border text-ink font-display font-semibold text-[13px] min-[1024px]:text-[14.5px] tracking-[-0.2px]"
        >
          {{ tool }}
        </li>
      </ul>

      <p
        class="mt-5 min-[1024px]:mt-6 text-center text-[13px] min-[1024px]:text-[14px] text-ink-muted m-0"
      >
        {{ t('home.toolsStrip.outro') }}
      </p>
    </div>
  </section>
</template>
