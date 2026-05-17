<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="mx-auto max-w-3xl px-4 min-[640px]:px-6 py-20 text-center">
    <h1 class="font-display text-4xl text-brand-plum tracking-tight">{{ t('features.title') }}</h1>
    <p class="mt-4 text-ui-muted">{{ t('features.comingSoon') }}</p>
  </section>
</template>
