<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FeatureBlock from './FeatureBlock.vue'
import CodeChip from '@/components/primitives/CodeChip.vue'
import Flow1A_Frame2 from '@/components/frames/Flow1A_Frame2.vue'
import ScrollableMock from '@/components/mobile/ScrollableMock.vue'

const { t, tm, rt } = useI18n()

const bullets = computed(() =>
  (tm('home.standout1.bullets') as string[]).map((b) => rt(b)),
)
</script>

<template>
  <FeatureBlock
    accent="#B000FF"
    :tag="t('home.standout1.tag')"
    :bullets="bullets"
  >
    <template #eyebrow>
      <CodeChip>{{ t('home.standout1.eyebrow') }}</CodeChip>
    </template>
    <template #title>
      {{ t('home.standout1.titleLine1') }}<br />
      <span class="text-purple">{{ t('home.standout1.titleLine2') }}</span>
    </template>
    <template #body>
      {{ t('home.standout1.bodyBefore') }}<CodeChip>{{ t('home.standout1.bodyChip') }}</CodeChip>{{ t('home.standout1.bodyAfter') }}
    </template>
    <template #frame>
      <!-- Mobile: scale-to-fit. Desktop: natural-size, centered in column. -->
      <ScrollableMock mode="fit">
        <Flow1A_Frame2 />
      </ScrollableMock>
    </template>
  </FeatureBlock>
</template>
