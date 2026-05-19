import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Cookie Jar — Slack access management' },
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: () => import('@/views/PricingView.vue'),
    meta: { title: 'Pricing — Cookie Jar' },
  },
  {
    path: '/how-it-works',
    name: 'how-it-works',
    component: () => import('@/views/HowItWorksView.vue'),
    meta: { title: 'How it works — Cookie Jar' },
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/views/FaqView.vue'),
    meta: { title: 'FAQ & Security — Cookie Jar' },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/views/PrivacyView.vue'),
    meta: { title: 'Privacy Policy — Cookie Jar' },
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('@/views/TermsView.vue'),
    meta: { title: 'Terms of Service — Cookie Jar' },
  },
]
