<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface Props {
  /**
   * 'fit' — scales the natural-size mock down so it fits the container width.
   *         No horizontal scroll. Use for smaller mocks (≤ 560px wide).
   * 'swipe' — bleeds to section edges, horizontal scroll, swipe hint label.
   *           Use for tall/dense mocks where shrinking would hurt legibility.
   */
  mode?: 'fit' | 'swipe'
  /** Below this container width (px), the scaling/swipe behavior kicks in.
   *  Above it, the mock renders at natural size with no wrapper styling. */
  breakpoint?: number
  /** Optional hint text shown below the mock (swipe mode only). */
  hint?: string
  /** Natural width (px) of the mock. The inner is forced to this width so
   *  measurements reflect the mock's real size, not the constrained container. */
  naturalWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'fit',
  breakpoint: 1024,
  hint: '⟶ swipe to see more',
  naturalWidth: 560,
})

// Measure container + inner for fit-mode scaling.
const wrapper = ref<HTMLElement | null>(null)
const inner = ref<HTMLElement | null>(null)
const containerWidth = ref<number>(0)
const innerWidth = ref<number>(0)
const innerHeight = ref<number>(0)

let containerObserver: ResizeObserver | null = null
let innerObserver: ResizeObserver | null = null

const isBelow = computed(() => containerWidth.value > 0 && containerWidth.value < props.breakpoint)

const fitScale = computed(() => {
  if (props.mode !== 'fit') return 1
  if (!isBelow.value) return 1
  if (containerWidth.value === 0 || innerWidth.value === 0) return 1
  const s = containerWidth.value / innerWidth.value
  return Math.min(1, s)
})

const scaledHeight = computed(() => innerHeight.value * fitScale.value)

function measureContainer() {
  if (!wrapper.value) return
  containerWidth.value = wrapper.value.getBoundingClientRect().width
}
function measureInner() {
  if (!inner.value) return
  innerWidth.value = inner.value.offsetWidth
  innerHeight.value = inner.value.offsetHeight
}

onMounted(() => {
  measureContainer()
  measureInner()
  if (typeof ResizeObserver !== 'undefined') {
    if (wrapper.value) {
      containerObserver = new ResizeObserver(() => measureContainer())
      containerObserver.observe(wrapper.value)
    }
    if (inner.value) {
      innerObserver = new ResizeObserver(() => measureInner())
      innerObserver.observe(inner.value)
    }
  }
})

onUnmounted(() => {
  containerObserver?.disconnect()
  innerObserver?.disconnect()
})
</script>

<template>
  <!-- FIT mode: scale the natural-size mock to fit the container width.
       Above the breakpoint or when content fits, renders at natural size.
       Inner is forced to naturalWidth so measurements reflect the real size,
       not the constrained parent — otherwise scaling never kicks in and content
       gets clipped instead of shrunk. -->
  <div
    v-if="mode === 'fit'"
    ref="wrapper"
    class="relative w-full"
    :style="fitScale < 1 ? { height: scaledHeight + 'px' } : {}"
  >
    <div
      ref="inner"
      :style="fitScale < 1
        ? { width: naturalWidth + 'px', transform: `scale(${fitScale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }
        : { width: naturalWidth + 'px', maxWidth: '100%' }"
    >
      <slot />
    </div>
  </div>

  <!-- SWIPE mode: bleed to section edges, scrollable, with hint label on mobile. -->
  <div v-else>
    <div
      class="overflow-x-auto -mx-4 px-4 min-[640px]:-mx-6 min-[640px]:px-6 min-[1024px]:overflow-visible min-[1024px]:mx-0 min-[1024px]:px-0"
      style="-webkit-overflow-scrolling: touch;"
    >
      <div class="inline-block min-w-min">
        <slot />
      </div>
    </div>
    <div
      v-if="hint"
      class="mt-2 text-center font-mono text-[10.5px] uppercase tracking-[0.8px] text-ink-faint min-[1024px]:hidden"
    >{{ hint }}</div>
  </div>
</template>
