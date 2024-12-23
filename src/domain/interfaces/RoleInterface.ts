import type {RoleEntity} from "@/domain/entities/RoleEntity.ts";
import type {Either} from "@/core/domain/Either.ts";
import type {DataError} from "@/core/domain/DataError.ts";

export interface RoleInterface {
    getAll(): Promise<Either<DataError, RoleEntity[]>>;
    getRoleById(id: number): Promise<Either<DataError, RoleEntity>>;
}
