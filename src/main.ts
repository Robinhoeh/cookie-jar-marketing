import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import { i18n } from './i18n'
import './style.css'

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior: () => ({ top: 0 }) },
  ({ app, router, isClient }) => {
    app.use(i18n)
    if (isClient) {
      router.afterEach((to) => {
        const title = to.meta.title
        if (typeof title === 'string') {
          document.title = title
        }
      })
    }
  },
)
