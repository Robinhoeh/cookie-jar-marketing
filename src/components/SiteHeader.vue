<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { signInUrl, addToSlackUrl } from '@/config/links'
import SlackGlyph from '@/components/marks/SlackGlyph.vue'

const route = useRoute()
const { t } = useI18n()

const navItems = computed(() => [
  { to: '/', label: t('header.nav.product'), name: 'home' },
  { to: '/pricing', label: t('header.nav.pricing'), name: 'pricing' },
  { to: '/privacy', label: t('header.nav.legal'), name: 'privacy' },
])

const mobileOpen = ref(false)

watch(() => route.fullPath, () => {
  mobileOpen.value = false
})
</script>

<template>
  <header class="sticky top-0 z-40 backdrop-blur-md bg-cream-bg/80 border-b border-cream-border">
    <div class="mx-auto max-w-[1280px] px-4 min-[640px]:px-6 min-[1024px]:px-8">
      <div class="flex items-center justify-between h-16 gap-6">
        <RouterLink
          to="/"
          class="flex items-center gap-2.5 no-underline shrink-0"
          :aria-label="t('header.logoAlt')"
        >
          <img
            src="/cookie-jar-icon-2048-slack-marketplace.png"
            alt=""
            class="w-9 h-9 rounded-lg shrink-0"
            width="36"
            height="36"
          />
          <span class="font-display font-bold text-[20px] text-ink tracking-tight">Cookie Jar</span>
        </RouterLink>

        <nav class="hidden min-[768px]:flex items-center gap-7 flex-1 justify-center" role="navigation">
          <RouterLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.to"
            class="relative inline-flex items-center text-[14px] font-semibold no-underline transition-colors"
            :class="
              route.name === item.name
                ? 'text-ink after:content-[\'\'] after:absolute after:left-0 after:right-0 after:-bottom-[22px] after:h-[2px] after:bg-purple'
                : 'text-ink-muted hover:text-ink'
            "
            :aria-current="route.name === item.name ? 'page' : undefined"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <div class="hidden min-[768px]:flex items-center gap-4 shrink-0">
          <a
            :href="signInUrl"
            class="inline-flex items-center text-[14px] font-semibold text-ink-muted hover:text-ink transition-colors no-underline"
          >
            {{ t('header.signIn') }}
          </a>
          <a
            :href="addToSlackUrl"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-ink text-gold text-[14px] font-bold hover:brightness-110 transition no-underline"
          >
            <SlackGlyph :size="16" />
            {{ t('header.addToSlack') }}
          </a>
        </div>

        <button
          type="button"
          class="min-[768px]:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-ink-muted hover:text-ink hover:bg-cream-tint transition-colors border-0 bg-transparent cursor-pointer"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav-menu"
          :aria-label="t('header.menuToggleAria')"
          @click="mobileOpen = !mobileOpen"
        >
          <svg
            v-if="!mobileOpen"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-show="mobileOpen"
      id="mobile-nav-menu"
      class="absolute top-full left-0 right-0 z-30 min-[768px]:hidden bg-cream-card border-b border-cream-border shadow-lg"
    >
      <div class="mx-auto max-w-[1280px] px-4 min-[640px]:px-6 py-4">
        <ul class="flex flex-col gap-1 list-none m-0 p-0" role="list">
          <li v-for="item in navItems" :key="item.name">
            <RouterLink
              :to="item.to"
              class="flex items-center px-3 py-2 text-[14px] font-semibold rounded-lg transition-colors no-underline"
              :class="
                route.name === item.name
                  ? 'bg-purple-tint text-ink'
                  : 'text-ink-muted hover:text-ink hover:bg-cream-tint'
              "
              :aria-current="route.name === item.name ? 'page' : undefined"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <div class="mt-3 pt-3 border-t border-cream-border flex flex-col gap-2">
          <a
            :href="signInUrl"
            class="flex items-center px-3 py-2 text-[14px] font-semibold rounded-lg text-ink-muted hover:text-ink hover:bg-cream-tint transition-colors no-underline"
          >
            {{ t('header.signIn') }}
          </a>
          <a
            :href="addToSlackUrl"
            class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-[10px] bg-ink text-gold text-[14px] font-bold hover:brightness-110 transition no-underline"
          >
            <SlackGlyph :size="16" />
            {{ t('header.addToSlack') }}
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
