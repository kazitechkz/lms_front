import type {RoleInterface} from "@/domain/interfaces/RoleInterface.ts";
import type {Either} from "@/core/domain/Either.ts";
import type {DataError} from "@/core/domain/DataError.ts";
import type {RoleCDTO, RoleRDTO} from "@/data/dto/RoleDTO.ts";

export class GetRolesUseCase {
    private repository: RoleInterface;
    constructor({roleRepo} : {roleRepo: RoleInterface}) {
        this.repository = roleRepo;
    }

    async getAll(): Promise<Either<DataError, RoleRDTO[]>> {
        return await this.repository.getAll();
    }

    async getById(id: number): Promise<Either<DataError, RoleRDTO>> {
        return await this.repository.getRoleById(id);
    }

    async createRole(dto: RoleCDTO): Promise<Either<DataError, RoleRDTO>> {
        return await this.repository.createRole(dto);
    }

    async updateRole(id: number, dto: RoleCDTO): Promise<Either<DataError, RoleRDTO>> {
        return await this.repository.updateRole(id, dto);
    }

    async deleteRole(id: number): Promise<Either<DataError, boolean>> {
        return await this.repository.deleteRole(id);
    }
}
