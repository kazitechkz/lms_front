import type {RoleInterface} from "@/domain/interfaces/RoleInterface.ts";
import {BaseRepository} from "@/core/data/BaseRepository.ts";
import type CustomAxios from "@/core/utility/customAxios.ts";
import {Either} from "@/core/domain/Either.ts";
import type {DataError} from "@/core/domain/DataError.ts";
import {RoleModel} from "@/data/models/RoleModel.ts";
import type {RoleCDTO, RoleRDTO} from "@/data/dto/RoleDTO.ts";
import {mapObjectFields} from "@/presentation/utils/objectMapper.ts";
import {dtoToServer} from "@/data/dto/RoleDTO.ts";

export class RoleRepository extends BaseRepository implements RoleInterface {
    constructor({ axios }: { axios: CustomAxios }) {
        if (!axios) {
            throw new Error("Missing required parameter: axios");
        }
        super({ axios });
    };

    async getAll(): Promise<Either<DataError, RoleRDTO[]>> {
        try {
            const { data } = await this.axios.get('role');
            const roles = data.map((roleData: any) => RoleModel.fromJson(roleData).toDomain());
            return Either.right(roles);
        } catch (error) {
            return Either.left(this.handleErrors(error));
        }
    }

    async getRoleById(id: number): Promise<Either<DataError, RoleRDTO>> {
        try {
            const { data } = await this.axios.get('role/get/' + id);
            const role = RoleModel.fromJson(data).toDomain();
            return Either.right(role);
        } catch (error) {
            return Either.left(this.handleErrors(error));
        }
    }

    async createRole(dto: RoleCDTO): Promise<Either<DataError, RoleRDTO>> {
        try {
            const serverDto = mapObjectFields(dto, dtoToServer)
            const { data } = await this.axios.post('role/create', serverDto);
            const role = RoleModel.fromJson(data).toDomain();
            return Either.right(role);
        } catch (error) {
            return Either.left(this.handleErrors(error));
        }
    }

    async updateRole(id: number, dto: RoleCDTO): Promise<Either<DataError, RoleRDTO>> {
        try {
            const serverDto = mapObjectFields(dto, dtoToServer)
            const { data } = await this.axios.put('role/update/'+id, serverDto);
            const role = RoleModel.fromJson(data).toDomain();
            return Either.right(role);
        } catch (error) {
            return Either.left(this.handleErrors(error));
        }
    }

    async deleteRole(id: number): Promise<Either<DataError, boolean>> {
        try {
            await this.axios.delete('role/delete/' + id);
            return Either.right(true);
        } catch (error) {
            return Either.left(this.handleErrors(error));
        }
    }
}
