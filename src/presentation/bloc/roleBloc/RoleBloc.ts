import type {GetRolesUseCase} from "@/domain/use-cases/role/GetRolesUseCase.ts";
import {ploc} from "@/core/ploc.ts";
import type {RoleStore} from "@/presentation/bloc/roleBloc/RoleState.ts";
import type {Router} from "vue-router";
import {handleRequest} from "@/core/utility/requestHandler.ts";
import type {RoleCDTO} from "@/data/dto/RoleDTO.ts";
import {useToast} from "vue-toast-notification";

export class RoleBloc extends ploc<RoleStore> {
    private getRolesUseCase: GetRolesUseCase;

    constructor({ getRolesUseCase, router, store }: {
        getRolesUseCase: GetRolesUseCase,
        router: Router,
        store: RoleStore
    }) {
        super({ store, router });
        this.getRolesUseCase = getRolesUseCase;
    }

    async loadRoles(): Promise<void> {
        await handleRequest(
            () => this.getRolesUseCase.getAll(),
            this.store.setLoading.bind(this.store),
            this.store.setError.bind(this.store),
            this.store.setRoles.bind(this.store),
            this.handleErrors.bind(this)
        );
    }

    async getRoleById(id: number): Promise<void> {
        await handleRequest(
            () => this.getRolesUseCase.getById(id),
            this.store.setLoading.bind(this.store),
            this.store.setError.bind(this.store),
            this.store.setRole.bind(this.store),
            this.handleErrors.bind(this)
        );
    }

    async createRole(dto: RoleCDTO): Promise<void> {
        await handleRequest(
            () => this.getRolesUseCase.createRole(dto),
            this.store.setLoading.bind(this.store),
            () => {
                this.store.setError.bind(this.store)
            },
            () => {
                const $toast = useToast();
                let instance = $toast.success('Роль успешно создана');
            },
            this.handleErrors.bind(this)
        );
    }

    async updateRole(id: number, dto: RoleCDTO): Promise<void> {
        await handleRequest(
            () => this.getRolesUseCase.updateRole(id, dto),
            this.store.setLoading.bind(this.store),
            () => {
                this.store.setError.bind(this.store)
            },
            () => {
                const $toast = useToast();
                $toast.success('Роль успешно обновлена');
            },
            this.handleErrors.bind(this)
        );
    }

    async deleteRole(id: number): Promise<void> {
        await handleRequest(
            () => this.getRolesUseCase.deleteRole(id),
            this.store.setLoading.bind(this.store),
            () => {
                this.store.setError.bind(this.store)
            },
            () => {
                const $toast = useToast();
                let instance = $toast.success('Роль успешно удалена');
            },
            this.handleErrors.bind(this)
        );
    }
}
