<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FeatureBlock from './FeatureBlock.vue'
import CodeChip from '@/components/primitives/CodeChip.vue'
import CookieHelpFrame from '@/components/frames/CookieHelpFrame.vue'
import ScrollableMock from '@/components/mobile/ScrollableMock.vue'

const { t, tm, rt } = useI18n()

const bullets = computed(() =>
  (tm('home.standout3.bullets') as string[]).map((b) => rt(b)),
)
</script>

<template>
  <FeatureBlock
    accent="#16A34A"
    :tag="t('home.standout3.tag')"
    :bullets="bullets"
  >
    <template #title>
      {{ t('home.standout3.titleLine1') }}<br />
      <span class="text-green">{{ t('home.standout3.titleLine2') }}</span>
    </template>
    <template #body>
      {{ t('home.standout3.bodyBefore') }}<CodeChip>{{ t('home.standout3.bodyChip') }}</CodeChip>{{ t('home.standout3.bodyAfter') }}
    </template>
    <template #frame>
      <!-- CookieHelpFrame is tall (~760px). Use fit mode so the whole menu is visible
           without requiring a long vertical scroll-into-image situation. -->
      <ScrollableMock mode="fit">
        <CookieHelpFrame />
      </ScrollableMock>
    </template>
  </FeatureBlock>
</template>
