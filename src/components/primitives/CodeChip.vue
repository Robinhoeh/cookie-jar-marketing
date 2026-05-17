<script setup lang="ts">
interface Props {
  /** Use 'dark' on plum/dark sections — gold text on transparent cream tint. */
  variant?: 'default' | 'dark'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<template>
  <code
    v-if="variant === 'dark'"
    class="font-mono text-[13px] px-2 py-0.5 rounded-[5px] whitespace-nowrap"
    style="color: #FFB703; background: rgba(255,243,230,0.10); border: 1px solid rgba(255,243,230,0.15);"
  >
    <slot />
  </code>
  <code
    v-else
    class="font-mono text-[14px] bg-ink text-gold px-2 py-0.5 rounded-[5px] whitespace-nowrap"
  >
    <slot />
  </code>
</template>
