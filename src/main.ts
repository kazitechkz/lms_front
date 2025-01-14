// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import './index.css'
import i18n from "@/i18n.ts";
import router from "@/presentation/router";
import {createPinia} from "pinia";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

const app = createApp(App);
app.use(createPinia())
app.use(ToastPlugin);
app.use(i18n)
app.use(router); // Подключаем маршрутизацию
app.mount('#app');