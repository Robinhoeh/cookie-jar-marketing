<script setup lang="ts">
import { computed, markRaw, onMounted, onUnmounted, ref } from 'vue'
import type { Component } from 'vue'
import { useI18n } from 'vue-i18n'
import CodeChip from '@/components/primitives/CodeChip.vue'
import ScrollableMock from '@/components/mobile/ScrollableMock.vue'
import CookieDidYouMeanFrame from '@/components/frames/CookieDidYouMeanFrame.vue'
import CookieMeFrame from '@/components/frames/CookieMeFrame.vue'
import CookieWhoPersonFrame from '@/components/frames/CookieWhoPersonFrame.vue'
import CookieShelfFrame from '@/components/frames/CookieShelfFrame.vue'

const { t, tm, rt } = useI18n()

interface DemoCopy {
  cmd: string
  desc: string
}

const frames: Component[] = [
  markRaw(CookieDidYouMeanFrame),
  markRaw(CookieMeFrame),
  markRaw(CookieWhoPersonFrame),
  markRaw(CookieShelfFrame),
]

const demos = computed(() =>
  (tm('home.realSlackOutput.demos') as DemoCopy[]).map((demo, i) => ({
    cmd: rt(demo.cmd),
    desc: rt(demo.desc),
    component: frames[i],
  })),
)

// Mobile carousel: track which card is centered, update dots, allow click-to-scroll.
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
  if (!el || !scroller.value) return
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
      class="mx-auto max-w-[1180px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-24"
    >
      <!-- Eyebrow -->
      <div
        class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-purple" />
        {{ t('home.realSlackOutput.eyebrow') }}
      </div>

      <!-- Title -->
      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[34px] leading-[1.05] tracking-[-0.8px] min-[1024px]:text-[52px] min-[1024px]:leading-[1.02] min-[1024px]:tracking-[-1px] min-[1024px]:max-w-[780px]"
      >
        {{ t('home.realSlackOutput.titleLine1') }}<br />
        <span class="text-purple">{{ t('home.realSlackOutput.titleLine2') }}</span>
      </h2>

      <!-- Lede -->
      <p
        class="text-[15.5px] min-[1024px]:text-[16px] leading-[1.6] text-ink-muted mt-4 min-[1024px]:mt-5 mb-0 max-w-[660px]"
      >
        {{ t('home.realSlackOutput.lede') }}
      </p>

      <!-- Mobile (< 1024px): horizontal swipe gallery with scroll-snap.
           Cards are 78vw so the next one peeks ~22vw on the right — the swipe affordance.
           Frame area is capped to a fixed height with vertical scroll inside,
           so tall frames don't make the card a skyscraper. -->
      <div class="mt-7 min-[1024px]:hidden">
        <div
          ref="scroller"
          class="-mx-4 min-[640px]:-mx-6 px-4 min-[640px]:px-6 overflow-x-auto pb-3"
          style="-webkit-overflow-scrolling: touch; scroll-snap-type: x mandatory;"
        >
          <div class="flex gap-3 min-w-min">
            <article
              v-for="(demo, i) in demos"
              :key="demo.cmd"
              :ref="(el) => { if (el) cardRefs[i] = el as HTMLElement }"
              class="bg-white rounded-[14px] border border-cream-border p-4 flex flex-col gap-3 shrink-0 w-[78vw] max-w-[340px]"
              style="scroll-snap-align: center;"
            >
              <div>
                <CodeChip>{{ demo.cmd }}</CodeChip>
                <div class="text-[13px] text-ink-muted mt-2 leading-[1.5]">
                  {{ demo.desc }}
                </div>
              </div>
              <!-- Frame area: capped height, vertical scroll inside if the frame is taller. -->
              <div
                class="mt-auto rounded-[10px] overflow-y-auto overflow-x-hidden bg-cream-tint border border-cream-border"
                style="height: 320px; -webkit-overflow-scrolling: touch;"
              >
                <div class="p-2.5">
                  <ScrollableMock mode="fit">
                    <component :is="demo.component" />
                  </ScrollableMock>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Dot indicators — clickable, mark the active card. -->
        <div class="mt-4 flex items-center justify-center gap-2">
          <button
            v-for="(demo, i) in demos"
            :key="demo.cmd"
            type="button"
            class="rounded-full transition-all"
            :class="i === activeIndex
              ? 'w-6 h-2 bg-purple'
              : 'w-2 h-2 bg-ink-faint/40'"
            :aria-label="`Go to card ${i + 1}`"
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

      <!-- Desktop (≥ 1024px): 2-col grid -->
      <div class="hidden min-[1024px]:grid mt-11 grid-cols-2 gap-7">
        <article
          v-for="demo in demos"
          :key="demo.cmd"
          class="bg-white rounded-[16px] border border-cream-border p-6 flex flex-col gap-3.5"
        >
          <div>
            <CodeChip>{{ demo.cmd }}</CodeChip>
            <div class="text-[14px] text-ink-muted mt-2.5 leading-[1.55]">
              {{ demo.desc }}
            </div>
          </div>
          <div class="mt-auto flex justify-center">
            <ScrollableMock mode="fit">
              <component :is="demo.component" />
            </ScrollableMock>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
