import { createApp } from 'vue'
import store from './store/index.js'
import router from './router.js'

import App from './App.vue'
import BaseDialog from "@/components/base/BaseDialog.vue";
import BaseSpinner from "@/components/base/BaseSpinner.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";

const app = createApp(App)

app.component('base-dialog', BaseDialog)
app.component('base-spinner', BaseSpinner)
app.component('base-header', BaseHeader)

app.use(router)
app.use(store)
app.mount('#app')
