import {ploc} from "@/core/ploc.ts";
import type {Router} from "vue-router";
import {handleRequest} from "@/core/utility/requestHandler.ts";
import type {RolePermissionStore} from "@/presentation/bloc/rolePermissionBloc/RolePermissionState.ts";
import type {GetRolePermissionsUseCase} from "@/domain/use-cases/role-permission/GetRolePermissionsUseCase.ts";
import type {RolePermissionCDTO} from "@/data/dto/RolePermissionDTO.ts";
import {useToast} from "vue-toast-notification";

export class RolePermissionBloc extends ploc<RolePermissionStore> {
    private getRolePermissionsUseCase: GetRolePermissionsUseCase;

    constructor({ getRolePermissionsUseCase, router, store }: {
        getRolePermissionsUseCase: GetRolePermissionsUseCase,
        router: Router,
        store: RolePermissionStore
    }) {
        super({ store, router });
        this.getRolePermissionsUseCase = getRolePermissionsUseCase;
    }

    async getPermissionsByRole(roleId: number): Promise<void> {
        await handleRequest(
            () => this.getRolePermissionsUseCase.getPermissionsByRole(roleId),
            this.store.setLoading.bind(this.store),
            this.store.setError.bind(this.store),
            this.store.setPermissionsByRole.bind(this.store),
            this.handleErrors.bind(this)
        );
    }

    async getPermissions(): Promise<void> {
        await handleRequest(
            () => this.getRolePermissionsUseCase.getPermissions(),
            this.store.setLoading.bind(this.store),
            this.store.setError.bind(this.store),
            this.store.setPermissions.bind(this.store),
            this.handleErrors.bind(this)
        );
    }

    async createRolePermissions(dto: RolePermissionCDTO): Promise<void> {
        await handleRequest(
            () => this.getRolePermissionsUseCase.createRolePermissions(dto),
            this.store.setLoading.bind(this.store),
            this.store.setError.bind(this.store),
            () => {
                this.store.setUpdatedPermissions.bind(this.store)
                const $toast = useToast({position: "top-right"});
                $toast.success("Права на роль успешно созданы");
            },
            this.handleErrors.bind(this)
        );
    }
}
