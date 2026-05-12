<script setup lang="ts">
const installUrl = 'https://slack.com/oauth/v2/authorize'
</script>

<template>
  <section class="mx-auto max-w-5xl px-4 min-[640px]:px-6 min-[1024px]:px-8 py-20 text-center">
    <h1 class="font-display text-4xl min-[768px]:text-6xl text-brand-plum tracking-tight">
      Slack-native access management
    </h1>
    <p class="mt-6 text-lg min-[768px]:text-xl text-ui-muted max-w-2xl mx-auto">
      Cookie Jar lets teams request access to tools, route approvals to the right owner,
      and see who has what — all from Slack.
    </p>
    <div class="mt-10 flex items-center justify-center gap-4 flex-wrap">
      <a
        :href="installUrl"
        class="inline-flex items-center px-6 py-3 text-base font-semibold rounded-xl bg-brand-purple text-white hover:bg-brand-purple/90 transition-colors no-underline shadow-soft"
      >
        Add to Slack
      </a>
      <RouterLink
        to="/features"
        class="inline-flex items-center px-6 py-3 text-base font-semibold rounded-xl bg-ui-surface text-brand-plum border border-ui-border hover:bg-brand-cream/50 transition-colors no-underline"
      >
        See how it works
      </RouterLink>
    </div>
    <p class="mt-16 text-sm text-ui-muted">
      Full marketing site coming soon. In the meantime — check the
      <RouterLink to="/privacy" class="text-brand-purple hover:underline">Privacy Policy</RouterLink>
      and
      <RouterLink to="/terms" class="text-brand-purple hover:underline">Terms of Service</RouterLink>.
    </p>
  </section>
</template>
