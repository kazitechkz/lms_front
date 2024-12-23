import { reactive } from 'vue';
import type {LocaleState} from "@/presentation/bloc/localeBloc/localeState.ts";
import {GetLocaleUseCase} from "@/domain/use-cases/locale/GetLocaleUseCase.ts";
import {SetLocaleUseCase} from "@/domain/use-cases/locale/SetLocaleUseCase.ts";
import i18n from "@/i18n.ts";

class LocaleBloc {
    private readonly state: LocaleState;
    private getLocaleUseCase: GetLocaleUseCase;
    private setLocaleUseCase: SetLocaleUseCase;

    constructor() {
        this.getLocaleUseCase = new GetLocaleUseCase();
        this.setLocaleUseCase = new SetLocaleUseCase();

        // Загружаем язык из use case и синхронизируем с i18n
        const savedLocale = this.getLocaleUseCase.execute();
        i18n.global.locale = savedLocale;

        this.state = reactive({
            locale: savedLocale,
        });
    }

    // Получение состояния
    getState() {
        return this.state;
    }

    // Установка языка
    setLocale(locale: "ru" | "kk") {
        this.setLocaleUseCase.execute(locale); // Сохраняем язык через use case
        this.state.locale = locale; // Обновляем состояние
        i18n.global.locale = locale; // Обновляем текущий язык i18n
    }

}
function getValidLocale(locale: string | null): "ru" | "kk" {
    const validLocales: Array<"ru" | "kk"> = ["ru", "kk"];
    return validLocales.includes(locale as "ru" | "kk") ? (locale as "ru" | "kk") : "ru";
}
// Экспортируем экземпляр BLoC
export const localeBloc = new LocaleBloc();
