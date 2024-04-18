import { createApp, defineAsyncComponent } from 'vue';
import '/node_modules/bulma/css/bulma.css';
import router from './router';
import App from './App.vue';
import store from './store/index.js';
import BaseCard from './components/ui/BaseCard.vue';
import BaseBadge from './components/ui/BaseBatch.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue'
//import BaseDialog from './components/ui/BaseDialog.vue'

const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'));

const app = createApp(App);

app.use(router);
app.use(store);
app.component('base-card', BaseCard);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
