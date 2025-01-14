import type {Either} from "@/core/domain/Either.ts";
import type {DataError} from "@/core/domain/DataError.ts";
import type {PermissionRDTO, RolePermissionCDTO, RolePermissionRDTO} from "@/data/dto/RolePermissionDTO.ts";

export interface RolePermissionInterface {
    getPermissionsByRole(roleId: number): Promise<Either<DataError, PermissionRDTO[]>>;
    getPermissions(): Promise<Either<DataError, PermissionRDTO[]>>;
    createRolePermissions(dto: RolePermissionCDTO): Promise<Either<DataError, RolePermissionRDTO[]>>;
}