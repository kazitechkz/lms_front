import type {Either} from "@/core/domain/Either.ts";
import type {DataError} from "@/core/domain/DataError.ts";
import type {RolePermissionInterface} from "@/domain/interfaces/RolePermissionInterface.ts";
import type {PermissionRDTO, RolePermissionCDTO} from "@/data/dto/RolePermissionDTO.ts";

export class GetRolePermissionsUseCase {
    private repository: RolePermissionInterface;
    constructor({rolePermissionRepo} : {rolePermissionRepo: RolePermissionInterface}) {
        this.repository = rolePermissionRepo;
    }

    async getPermissionsByRole(roleId: number): Promise<Either<DataError, PermissionRDTO[]>> {
        return await this.repository.getPermissionsByRole(roleId);
    }

    async getPermissions(): Promise<Either<DataError, PermissionRDTO[]>> {
        return await this.repository.getPermissions();
    }

    async createRolePermissions(dto: RolePermissionCDTO): Promise<Either<DataError, RolePermissionRDTO[]>> {
        return await this.repository.createRolePermissions(dto);
    }

}
