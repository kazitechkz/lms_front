import type {RoleInterface} from "@/domain/interfaces/RoleInterface.ts";
import type {RoleEntity} from "@/domain/entities/RoleEntity.ts";
import {BaseRepository} from "@/core/data/BaseRepository.ts";
import type CustomAxios from "@/core/utility/customAxios.ts";
import {Either} from "@/core/domain/Either.ts";
import type {DataError} from "@/core/domain/DataError.ts";
import {RoleModel} from "@/data/models/RoleModel.ts";

export class RoleRepository extends BaseRepository implements RoleInterface {
    constructor({ axios }: { axios: CustomAxios }) {
        if (!axios) {
            throw new Error("Missing required parameter: axios");
        }
        super({ axios });
    };

    async getAll(): Promise<Either<DataError, RoleEntity[]>> {
        try {
            const { data } = await this.axios.get('role');
            const roles = data.map((roleData: any) => RoleModel.fromJson(roleData).toDomain());
            return Either.right(roles);
        } catch (error) {
            return Either.left(this.handleErrors(error));
        }
    }

    async getRoleById(id: number): Promise<Either<DataError, RoleEntity>> {
        try {
            const { data } = await this.axios.get('role/get/' + id);
            const role = RoleModel.fromJson(data).toDomain();
            return Either.right(role);
        } catch (error) {
            return Either.left(this.handleErrors(error));
        }
    }
}
