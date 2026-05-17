<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

interface FaqItem {
  q: string
  a1: string
  a2?: string
  a3?: string
}

const items = computed(() =>
  (tm('home.faq.items') as FaqItem[]).map((item) => ({
    q: rt(item.q),
    a1: rt(item.a1),
    a2: item.a2 ? rt(item.a2) : undefined,
    a3: item.a3 ? rt(item.a3) : undefined,
  })),
)

const openIndex = ref<number | null>(null)
function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section style="background: #FFF3E6;">
    <div
      class="mx-auto max-w-[820px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-20"
    >
      <!-- Eyebrow (purple) -->
      <div
        class="font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple text-center"
      >
        {{ t('home.faq.eyebrow') }}
      </div>

      <!-- Title -->
      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[32px] min-[1024px]:text-[44px] leading-[1.05] tracking-[-0.8px] text-center"
      >
        {{ t('home.faq.title') }}
      </h2>

      <!-- Accordion -->
      <ul class="mt-9 min-[1024px]:mt-9 list-none p-0 m-0 flex flex-col gap-3">
        <li
          v-for="(faq, i) in items"
          :key="faq.q"
          class="border border-cream-border rounded-[12px] overflow-hidden bg-white"
        >
          <button
            type="button"
            class="w-full flex items-center justify-between gap-4 px-4 min-[1024px]:px-[22px] py-4 min-[1024px]:py-[18px] text-left bg-transparent border-0 cursor-pointer"
            :aria-expanded="openIndex === i"
            @click="toggle(i)"
          >
            <span
              class="font-display font-bold text-ink text-[15.5px] min-[1024px]:text-[17px] leading-[1.35]"
            >{{ faq.q }}</span>
            <span
              class="text-purple text-[22px] font-display shrink-0 transition-transform"
              :class="openIndex === i ? 'rotate-45' : ''"
            >+</span>
          </button>
          <div
            v-if="openIndex === i"
            class="px-4 min-[1024px]:px-[22px] pb-4 min-[1024px]:pb-[18px] text-[14.5px] min-[1024px]:text-[15px] text-ink-muted leading-[1.65]"
          >
            <p class="m-0 mt-[14px]">{{ faq.a1 }}</p>
            <p v-if="faq.a2" class="m-0 mt-3">{{ faq.a2 }}</p>
            <p v-if="faq.a3" class="m-0 mt-3">{{ faq.a3 }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
