import type {ErrorData} from "@/core/domain/DataError.ts";

export class BaseResponseModel<T> {
    public message: string;
    public data: T;
    public errors: ErrorData[];

    constructor(args: { message: string; data: T; errors: ErrorData[] }) {
        this.message = args.message;
        this.data = args.data;
        this.errors = args.errors;
    }

    // Обратите внимание на типизацию:
    // T - тип данных внутри ответа
    // R - результирующий тип экземпляра класса, наследующего BaseResponseModel<T>
    static fromJson<T, R extends BaseResponseModel<T>>(
        this: new (args: { message: string; data: T; errors: ErrorData[] }) => R,
        json: any,
        parseFn: (json: any) => T
    ): R {
        return new this({
            message: json.message,
            data: parseFn(json.data),
            errors: json.errors,
        });
    }

    public toDomain(transformFn: (data: T) => any): { message: string; data: any; errors: ErrorData[] } {
        return {
            message: this.message,
            data: transformFn(this.data),
            errors: this.errors,
        };
    }
}