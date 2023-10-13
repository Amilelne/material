import { createApp } from 'vue';
import Example from './example.vue';
import '@joy/components/css/index.css';
import './src/index.less';

const app = createApp(Example);

app.mount(document.querySelector('#app') as HTMLDivElement);