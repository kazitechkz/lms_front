import {ploc} from "@/core/ploc.ts";
import type {Router} from "vue-router";
import {handleRequest} from "@/core/utility/requestHandler.ts";
import type {AuthStore} from "@/presentation/bloc/authBloc/AuthState.ts";
import {LoginUseCase} from "@/domain/use-cases/auth/LoginUseCase.ts";
import type {LoginCDTO} from "@/data/dto/AuthDTO.ts";

export class AuthBloc extends ploc<AuthStore> {
    private loginUseCase: LoginUseCase;

    constructor({ loginUseCase, router, store }: {
        loginUseCase: LoginUseCase,
        router: Router,
        store: AuthStore
    }) {
        super({ store, router });
        this.loginUseCase = loginUseCase;
    }

    async login(payload: LoginCDTO): Promise<void> {
        await handleRequest(
            () => this.loginUseCase.login(payload),
            this.store.setLoading.bind(this.store),
            this.store.setError.bind(this.store),
            (res) => {
                this.store.initAuth(res); // Обновляем состояние через Store
                this.redirectBasedOnRole(res.user.roleId); // Выполняем перенаправление
            },
            this.handleErrors.bind(this)
        );
    }

    logout = () => {
        localStorage.clear();
        this.store.$reset();
        this.router.push('/login'); // Перенаправление на страницу логинации
    }

    private redirectBasedOnRole(roleId: number): void {
        console.log(roleId)
        if (roleId === 1) {
            this.router.push('/admin/dashboard'); // Перенаправление для админа
        } else if (roleId === 2) {
            this.router.push('/user/home'); // Перенаправление для пользователя
        } else {
            this.router.push('/guest/welcome'); // Перенаправление для гостя
        }
    }
}
