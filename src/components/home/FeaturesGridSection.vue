<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

interface FeatureItem {
  title: string
  body: string
}

const items = computed(() =>
  (tm('home.featuresGrid.items') as FeatureItem[]).map((item) => ({
    title: rt(item.title),
    body: rt(item.body),
  })),
)
</script>

<template>
  <!-- Continues the dark plum from the offboarding section above -->
  <section style="background: #2D1E2F; color: #FFF3E6;">
    <div
      class="mx-auto max-w-[1180px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-24"
    >
      <!-- Eyebrow -->
      <div
        class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px]"
        style="color: #FFB703;"
      >
        <span class="w-1.5 h-1.5 rounded-full inline-block" style="background: #FFB703;" />
        {{ t('home.featuresGrid.eyebrow') }}
      </div>

      <!-- Title -->
      <h2
        class="font-display font-bold m-0 mt-3 text-[34px] leading-[1.05] tracking-[-0.8px] min-[1024px]:text-[52px] min-[1024px]:leading-[1.05] min-[1024px]:tracking-[-1px] min-[1024px]:max-w-[760px]"
        style="color: #FFF3E6;"
      >
        {{ t('home.featuresGrid.titleLine1') }}<br />
        <span style="color: #FFB703;">{{ t('home.featuresGrid.titleLine2') }}</span>
      </h2>

      <!-- Cards: 1 col mobile, 2 col tablet, 3 col desktop -->
      <div
        class="mt-7 min-[1024px]:mt-12 grid grid-cols-1 min-[768px]:grid-cols-2 min-[1024px]:grid-cols-3 gap-3 min-[1024px]:gap-[18px]"
      >
        <article
          v-for="item in items"
          :key="item.title"
          class="rounded-[12px] min-[1024px]:rounded-[14px] p-[18px] min-[1024px]:p-6"
          style="background: rgba(255,243,230,0.04); border: 1px solid rgba(255,243,230,0.08);"
        >
          <div
            class="font-display font-bold text-[17px] min-[1024px]:text-[20px] tracking-[-0.2px] min-[1024px]:tracking-[-0.3px]"
            style="color: #FFF3E6;"
          >
            {{ item.title }}
          </div>
          <div
            class="text-[13.5px] min-[1024px]:text-[14.5px] mt-2 min-[1024px]:mt-2.5 leading-[1.55]"
            style="color: rgba(255,243,230,0.7);"
          >
            {{ item.body }}
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
