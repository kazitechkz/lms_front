/**
 * Универсальная утилита для преобразования объектов
 * @param source Объект, который нужно преобразовать
 * @param fieldMap Маппинг полей: { полеКлиента: полеСервера }
 * @returns Преобразованный объект
 */
export function mapObjectFields(
    source: Record<string, any>,
    fieldMap: Record<string, string>
): Record<string, any> {
    const result: Record<string, any> = {};

    Object.entries(fieldMap).forEach(([clientField, serverField]) => {
        if (source[clientField] !== undefined) {
            result[serverField] = source[clientField];
        }
    });

    return result;
}
