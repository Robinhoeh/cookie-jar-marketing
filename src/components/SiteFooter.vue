<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-brand-plum text-brand-cream mt-16">
    <div class="mx-auto max-w-7xl px-4 min-[640px]:px-6 min-[1024px]:px-8 py-12">
      <div class="grid gap-8 min-[768px]:grid-cols-3">
        <div>
          <RouterLink
            to="/"
            class="flex items-center gap-2 font-display text-2xl text-brand-cream tracking-tight no-underline"
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
          <p class="mt-3 text-sm text-brand-cream/80 max-w-xs">
            Slack-native access management. Ask, approve, audit — without leaving the chat.
          </p>
        </div>

        <div>
          <h2 class="font-display text-sm uppercase tracking-wider text-brand-cream/70 mb-3">Product</h2>
          <ul class="space-y-2 list-none m-0 p-0">
            <li><RouterLink to="/features" class="text-sm hover:underline">Features</RouterLink></li>
            <li><RouterLink to="/pricing" class="text-sm hover:underline">Pricing</RouterLink></li>
            <li><RouterLink to="/faq" class="text-sm hover:underline">FAQ</RouterLink></li>
          </ul>
        </div>

        <div>
          <h2 class="font-display text-sm uppercase tracking-wider text-brand-cream/70 mb-3">Legal</h2>
          <ul class="space-y-2 list-none m-0 p-0">
            <li><RouterLink to="/privacy" class="text-sm hover:underline">Privacy Policy</RouterLink></li>
            <li><RouterLink to="/terms" class="text-sm hover:underline">Terms of Service</RouterLink></li>
            <li><RouterLink to="/support" class="text-sm hover:underline">Support</RouterLink></li>
          </ul>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-brand-cream/10 text-xs text-brand-cream/60">
        © {{ year }} Cookie Jar. All rights reserved.
      </div>
    </div>
  </footer>
</template>
