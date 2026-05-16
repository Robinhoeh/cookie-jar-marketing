<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CodeChip from '@/components/primitives/CodeChip.vue'
import CookieTakeAllFrame from '@/components/frames/CookieTakeAllFrame.vue'
import ScrollableMock from '@/components/mobile/ScrollableMock.vue'

const { t, tm, rt } = useI18n()

const bullets = computed(() =>
  (tm('home.offboarding.bullets') as string[]).map((b) => rt(b)),
)
</script>

<template>
  <section style="background: #2D1E2F; color: #FFF3E6;">
    <div
      class="mx-auto max-w-[1180px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-[88px] min-[1024px]:grid min-[1024px]:grid-cols-2 min-[1024px]:gap-[60px] min-[1024px]:items-center"
    >
      <!-- Copy column -->
      <div>
        <!-- Badge row -->
        <div class="inline-flex items-center gap-2 mb-3 flex-wrap">
          <span
            class="font-mono text-[9.5px] min-[1024px]:text-[10px] font-bold uppercase tracking-[0.8px] px-2 py-1 rounded whitespace-nowrap"
            style="color: #2D1E2F; background: #FFB703;"
          >{{ t('home.offboarding.badge') }}</span>
          <span
            class="font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] whitespace-nowrap"
            style="color: #FF6B6B;"
          >{{ t('home.offboarding.eyebrow') }}</span>
        </div>

        <!-- Title -->
        <h2
          class="font-display font-bold m-0 mt-3 text-[34px] leading-[1.05] tracking-[-0.8px] min-[1024px]:text-[52px] min-[1024px]:leading-[1.02] min-[1024px]:tracking-[-1px]"
          style="color: #FFF3E6;"
        >
          {{ t('home.offboarding.titleLine1') }}<br />
          <span style="color: #FF6B6B;">{{ t('home.offboarding.titleLine2') }}</span>
        </h2>

        <!-- Body -->
        <p
          class="text-[15.5px] min-[1024px]:text-[17px] leading-[1.6] mt-4 min-[1024px]:mt-5 mb-0"
          style="color: rgba(255,243,230,0.75);"
        >
          {{ t('home.offboarding.bodyBefore') }}<CodeChip variant="dark">{{ t('home.offboarding.bodyChip') }}</CodeChip>{{ t('home.offboarding.bodyAfter') }}
        </p>

        <!-- Bullets -->
        <ul class="list-none p-0 m-0 mt-5 min-[1024px]:mt-6 flex flex-col gap-2.5">
          <li
            v-for="bullet in bullets"
            :key="bullet"
            class="flex gap-2.5 text-[14.5px] min-[1024px]:text-[15px] leading-[1.5]"
            style="color: #FFF3E6;"
          >
            <span class="font-extrabold shrink-0" style="color: #FF6B6B; margin-top: 2px;">✓</span>
            <span>{{ bullet }}</span>
          </li>
        </ul>

        <!-- Honest disclaimer -->
        <p
          class="text-[12.5px] min-[1024px]:text-[13px] italic leading-[1.55] mt-[18px] min-[1024px]:mt-[22px] max-w-[480px]"
          style="color: rgba(255,243,230,0.55);"
        >
          {{ t('home.offboarding.honestyBefore') }}<CodeChip variant="dark">{{ t('home.offboarding.honestyChip') }}</CodeChip>{{ t('home.offboarding.honestyAfter') }}
        </p>
      </div>

      <!-- Frame column -->
      <div class="mt-7 min-[1024px]:mt-0 min-[1024px]:flex min-[1024px]:justify-center">
        <ScrollableMock mode="fit">
          <CookieTakeAllFrame />
        </ScrollableMock>
      </div>
    </div>
  </section>
</template>
