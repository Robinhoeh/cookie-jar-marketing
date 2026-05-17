<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Props {
  /** Maximum scale to apply on large viewports. Set 1 to never grow beyond natural size. */
  scale?: number
  /** Minimum scale floor — frames won't shrink smaller than this. Below the implied min container width, the frame may overflow horizontally and the parent should scroll. */
  minScale?: number
}

const props = withDefaults(defineProps<Props>(), {
  scale: 1,
  minScale: 0.25,
})

const wrapper = ref<HTMLElement | null>(null)
const inner = ref<HTMLElement | null>(null)
const containerWidth = ref<number>(0)
const innerWidth = ref<number>(0)
const innerHeight = ref<number>(0)

let containerObserver: ResizeObserver | null = null
let innerObserver: ResizeObserver | null = null

// Scale = min(target, container/native). Always fit, never overflow.
const effectiveScale = computed(() => {
  if (containerWidth.value === 0 || innerWidth.value === 0) return props.scale
  const fitScale = containerWidth.value / innerWidth.value
  const target = Math.min(props.scale, fitScale)
  return Math.max(props.minScale, target)
})

const scaledHeight = computed(() => innerHeight.value * effectiveScale.value)

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
  measureInner()
  measureContainer()
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
  <div
    ref="wrapper"
    class="relative w-full"
    :style="{
      height: scaledHeight > 0 ? scaledHeight + 'px' : 'auto',
    }"
  >
    <div
      ref="inner"
      :style="{
        transform: `scale(${effectiveScale})`,
        transformOrigin: 'top left',
        filter: 'drop-shadow(0 16px 30px rgba(45,30,47,0.10))',
        position: 'absolute',
        top: 0,
        left: 0,
      }"
    >
      <slot />
    </div>
  </div>
</template>
