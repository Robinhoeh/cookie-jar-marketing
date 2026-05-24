<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { Analytics } from '@vercel/analytics/vue'

const SITE_URL = 'https://usecookiejar.com'
const route = useRoute()

const canonicalHref = computed(() => `${SITE_URL}${route.path}`)

useHead({
  link: [{ rel: 'canonical', href: canonicalHref }],
  meta: [
    { property: 'og:site_name', content: 'Cookie Jar' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalHref },
    { property: 'og:image', content: `${SITE_URL}/cookie-jar-logo.png` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'robots', content: 'index,follow' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Cookie Jar',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Slack',
        url: SITE_URL,
        description: 'Slack-native access management for small teams and startups.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: '30-day free trial',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Cookie Jar',
          url: SITE_URL,
          logo: `${SITE_URL}/cookie-jar-logo.png`,
        },
      }),
    },
  ],
})
</script>

<template>
  <Analytics />

  <div class="min-h-screen flex flex-col">
    <SiteHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
