import 'picocrank/vue/composables/useTheme.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { vRepeatPress } from './repeatPress.js'

const app = createApp(App)
app.use(router)
app.directive('repeat-press', vRepeatPress)
app.mount('#app')
