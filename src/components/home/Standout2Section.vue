<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FeatureBlock from './FeatureBlock.vue'
import Flow2A_Frame1 from '@/components/frames/Flow2A_Frame1.vue'
import ScrollableMock from '@/components/mobile/ScrollableMock.vue'

const { t, tm, rt } = useI18n()

const bullets = computed(() =>
  (tm('home.standout2.bullets') as string[]).map((b) => rt(b)),
)
</script>

<template>
  <FeatureBlock
    accent="#FF6B6B"
    :tag="t('home.standout2.tag')"
    :bullets="bullets"
    flip
  >
    <template #title>
      {{ t('home.standout2.titleLine1') }}<br />
      <span style="color: #FF6B6B;">{{ t('home.standout2.titleLine2') }}</span>
    </template>
    <template #body>
      {{ t('home.standout2.body') }}
    </template>
    <template #frame>
      <ScrollableMock mode="fit">
        <Flow2A_Frame1 />
      </ScrollableMock>
    </template>
  </FeatureBlock>
</template>
