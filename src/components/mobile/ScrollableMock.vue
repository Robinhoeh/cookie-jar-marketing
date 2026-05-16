<script setup lang="ts"></script>

<template>
  <!-- Bleed-to-edges scrollable container for hero/section Slack mocks.
       The negative margin lets content scroll past the section's gutters
       while preserving padding inside on either side of the mock itself. -->
  <div
    class="overflow-x-auto -mx-4 px-4 min-[640px]:-mx-6 min-[640px]:px-6"
    style="-webkit-overflow-scrolling: touch;"
  >
    <div class="inline-block min-w-min">
      <slot />
    </div>
  </div>
</template>
