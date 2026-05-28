<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t, tm, rt } = useI18n()

const employeeBullets = computed(() =>
  (tm('home.problem.employee.bullets') as string[]).map((b) => rt(b)),
)
const ownerBullets = computed(() =>
  (tm('home.problem.owner.bullets') as string[]).map((b) => rt(b)),
)

const EMPLOYEE_COLOR = '#16A34A'
const OWNER_COLOR = '#FFB703'

function hexToRgba(hex: string, alpha: number): string {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Decorative mock data — not i18n content, just visual flavor.
interface DM {
  handle: string
  time: string
  message: string
  avatarColor: string
}

const employeeDM: DM = {
  handle: 'you',
  time: '2:14pm',
  message: 'Hey, can I get access to GitHub?',
  avatarColor: EMPLOYEE_COLOR,
}

// Owner's Slack — DMs blowing up with notifications. The CTO's day is
// investor/legal/customer/board fires. The access request from `@robin`
// is the one out-of-place item — proving access shouldn't go through
// the one person already drowning in important stuff. Same person, same
// time as the employee card on the left.
interface OwnerDM extends DM {
  highlighted?: boolean
  urgency: 'urgent' | 'not-urgent'
  tilt: number // hand-drawn rotation in degrees for the urgency label
}

const ownerDMs: OwnerDM[] = [
  { handle: 'sarah (co-founder)', time: '2:08pm', message: 'investor meeting Tuesday — 3pm work?', avatarColor: '#B000FF', urgency: 'urgent', tilt: -3 },
  { handle: 'alex (design)', time: '2:09pm', message: 'lunch? thinking ramen', avatarColor: '#FF6B6B', urgency: 'not-urgent', tilt: 2 },
  { handle: 'legal', time: '2:11pm', message: 'term sheet ready — call tonight?', avatarColor: '#7C2D8F', urgency: 'urgent', tilt: -4 },
  { handle: 'robin', time: '2:14pm', message: 'Hey, can I get access to GitHub?', avatarColor: EMPLOYEE_COLOR, highlighted: true, urgency: 'not-urgent', tilt: 3 },
  { handle: 'acme (customer)', time: '2:16pm', message: 'renewal call this week?', avatarColor: '#16A34A', urgency: 'urgent', tilt: -2 },
  { handle: 'vp-eng', time: '2:18pm', message: 'hiring panel feedback at 3?', avatarColor: '#FFB703', urgency: 'urgent', tilt: 4 },
  { handle: 'accountant', time: '2:20pm', message: 'W9 signature by EOD?', avatarColor: '#7C2D8F', urgency: 'urgent', tilt: -3 },
]
</script>

<template>
  <section class="bg-white">
    <div
      class="mx-auto max-w-[1080px] px-4 min-[640px]:px-6 min-[1024px]:px-8 py-14 min-[640px]:py-16 min-[1024px]:py-20"
    >
      <!-- Eyebrow -->
      <div
        class="inline-flex items-center gap-2 font-mono text-[11px] min-[1024px]:text-[12px] font-bold uppercase tracking-[1.4px]"
        style="color: #FF6B6B;"
      >
        <span class="w-1.5 h-1.5 rounded-full" style="background: #FF6B6B;" />
        {{ t('home.problem.eyebrow') }}
      </div>

      <!-- SEO-leaning headline -->
      <h2
        class="font-display font-bold text-ink m-0 mt-3 text-[30px] min-[1024px]:text-[48px] leading-[1.05] tracking-[-0.8px] min-[1024px]:max-w-[900px]"
      >
        {{ t('home.problem.headline') }}
      </h2>

      <!-- Two role cards: side-by-side at lg+, stacked on mobile.
           Employee on the LEFT (order-1), Owner on the RIGHT (order-2).
           DOM order kept owner-first so we can swap back via Tailwind
           `order` classes if positioning changes again. -->
      <div
        class="mt-9 min-[1024px]:mt-12 grid grid-cols-1 min-[1024px]:grid-cols-2 gap-8 min-[1024px]:gap-6 items-stretch"
      >
        <!-- ─────────── OWNER CARD (rendered second via order-2) ─────────── -->
        <article
          class="order-2 relative rounded-[14px] p-5 min-[1024px]:p-7 border overflow-hidden flex flex-col"
          :style="{
            background: hexToRgba(OWNER_COLOR, 0.05),
            borderColor: hexToRgba(OWNER_COLOR, 0.3),
          }"
        >
          <span
            aria-hidden="true"
            class="absolute left-0 top-0 bottom-0 w-1"
            :style="{ background: OWNER_COLOR }"
          />

          <!-- Heading block — OUTSIDE/above the Slack mock per user direction -->
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[10.5px] min-[1024px]:text-[11px] font-bold uppercase tracking-[1.2px]"
            :style="{
              background: hexToRgba(OWNER_COLOR, 0.18),
              color: '#8A5E00',
            }"
          >
            {{ t('home.problem.owner.roleChip') }}
          </span>
          <h3
            class="mt-3 font-display font-bold text-ink m-0 text-[19px] min-[1024px]:text-[22px] leading-[1.25] tracking-[-0.3px]"
          >
            {{ t('home.problem.owner.headline') }}
          </h3>

          <!-- DM mock — Slack DMs blowing up. Every bubble unread; the
               access request from @robin is the only out-of-place message.
               Hand-drawn urgency labels overlaid (marker font + rotation)
               to break the clean Slack aesthetic. -->
          <div
            aria-hidden="true"
            class="mt-4 min-[1024px]:mt-5 rounded-[10px] bg-white border border-cream-border overflow-hidden font-slack"
            style="min-height: 380px;"
          >
            <!-- Notification header — "blowing up" indicator -->
            <div
              class="flex items-center justify-between gap-2 px-3 py-2 border-b border-cream-border"
              style="background: rgba(255,107,107,0.06);"
            >
              <div class="flex items-center gap-1.5 text-ink text-[11.5px] font-bold">
                <span>🔔</span>
                <span>Direct messages</span>
              </div>
              <span
                class="inline-flex items-center px-2 py-0.5 rounded-full text-white text-[10px] font-bold"
                style="background: #FF6B6B;"
              >12 new</span>
            </div>

            <ul class="flex flex-col list-none p-0 m-0">
              <li
                v-for="dm in ownerDMs"
                :key="dm.handle + dm.time"
                class="relative flex items-center gap-2.5 px-3 py-2 border-b last:border-b-0"
                :style="dm.highlighted
                  ? { background: hexToRgba(EMPLOYEE_COLOR, 0.09), borderBottomColor: hexToRgba(EMPLOYEE_COLOR, 0.18) }
                  : { borderBottomColor: '#F5E9DA' }"
              >
                <!-- Unread dot indicator -->
                <span
                  class="w-1.5 h-1.5 rounded-full shrink-0"
                  :style="{ background: dm.highlighted ? EMPLOYEE_COLOR : '#FF6B6B' }"
                />
                <span
                  class="w-5 h-5 rounded text-white flex items-center justify-center text-[10px] font-bold shrink-0 uppercase"
                  :style="{ background: dm.avatarColor }"
                >{{ dm.handle.charAt(0) }}</span>
                <div class="flex-1 min-w-0">
                  <div class="flex items-baseline gap-2">
                    <span class="font-bold text-ink text-[12px] truncate">{{ dm.handle }}</span>
                    <span class="text-ink-muted text-[10.5px] shrink-0 ml-auto">{{ dm.time }}</span>
                  </div>
                  <div class="text-ink text-[12px] truncate font-semibold">{{ dm.message }}</div>
                </div>
                <!-- Hand-drawn urgency label — marker font + rotation breaks the clean Slack UI. -->
                <span
                  class="shrink-0 whitespace-nowrap"
                  :style="{
                    fontFamily: '\'Permanent Marker\', cursive',
                    fontSize: '13px',
                    color: dm.urgency === 'urgent' ? '#D63647' : '#8A7A8A',
                    transform: `rotate(${dm.tilt}deg)`,
                    marginLeft: '4px',
                  }"
                >{{ dm.urgency === 'urgent' ? 'Urgent!' : 'Not urgent' }}</span>
              </li>
            </ul>
          </div>

          <!-- Supporting bullets (max 3) — below the Slack mock -->
          <ul class="mt-5 min-[1024px]:mt-6 list-none p-0 m-0 flex flex-col gap-2.5 min-[1024px]:gap-3">
            <li
              v-for="bullet in ownerBullets"
              :key="bullet"
              class="flex gap-2.5 items-start text-[14px] min-[1024px]:text-[15px] text-ink leading-[1.5]"
            >
              <span class="shrink-0 mt-1 font-bold text-[14px]" style="color: #8A5E00;">→</span>
              <span>{{ bullet }}</span>
            </li>
          </ul>
        </article>

        <!-- ─────────── EMPLOYEE CARD (rendered first via order-1) ─────────── -->
        <article
          class="order-1 relative rounded-[14px] p-5 min-[1024px]:p-7 border overflow-hidden flex flex-col"
          :style="{
            background: hexToRgba(EMPLOYEE_COLOR, 0.04),
            borderColor: hexToRgba(EMPLOYEE_COLOR, 0.25),
          }"
        >
          <span
            aria-hidden="true"
            class="absolute left-0 top-0 bottom-0 w-1"
            :style="{ background: EMPLOYEE_COLOR }"
          />

          <!-- Heading block — OUTSIDE/above the Slack mock per user direction -->
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[10.5px] min-[1024px]:text-[11px] font-bold uppercase tracking-[1.2px]"
            :style="{
              background: hexToRgba(EMPLOYEE_COLOR, 0.14),
              color: EMPLOYEE_COLOR,
            }"
          >
            {{ t('home.problem.employee.roleChip') }}
          </span>
          <h3
            class="mt-3 font-display font-bold text-ink m-0 text-[19px] min-[1024px]:text-[22px] leading-[1.25] tracking-[-0.3px]"
          >
            {{ t('home.problem.employee.headline') }}
          </h3>

          <!-- DM mock — ONE quiet request. Same min-height as owner mock so
               both Slack boxes visually align. The empty space below the
               message IS the silence — the visual point. -->
          <div
            aria-hidden="true"
            class="mt-4 min-[1024px]:mt-5 rounded-[10px] bg-white border border-cream-border p-3 min-[1024px]:p-4 font-slack flex flex-col"
            style="min-height: 380px;"
          >
            <div class="flex items-start gap-2.5">
              <span
                class="w-7 h-7 rounded-md text-white flex items-center justify-center text-[12px] font-bold shrink-0 uppercase"
                :style="{ background: employeeDM.avatarColor }"
              >{{ employeeDM.handle.charAt(0) }}</span>
              <div class="flex-1 min-w-0">
                <div class="flex items-baseline gap-2">
                  <span class="font-bold text-ink text-[13px]">{{ employeeDM.handle }}</span>
                  <span class="text-ink-muted text-[11px]">{{ employeeDM.time }}</span>
                </div>
                <div class="text-ink text-[13.5px] leading-[1.4] mt-0.5">{{ employeeDM.message }}</div>
              </div>
            </div>
            <!-- Waiting indicator pushed to the bottom — the gap above IS the silence -->
            <div
              class="mt-auto pt-4 pl-[38px] flex items-center gap-1.5 text-ink-muted text-[13px] italic"
            >
              <span>⏳</span> Waiting…
            </div>
          </div>

          <!-- Supporting bullets (max 3) — below the Slack mock -->
          <ul class="mt-5 min-[1024px]:mt-6 list-none p-0 m-0 flex flex-col gap-2.5 min-[1024px]:gap-3">
            <li
              v-for="bullet in employeeBullets"
              :key="bullet"
              class="flex gap-2.5 items-start text-[14px] min-[1024px]:text-[15px] text-ink leading-[1.5]"
            >
              <span class="shrink-0 mt-1 font-bold text-[14px]" :style="{ color: EMPLOYEE_COLOR }">→</span>
              <span>{{ bullet }}</span>
            </li>
          </ul>
        </article>
      </div>

      <!-- Contextual link to depth page — preserves SEO body-link density
           lost when WhySlackSection + ToolsStripSection were removed. -->
      <div class="mt-9 min-[1024px]:mt-12 text-center">
        <RouterLink
          to="/how-it-works"
          class="inline-flex items-center gap-1.5 text-[15px] min-[1024px]:text-[16px] font-semibold text-purple no-underline hover:underline"
        >
          See how Cookie Jar fixes this <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
