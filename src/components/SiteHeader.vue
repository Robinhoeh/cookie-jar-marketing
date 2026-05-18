<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
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

function closeDrawer() {
  mobileOpen.value = false
}

// CTA emphasis: bright after hero scrolls past on home, always-bright off-home.
const heroVisible = ref(true)
let heroObserver: IntersectionObserver | null = null

watch(
  () => route.name,
  (name) => {
    heroObserver?.disconnect()
    heroObserver = null

    if (name !== 'home') {
      heroVisible.value = false
      return
    }

    heroVisible.value = true

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    requestAnimationFrame(() => {
      const hero = document.getElementById('home-hero')
      if (!hero) return
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          heroVisible.value = entry.isIntersecting
        },
        { threshold: 0, rootMargin: '-80px 0px 0px 0px' },
      )
      heroObserver.observe(hero)
    })
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  heroObserver?.disconnect()
})

const emphasizeCta = computed(() => !heroVisible.value)
</script>

<template>
  <header class="sticky top-0 z-40 backdrop-blur-md bg-cream-bg/[0.94] border-b border-cream-border">
    <div class="mx-auto max-w-[1280px] px-4 min-[640px]:px-6 min-[1024px]:px-8">
      <div class="flex items-center justify-between h-[58px] min-[768px]:h-16 gap-3 min-[768px]:gap-6">
        <RouterLink
          to="/"
          class="flex items-center gap-2 min-[768px]:gap-2.5 no-underline shrink-0"
          :aria-label="t('header.logoAlt')"
        >
          <img
            src="/cookie-jar-icon-2048-slack-marketplace.png"
            alt=""
            class="w-[30px] h-[30px] min-[768px]:w-9 min-[768px]:h-9 rounded-lg shrink-0"
            width="36"
            height="36"
          />
          <span class="font-display font-bold text-[17px] min-[768px]:text-[20px] text-ink tracking-tight">Cookie Jar</span>
        </RouterLink>

        <!-- Desktop nav -->
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

        <!-- Desktop CTAs -->
        <div class="hidden min-[768px]:flex items-center gap-4 shrink-0">
          <a
            :href="signInUrl"
            class="inline-flex items-center text-[14px] font-semibold text-ink-muted hover:text-ink transition-colors no-underline"
          >
            {{ t('header.signIn') }}
          </a>
          <a
            :href="addToSlackUrl"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-ink text-gold text-[14px] font-bold hover:brightness-110 transition-all no-underline"
            :class="emphasizeCta ? 'shadow-[0_0_0_3px_rgba(255,183,3,0.35),0_8px_20px_-6px_rgba(45,30,47,0.45)] scale-[1.02]' : ''"
          >
            <SlackGlyph :size="16" />
            {{ t('header.addToSlack') }}
          </a>
        </div>

        <!-- Mobile compact "Add" + hamburger -->
        <div class="flex min-[768px]:hidden items-center gap-2 shrink-0">
          <a
            :href="addToSlackUrl"
            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-ink text-gold text-[12.5px] font-bold whitespace-nowrap no-underline transition-shadow"
            :class="emphasizeCta ? 'shadow-[0_0_0_2.5px_rgba(255,183,3,0.45)]' : ''"
          >
            <SlackGlyph :size="13" />
            Add
          </a>
          <button
            type="button"
            class="hamburger w-[38px] h-[38px] bg-white border border-cream-border rounded-lg relative p-0 cursor-pointer"
            :aria-expanded="mobileOpen"
            aria-controls="mobile-nav-drawer"
            :aria-label="t('header.menuToggleAria')"
            @click="mobileOpen = !mobileOpen"
          >
            <span
              class="absolute left-1/2 top-1/2 block w-4 h-[2px] rounded-[1px] bg-ink transition-transform duration-200 origin-center"
              :style="mobileOpen
                ? 'transform: translate(-50%, -50%) rotate(45deg);'
                : 'transform: translate(-50%, calc(-50% - 6px));'"
            />
            <span
              class="absolute left-1/2 top-1/2 block w-4 h-[2px] rounded-[1px] bg-ink transition-opacity duration-150"
              :style="mobileOpen
                ? 'opacity: 0; transform: translate(-50%, -50%);'
                : 'opacity: 1; transform: translate(-50%, -50%);'"
            />
            <span
              class="absolute left-1/2 top-1/2 block w-4 h-[2px] rounded-[1px] bg-ink transition-transform duration-200 origin-center"
              :style="mobileOpen
                ? 'transform: translate(-50%, -50%) rotate(-45deg);'
                : 'transform: translate(-50%, calc(-50% + 6px));'"
            />
          </button>
        </div>
      </div>
    </div>

  </header>

  <!-- Mobile drawer — teleported to <body> so `fixed inset-0` escapes the
       sticky header's containing block and the backdrop covers the whole viewport. -->
  <Teleport to="body">
    <div
      v-if="mobileOpen"
      id="mobile-nav-drawer"
      class="fixed inset-0 z-50 min-[768px]:hidden flex flex-col"
      style="background: rgba(45,30,47,0.45);"
      @click="closeDrawer"
    >
      <div
        class="bg-cream-bg border-b border-cream-border px-[18px] py-3.5 pb-7 flex flex-col"
        style="margin-top: 58px; box-shadow: 0 16px 32px -8px rgba(45,30,47,0.25);"
        @click.stop
      >
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          class="flex items-center justify-between px-1 py-3.5 text-[19px] font-display font-semibold no-underline"
          :class="route.name === item.name ? 'text-purple' : 'text-ink'"
          :aria-current="route.name === item.name ? 'page' : undefined"
          @click="closeDrawer"
        >
          <span>{{ item.label }}</span>
          <span class="text-base" :class="route.name === item.name ? 'text-purple' : 'text-[#C8BCC0]'">→</span>
        </RouterLink>
        <div class="h-px bg-cream-border my-2.5" />
        <a
          :href="signInUrl"
          class="flex items-center justify-between px-1 py-3.5 text-[19px] font-display font-semibold text-ink-muted no-underline"
          @click="closeDrawer"
        >
          <span>{{ t('header.signIn') }}</span>
          <span class="text-base text-[#C8BCC0]">→</span>
        </a>
      </div>
    </div>
  </Teleport>
</template>
