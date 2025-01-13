import type {Either} from "@/core/domain/Either.ts";
import type {DataError} from "@/core/domain/DataError.ts";
import type {RoleCDTO, RoleRDTO} from "@/data/dto/RoleDTO.ts";

export interface RoleInterface {
    getAll(): Promise<Either<DataError, RoleRDTO[]>>;
    getRoleById(id: number): Promise<Either<DataError, RoleRDTO>>;
    createRole(dto: RoleCDTO): Promise<Either<DataError, RoleRDTO>>;
    updateRole(id: number, dto: RoleCDTO): Promise<Either<DataError, RoleRDTO>>;
    deleteRole(id: number): Promise<Either<DataError, boolean>>;
}
