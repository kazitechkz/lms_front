export class GetLocaleUseCase {
    execute(): "ru" | "kk" {
        const savedLocale = localStorage.getItem('locale') as "ru" | "kk" | null;
        return savedLocale || 'ru'; // Возвращаем сохранённый язык или "ru" по умолчанию
    }
}
