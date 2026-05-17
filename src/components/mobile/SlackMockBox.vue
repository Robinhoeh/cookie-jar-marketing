<script setup lang="ts">
interface Props {
  /** Hint text shown below the mock (mobile only). Pass empty string to hide. */
  hint?: string
}

withDefaults(defineProps<Props>(), {
  hint: '⟶ swipe to see more',
})
</script>

<template>
  <!-- Card containing a Slack mock that the user swipes horizontally on mobile.
       Mock renders at its natural size; the card scrolls. No scaling, no clipping. -->
  <div class="bg-white border border-cream-border rounded-[14px] overflow-hidden shadow-card-lift">
    <div v-if="$slots.label" class="px-4 pt-3.5">
      <slot name="label" />
    </div>
    <div
      class="px-4 py-3.5 overflow-x-auto"
      style="-webkit-overflow-scrolling: touch; scrollbar-width: thin;"
    >
      <div class="inline-block min-w-min">
        <slot />
      </div>
    </div>
    <div
      v-if="hint"
      class="px-4 pb-3 font-mono text-[10.5px] text-ink-faint tracking-[0.6px] min-[640px]:hidden"
    >{{ hint }}</div>
  </div>
</template>
