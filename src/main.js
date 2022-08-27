import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import './css/style.scss'

const app = createApp(App)

app.component('Datepicker', Datepicker);

app.use(router)
app.mount('#app');
