<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { to: '/features', label: 'Features', name: 'features' },
  { to: '/pricing', label: 'Pricing', name: 'pricing' },
  { to: '/faq', label: 'FAQ', name: 'faq' },
]

const mobileOpen = ref(false)

watch(() => route.fullPath, () => {
  mobileOpen.value = false
})

// TODO(Phase B): wire to the real Slack OAuth install URL — same one the
// dashboard's marketplace pivot points at.
const installUrl = 'https://slack.com/oauth/v2/authorize'
</script>

<template>
  <header class="relative bg-ui-surface border-b border-ui-border">
    <div class="mx-auto max-w-7xl px-4 min-[640px]:px-6 min-[1024px]:px-8">
      <div class="flex items-center justify-between h-16 gap-4">
        <RouterLink
          to="/"
          class="flex items-center gap-2 font-display text-2xl text-brand-purple tracking-tight no-underline shrink-0"
          aria-label="Cookie Jar home"
        >
          <img
            src="/cookie-jar-logo.png"
            alt=""
            class="h-9 w-9 rounded-lg"
            width="36"
            height="36"
          />
          <span>Cookie Jar</span>
        </RouterLink>

        <ul class="hidden min-[768px]:flex gap-1 list-none m-0 p-0 flex-1 justify-center" role="list">
          <li v-for="item in navItems" :key="item.name">
            <RouterLink
              :to="item.to"
              class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors no-underline"
              :class="
                route.name === item.name
                  ? 'bg-brand-purple/10 text-brand-purple'
                  : 'text-ui-muted hover:text-ui-text hover:bg-brand-cream/50'
              "
              :aria-current="route.name === item.name ? 'page' : undefined"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <div class="hidden min-[768px]:flex items-center gap-3 shrink-0">
          <a
            href="https://cookiejar-dashboard.web.app"
            class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-ui-muted hover:text-ui-text hover:bg-brand-cream/50 transition-colors no-underline"
          >
            Sign in
          </a>
          <a
            :href="installUrl"
            class="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-brand-purple text-white hover:bg-brand-purple/90 transition-colors no-underline shadow-soft"
          >
            Add to Slack
          </a>
        </div>

        <button
          type="button"
          class="min-[768px]:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-ui-muted hover:text-ui-text hover:bg-brand-cream/50 transition-colors border-0 bg-transparent cursor-pointer"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav-menu"
          aria-label="Toggle navigation menu"
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
      class="absolute top-full left-0 right-0 z-30 min-[768px]:hidden bg-ui-surface border-b border-ui-border shadow-lg"
    >
      <div class="mx-auto max-w-7xl px-4 min-[640px]:px-6 min-[1024px]:px-8 py-4">
        <ul class="flex flex-col gap-1 list-none m-0 p-0" role="list">
          <li v-for="item in navItems" :key="item.name">
            <RouterLink
              :to="item.to"
              class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors no-underline"
              :class="
                route.name === item.name
                  ? 'bg-brand-purple/10 text-brand-purple'
                  : 'text-ui-muted hover:text-ui-text hover:bg-brand-cream/50'
              "
              :aria-current="route.name === item.name ? 'page' : undefined"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <div class="mt-3 pt-3 border-t border-ui-border flex flex-col gap-2">
          <a
            href="https://cookiejar-dashboard.web.app"
            class="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-ui-muted hover:text-ui-text hover:bg-brand-cream/50 transition-colors no-underline"
          >
            Sign in
          </a>
          <a
            :href="installUrl"
            class="flex items-center justify-center px-3 py-2 text-sm font-semibold rounded-lg bg-brand-purple text-white hover:bg-brand-purple/90 transition-colors no-underline"
          >
            Add to Slack
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
