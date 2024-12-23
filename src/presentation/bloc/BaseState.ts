export class BaseState<T> {
    public data: T;
    public isLoading: boolean = false;
    public error: string | null = null;

    constructor(init?: Partial<BaseState<T>>) {
        this.data = (init && init.data) as T;
        this.isLoading = init?.isLoading ?? false;
        this.error = init?.error ?? null;
    }
}
