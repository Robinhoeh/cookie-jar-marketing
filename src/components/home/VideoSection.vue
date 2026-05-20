<script setup lang="ts">
import { computed } from 'vue'

const YOUTUBE_VIDEO_ID = '6paQLCArY3Y'

const embedSrc = computed(() =>
  YOUTUBE_VIDEO_ID
    ? `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`
    : '',
)
</script>

<template>
  <section class="bg-white">
    <div
      class="mx-auto max-w-[1080px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-20"
    >
      <div class="text-center max-w-[680px] mx-auto">
        <div
          class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px] text-purple"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-purple" />
          The full picture
        </div>
        <h2
          class="font-display font-bold text-ink m-0 mt-3 text-[30px] min-[1024px]:text-[44px] leading-[1.05] tracking-[-0.7px]"
        >
          See it in <span class="text-purple">60 seconds.</span>
        </h2>
        <p
          class="mt-4 text-[15.5px] min-[1024px]:text-[17px] leading-[1.55] text-ink-muted"
        >
          A one-minute walkthrough: install, assign owners, request, approve. No narrator, no fluff.
        </p>
      </div>

      <!-- 16:9 video frame -->
      <div
        class="mt-9 min-[1024px]:mt-12 mx-auto max-w-[960px] rounded-[14px] overflow-hidden border border-cream-border bg-cream-tint"
        style="aspect-ratio: 16 / 9; box-shadow: 0 12px 32px -16px rgba(45,30,47,0.25);"
      >
        <iframe
          v-if="embedSrc"
          :src="embedSrc"
          title="Cookie Jar — how it works in 60 seconds"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"
          class="w-full h-full block border-0"
        />
        <div
          v-else
          class="w-full h-full flex flex-col items-center justify-center text-center px-6 text-ink-muted"
        >
          <div class="text-[42px] min-[1024px]:text-[56px]">🎬</div>
          <div class="mt-3 font-display font-bold text-ink text-[17px] min-[1024px]:text-[20px]">
            Video coming soon
          </div>
          <div class="mt-1 text-[13.5px] min-[1024px]:text-[14.5px] max-w-[420px]">
            We're polishing the final cut. In the meantime, scroll down for the step-by-step.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
