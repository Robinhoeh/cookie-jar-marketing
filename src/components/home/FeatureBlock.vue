<script setup lang="ts">
interface Props {
  /** Accent color for tag, bullet ticks, optional title accent. */
  accent: string
  /** Tag chip text (e.g. "standout 01"). */
  tag: string
  /** Alternate desktop layout (frame on the left). Affects bg shade too. */
  flip?: boolean
  /** Section background override; defaults to white (or cream when flip). */
  background?: string
  /** Bullets to render as a checklist below the body. */
  bullets: string[]
}

const props = withDefaults(defineProps<Props>(), {
  flip: false,
  background: '',
})

const sectionBg = props.background || (props.flip ? '#FFF3E6' : '#FFFFFF')
</script>

<template>
  <section :style="{ background: sectionBg }">
    <div
      class="mx-auto max-w-[1180px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-[88px] min-[1024px]:grid min-[1024px]:grid-cols-2 min-[1024px]:gap-[60px] min-[1024px]:items-center"
    >
      <!-- Copy column (always first on mobile, order flips on desktop) -->
      <div :class="flip ? 'min-[1024px]:order-2' : ''">
        <!-- Tag -->
        <div
          class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px]"
          :style="{ color: accent }"
        >
          <span class="w-1.5 h-1.5 rounded-full inline-block" :style="{ background: accent }" />
          {{ tag }}
        </div>

        <!-- Optional eyebrow chip (e.g. /cookie like @sarah CodeChip) -->
        <div v-if="$slots.eyebrow" class="mt-3 min-[1024px]:mt-3.5">
          <slot name="eyebrow" />
        </div>

        <!-- Title -->
        <h2
          class="font-display font-bold text-ink m-0 mt-3 text-[34px] leading-[1.05] tracking-[-0.8px] min-[1024px]:text-[52px] min-[1024px]:leading-[1.02] min-[1024px]:tracking-[-1px]"
        >
          <slot name="title" />
        </h2>

        <!-- Body -->
        <p
          class="text-[15.5px] min-[1024px]:text-[17px] leading-[1.6] text-ink-muted mt-4 min-[1024px]:mt-5 mb-0"
        >
          <slot name="body" />
        </p>

        <!-- Bullets -->
        <ul class="list-none p-0 m-0 mt-5 min-[1024px]:mt-6 flex flex-col gap-2.5">
          <li
            v-for="bullet in bullets"
            :key="bullet"
            class="flex gap-2.5 text-[14.5px] min-[1024px]:text-[15px] text-ink leading-[1.5]"
          >
            <span class="font-extrabold shrink-0" style="margin-top: 2px;" :style="{ color: accent }">✓</span>
            <span>{{ bullet }}</span>
          </li>
        </ul>
      </div>

      <!-- Frame column -->
      <div
        :class="flip ? 'min-[1024px]:order-1' : ''"
        class="mt-7 min-[1024px]:mt-0 min-[1024px]:flex min-[1024px]:justify-center"
      >
        <slot name="frame" />
      </div>
    </div>
  </section>
</template>
