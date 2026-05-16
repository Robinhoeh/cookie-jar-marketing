<script setup lang="ts"></script>

<template>
  <!-- Below 640px: cropped detail with caption + dashed border (legible on phones).
       640px+: full dashboard image (looks like the real product). -->
  <figure class="m-0 w-full">
    <!-- Mobile crop -->
    <div class="min-[640px]:hidden">
      <div class="rounded-xl overflow-hidden border-2 border-dashed border-cream-border-2 bg-white">
        <img
          src="/dashboard-crop.png"
          srcset="/dashboard-crop.png 1x, /dashboard-crop@2x.png 2x"
          alt="A cropped detail of the Cookie Jar admin dashboard, showing 4 team members and the cookies in their jars."
          width="720"
          height="600"
          class="block w-full h-auto"
          loading="lazy"
        />
      </div>
      <figcaption class="mt-2 text-center font-mono text-[11px] uppercase tracking-[1.2px] text-ink-muted">
        Detail · admin dashboard
      </figcaption>
    </div>

    <!-- Desktop full dashboard -->
    <img
      src="/dashboard-snapshot.png"
      srcset="/dashboard-snapshot.png 1x, /dashboard-snapshot@2x.png 2x"
      alt="Cookie Jar admin dashboard showing 8 people and the cookies in each of their jars."
      width="1280"
      height="820"
      class="hidden min-[640px]:block w-full h-auto rounded-xl border border-cream-border"
      style="box-shadow: 0 6px 24px rgba(45,30,47,0.10);"
      loading="lazy"
    />
  </figure>
</template>
