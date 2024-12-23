import { createI18n } from 'vue-i18n'
import kk from '@/presentation/locales/kk.json';
import ru from '@/presentation/locales/ru.json';

const i18n = createI18n({
    locale: 'ru', // Установите текущий язык
    fallbackLocale: 'ru', // Резервный язык
    messages: {
        kk,
        ru
    },
})

export default i18n;