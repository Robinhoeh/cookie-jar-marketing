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
    { property: 'og:image', content: `${SITE_URL}/cookie-jar-icon-2048-slack-marketplace.png` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'robots', content: 'index,follow' },
  ],
  script: [
    {
      type: 'application/ld+json',
      // WebSite + Organization graph. SoftwareApplication intentionally omitted
      // until Cookie Jar lists on the Slack marketplace and has a real
      // aggregateRating to cite — Google flags faked ratings as policy violations.
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: 'Cookie Jar',
            description: 'Slack-native access management for small teams and startups.',
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'Cookie Jar',
            url: SITE_URL,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/cookie-jar-icon-2048-slack-marketplace.png`,
              width: 2048,
              height: 2048,
            },
          },
        ],
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
