<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

interface RoadmapItem {
  title: string
  body: string
}

const items = computed(() =>
  (tm('home.proRoadmap.items') as RoadmapItem[]).map((item) => ({
    title: rt(item.title),
    body: rt(item.body),
  })),
)

// Mobile swipe gallery state
const scroller = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])
const activeIndex = ref(0)

function onScroll() {
  if (!scroller.value || cardRefs.value.length === 0) return
  const scrollerRect = scroller.value.getBoundingClientRect()
  const scrollerCenter = scrollerRect.left + scrollerRect.width / 2
  let closest = 0
  let closestDist = Infinity
  cardRefs.value.forEach((el, i) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cardCenter = rect.left + rect.width / 2
    const dist = Math.abs(cardCenter - scrollerCenter)
    if (dist < closestDist) {
      closestDist = dist
      closest = i
    }
  })
  activeIndex.value = closest
}

function scrollToIndex(i: number) {
  const el = cardRefs.value[i]
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
}

onMounted(() => {
  scroller.value?.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  scroller.value?.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <section style="background: #FFF3E6;">
    <div
      class="mx-auto max-w-[1180px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-[88px]"
    >
      <!-- Eyebrow (gold) -->
      <div
        class="font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-gold"
      >
        {{ t('home.proRoadmap.eyebrow') }}
      </div>

      <!-- Title — gold accent on line 2 -->
      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[34px] leading-[1.05] tracking-[-0.8px] min-[1024px]:text-[48px] min-[1024px]:leading-[1.05] min-[1024px]:tracking-[-0.8px] min-[1024px]:max-w-[760px]"
      >
        {{ t('home.proRoadmap.titleLine1') }}<br />
        <span class="text-gold">{{ t('home.proRoadmap.titleLine2') }}</span>
      </h2>

      <!-- Lede -->
      <p
        class="text-[15.5px] min-[1024px]:text-[16px] leading-[1.6] text-ink-muted mt-4 min-[1024px]:mt-3.5 mb-0 max-w-[660px]"
      >
        {{ t('home.proRoadmap.ledeBefore') }}<span class="text-ink">{{ t('home.proRoadmap.ledeStrong') }}</span>
      </p>

      <!-- Mobile (< 1024px): swipe gallery -->
      <div class="mt-7 min-[1024px]:hidden">
        <div
          ref="scroller"
          class="-mx-4 min-[640px]:-mx-6 px-4 min-[640px]:px-6 overflow-x-auto pb-3"
          style="-webkit-overflow-scrolling: touch; scroll-snap-type: x mandatory;"
        >
          <div class="flex gap-3 min-w-min">
            <article
              v-for="(item, i) in items"
              :key="item.title"
              :ref="(el) => { if (el) cardRefs[i] = el as HTMLElement }"
              class="bg-white border border-cream-border rounded-[14px] p-[22px] flex flex-col gap-2.5 shrink-0 w-[78vw] max-w-[340px]"
              style="scroll-snap-align: center;"
            >
              <div>
                <span
                  class="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.6px] text-gold bg-ink px-[7px] py-[3px] rounded-[4px]"
                >{{ t('home.proRoadmap.comingSoonBadge') }}</span>
              </div>
              <h3
                class="font-display font-bold text-ink m-0 text-[18px] leading-[1.2] tracking-[-0.2px] mt-2.5"
              >
                {{ item.title }}
              </h3>
              <p class="text-[13.5px] text-ink-muted leading-[1.55] m-0 mt-2">
                {{ item.body }}
              </p>
            </article>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-center gap-1.5">
          <button
            v-for="(item, i) in items"
            :key="item.title"
            type="button"
            class="rounded-full transition-all"
            :class="i === activeIndex
              ? 'w-5 h-1.5 bg-gold'
              : 'w-1.5 h-1.5 bg-ink-faint/40'"
            :aria-label="`Go to roadmap item ${i + 1}`"
            :aria-current="i === activeIndex ? 'true' : 'false'"
            @click="scrollToIndex(i)"
          />
        </div>
        <div
          class="mt-2 text-center font-mono text-[10.5px] uppercase tracking-[0.8px] text-ink-faint"
        >
          ⟶ swipe or tap a dot
        </div>
      </div>

      <!-- Desktop (≥ 1024px): 3-col grid as in design -->
      <div class="hidden min-[1024px]:grid mt-10 grid-cols-3 gap-4">
        <article
          v-for="(item) in items"
          :key="item.title"
          class="bg-white border border-cream-border rounded-[14px] p-[22px]"
        >
          <div class="mb-2.5">
            <span
              class="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.6px] text-gold bg-ink px-[7px] py-[3px] rounded-[4px]"
            >{{ t('home.proRoadmap.comingSoonBadge') }}</span>
          </div>
          <h3
            class="font-display font-bold text-ink m-0 text-[18px] leading-[1.2] tracking-[-0.2px]"
          >
            {{ item.title }}
          </h3>
          <p class="text-[13.5px] text-ink-muted leading-[1.55] m-0 mt-2">
            {{ item.body }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
