import i18n from "@/i18n.ts";

export class SetLocaleUseCase {
    execute(locale: "ru" | "kk"): void {
        i18n.global.locale = locale;
        localStorage.setItem('locale', locale); // Сохраняем язык в localStorage
    }
}
