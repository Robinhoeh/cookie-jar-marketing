<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

interface ProductFaq {
  q: string
  a1: string
  a2?: string
  a3?: string
}
interface TrustItem {
  title: string
  body: string
}
interface SecurityFaq {
  q: string
  a: string
}

const productItems = computed(() =>
  (tm('home.faq.items') as ProductFaq[]).map((item) => ({
    q: rt(item.q),
    a1: rt(item.a1),
    a2: item.a2 ? rt(item.a2) : undefined,
    a3: item.a3 ? rt(item.a3) : undefined,
  })),
)

const trustItems = computed(() =>
  (tm('home.trust.items') as TrustItem[]).map((item) => ({
    title: rt(item.title),
    body: rt(item.body),
  })),
)

const securityItems = computed(() =>
  (tm('home.secFaq.items') as SecurityFaq[]).map((item) => ({
    q: rt(item.q),
    a: rt(item.a),
  })),
)

const openProduct = ref<number | null>(null)
const openSecurity = ref<number | null>(null)
function toggleProduct(i: number) {
  openProduct.value = openProduct.value === i ? null : i
}
function toggleSecurity(i: number) {
  openSecurity.value = openSecurity.value === i ? null : i
}
</script>

<template>
  <!-- Page header strip -->
  <section style="background: radial-gradient(ellipse at top, #FFE0CF 0%, #FFF3E6 70%);">
    <div
      class="mx-auto max-w-[820px] px-4 min-[640px]:px-6 min-[1024px]:px-8 pt-12 min-[1024px]:pt-20 pb-10 min-[1024px]:pb-14 text-center"
    >
      <div
        class="font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple"
      >
        Cookie Jar
      </div>
      <h1
        class="font-display font-bold text-ink m-0 mt-3 text-[36px] min-[1024px]:text-[56px] leading-[1.05] tracking-[-0.8px]"
      >
        Frequently asked questions
      </h1>
      <p
        class="mt-4 text-[15.5px] min-[1024px]:text-[17px] text-ink-muted max-w-[640px] mx-auto leading-[1.55]"
      >
        Quick answers about the product and how we handle your data.
      </p>
      <nav class="mt-6 flex items-center justify-center gap-3 flex-wrap">
        <a
          href="#product"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-cream-border text-[13px] font-semibold text-ink no-underline hover:border-purple/30 transition-colors"
        >
          Product <span class="text-purple">↓</span>
        </a>
        <a
          href="#security"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-cream-border text-[13px] font-semibold text-ink no-underline hover:border-green/30 transition-colors"
        >
          Security &amp; compliance <span class="text-green">↓</span>
        </a>
      </nav>
    </div>
  </section>

  <!-- Product FAQ -->
  <section id="product" style="background: #FFF3E6;" class="scroll-mt-20">
    <div
      class="mx-auto max-w-[820px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-20"
    >
      <div
        class="font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple"
      >
        Product
      </div>
      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[28px] min-[1024px]:text-[36px] leading-[1.1] tracking-[-0.6px]"
      >
        {{ t('home.faq.title') }}
      </h2>
      <ul class="mt-8 list-none p-0 m-0 flex flex-col gap-3">
        <li
          v-for="(faq, i) in productItems"
          :key="faq.q"
          class="border border-cream-border rounded-[12px] overflow-hidden bg-white"
        >
          <button
            type="button"
            class="w-full flex items-center justify-between gap-4 px-4 min-[1024px]:px-[22px] py-4 min-[1024px]:py-[18px] text-left bg-transparent border-0 cursor-pointer"
            :aria-expanded="openProduct === i"
            @click="toggleProduct(i)"
          >
            <span
              class="font-display font-bold text-ink text-[15.5px] min-[1024px]:text-[17px] leading-[1.35]"
            >{{ faq.q }}</span>
            <span
              class="text-purple text-[22px] font-display shrink-0 transition-transform"
              :class="openProduct === i ? 'rotate-45' : ''"
            >+</span>
          </button>
          <div
            v-if="openProduct === i"
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

  <!-- Security & compliance -->
  <section id="security" class="bg-white scroll-mt-20">
    <div
      class="mx-auto max-w-[1080px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-24"
    >
      <div
        class="font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-green"
      >
        {{ t('home.trust.eyebrow') }}
      </div>
      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[28px] min-[1024px]:text-[40px] leading-[1.05] tracking-[-0.7px] min-[1024px]:max-w-[760px]"
      >
        {{ t('home.trust.titleLine1') }}<br />
        <span class="text-green">{{ t('home.trust.titleLine2') }}</span>
      </h2>

      <!-- Check-list -->
      <ul
        class="mt-8 grid grid-cols-1 min-[1024px]:grid-cols-2 gap-3 min-[1024px]:gap-3.5 list-none p-0 m-0"
      >
        <li
          v-for="item in trustItems"
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

      <!-- Honesty card -->
      <div
        class="mt-6 rounded-[12px] p-5 min-[1024px]:px-6 min-[1024px]:py-5 flex gap-4 min-[1024px]:gap-4 items-start"
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

      <!-- Security accordion -->
      <div class="mt-10">
        <h3
          class="font-display font-bold text-ink m-0 text-[20px] min-[1024px]:text-[22px] tracking-[-0.3px]"
        >
          {{ t('home.secFaq.title') }}
        </h3>
        <ul class="mt-3.5 list-none p-0 m-0 flex flex-col gap-2.5">
          <li
            v-for="(faq, i) in securityItems"
            :key="faq.q"
            class="border border-cream-border rounded-[10px] overflow-hidden bg-cream-tint"
          >
            <button
              type="button"
              class="w-full flex items-center justify-between gap-4 px-4 min-[1024px]:px-[18px] py-3.5 min-[1024px]:py-[14px] text-left bg-transparent border-0 cursor-pointer"
              :aria-expanded="openSecurity === i"
              @click="toggleSecurity(i)"
            >
              <span
                class="font-display font-bold text-ink text-[14.5px] min-[1024px]:text-[15.5px]"
              >{{ faq.q }}</span>
              <span
                class="text-green text-[20px] font-display shrink-0 transition-transform"
                :class="openSecurity === i ? 'rotate-45' : ''"
              >+</span>
            </button>
            <div
              v-if="openSecurity === i"
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
