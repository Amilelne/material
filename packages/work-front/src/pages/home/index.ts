import {createApp} from 'vue';
import App from './app.vue';
import './css/index.less';
import '@joy/components/css/index.css';

const app = createApp(App);
app.mount('#app');