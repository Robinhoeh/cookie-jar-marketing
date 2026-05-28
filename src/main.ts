import { ViteSSG } from 'vite-ssg'
import '@fontsource-variable/inter/index.css'
import '@fontsource-variable/outfit/index.css'
import '@fontsource-variable/jetbrains-mono/index.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import '@fontsource/lato/400-italic.css'
import '@fontsource/permanent-marker/400.css'
import App from './App.vue'
import { routes } from './router'
import { i18n } from './i18n'
import './style.css'

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior: () => ({ top: 0 }) },
  ({ app }) => {
    app.use(i18n)
  },
)
