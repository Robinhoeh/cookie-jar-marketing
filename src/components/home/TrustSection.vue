<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

interface TrustItem {
  title: string
  body: string
}
interface FaqItem {
  q: string
  a: string
}

const items = computed(() =>
  (tm('home.trust.items') as TrustItem[]).map((item) => ({
    title: rt(item.title),
    body: rt(item.body),
  })),
)

const faqItems = computed(() =>
  (tm('home.secFaq.items') as FaqItem[]).map((item) => ({
    q: rt(item.q),
    a: rt(item.a),
  })),
)

const openIndex = ref<number | null>(null)
function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section class="bg-white">
    <div
      class="mx-auto max-w-[1080px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-24"
    >
      <!-- Eyebrow (green) -->
      <div
        class="font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-green"
      >
        {{ t('home.trust.eyebrow') }}
      </div>

      <!-- Title — green accent on line 2 -->
      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[34px] leading-[1.05] tracking-[-0.8px] min-[1024px]:text-[52px] min-[1024px]:leading-[1.02] min-[1024px]:tracking-[-1px] min-[1024px]:max-w-[760px]"
      >
        {{ t('home.trust.titleLine1') }}<br />
        <span class="text-green">{{ t('home.trust.titleLine2') }}</span>
      </h2>

      <!-- Check-list items: 1 col mobile, 2 col desktop -->
      <ul
        class="mt-8 min-[1024px]:mt-10 grid grid-cols-1 min-[1024px]:grid-cols-2 gap-3 min-[1024px]:gap-3.5 list-none p-0 m-0"
      >
        <li
          v-for="item in items"
          :key="item.title"
          class="flex gap-3 min-[1024px]:gap-[14px] items-start bg-cream-tint border border-cream-border rounded-[12px] px-4 py-4 min-[1024px]:px-5 min-[1024px]:py-[18px]"
        >
          <span
            class="w-7 h-7 shrink-0 rounded-[8px] bg-green text-white flex items-center justify-center text-[14px] font-extrabold"
          >✓</span>
          <div>
            <div
              class="font-display font-bold text-ink text-[15.5px] min-[1024px]:text-[16px] tracking-[-0.1px]"
            >
              {{ item.title }}
            </div>
            <div
              class="text-[13.5px] min-[1024px]:text-[14px] text-ink-muted leading-[1.5] mt-1"
            >
              {{ item.body }}
            </div>
          </div>
        </li>
      </ul>

      <!-- Dark honesty card -->
      <div
        class="mt-6 min-[1024px]:mt-6 rounded-[12px] p-5 min-[1024px]:px-6 min-[1024px]:py-5 flex gap-4 min-[1024px]:gap-4 items-start"
        style="background: #2D1E2F; color: #FFF3E6;"
      >
        <span
          class="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.6px] px-2 py-1 rounded-[4px]"
          style="background: rgba(255,183,3,0.15); color: #FFB703;"
        >{{ t('home.trust.honestyBadge') }}</span>
        <div>
          <div class="font-display font-bold text-[17px]" style="color: #FFF3E6;">
            {{ t('home.trust.honestyTitle') }}
          </div>
          <div
            class="text-[14.5px] leading-[1.55] mt-1.5"
            style="color: rgba(255,243,230,0.8);"
          >
            {{ t('home.trust.honestyBody') }}
          </div>
        </div>
      </div>

      <!-- Security FAQ accordion -->
      <div class="mt-9 min-[1024px]:mt-9">
        <h3
          class="font-display font-bold text-ink m-0 text-[20px] min-[1024px]:text-[22px] tracking-[-0.3px]"
        >
          {{ t('home.secFaq.title') }}
        </h3>
        <ul class="mt-3.5 min-[1024px]:mt-3.5 list-none p-0 m-0 flex flex-col gap-2.5">
          <li
            v-for="(faq, i) in faqItems"
            :key="faq.q"
            class="border border-cream-border rounded-[10px] overflow-hidden bg-cream-tint"
          >
            <button
              type="button"
              class="w-full flex items-center justify-between gap-4 px-4 min-[1024px]:px-[18px] py-3.5 min-[1024px]:py-[14px] text-left bg-transparent border-0 cursor-pointer"
              :aria-expanded="openIndex === i"
              @click="toggle(i)"
            >
              <span
                class="font-display font-bold text-ink text-[14.5px] min-[1024px]:text-[15.5px]"
              >{{ faq.q }}</span>
              <span
                class="text-green text-[20px] font-display shrink-0 transition-transform"
                :class="openIndex === i ? 'rotate-45' : ''"
              >+</span>
            </button>
            <div
              v-if="openIndex === i"
              class="px-4 min-[1024px]:px-[18px] pb-4 min-[1024px]:pb-[14px] text-[14px] min-[1024px]:text-[14.5px] text-ink-muted leading-[1.6]"
            >
              {{ faq.a }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
