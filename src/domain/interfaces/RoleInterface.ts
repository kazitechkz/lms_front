import type {Role} from "@/domain/entities/Role.ts";
import type {Either} from "@/core/domain/Either.ts";
import type {DataError} from "@/core/domain/DataError.ts";

export interface RoleInterface {
    getAll(): Promise<Either<DataError, Role[]>>;
    getRoleById(id: number): Promise<Either<DataError, Role>>;
}
