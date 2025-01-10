import type {RoleInterface} from "@/domain/interfaces/RoleInterface.ts";
import type {Role} from "@/domain/entities/Role.ts";
import type {Either} from "@/core/domain/Either.ts";
import type {DataError} from "@/core/domain/DataError.ts";

export class GetRolesUseCase {
    private repository: RoleInterface;
    constructor({roleRepo} : {roleRepo: RoleInterface}) {
        this.repository = roleRepo;
    }

    async getAll(): Promise<Either<DataError, Role[]>> {
        return await this.repository.getAll();
    }

    async getById(id: number): Promise<Either<DataError, Role>> {
        return await this.repository.getRoleById(id);
    }
}
