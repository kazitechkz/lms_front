import {BaseRepository} from "@/core/data/BaseRepository.ts";
import type CustomAxios from "@/core/utility/customAxios.ts";
import {Either} from "@/core/domain/Either.ts";
import type {DataError} from "@/core/domain/DataError.ts";
import {mapObjectFields} from "@/presentation/utils/objectMapper.ts";
import type {RolePermissionInterface} from "@/domain/interfaces/RolePermissionInterface.ts";
import {PermissionModel, RolePermissionModel} from "@/data/models/RolePermissionModel.ts";
import type {PermissionRDTO, RolePermissionCDTO, RolePermissionRDTO} from "@/data/dto/RolePermissionDTO.ts";
import {dtoToServer} from "@/data/dto/RolePermissionDTO.ts";

export class RolePermissionRepository extends BaseRepository implements RolePermissionInterface {
    constructor({ axios }: { axios: CustomAxios }) {
        if (!axios) {
            throw new Error("Missing required parameter: axios");
        }
        super({ axios });
    };

    async getPermissionsByRole(roleId: number): Promise<Either<DataError, PermissionRDTO[]>> {
        try {
            const { data } = await this.axios.get('role-permission/get/'+roleId);
            const permissions = data.map((permissionData: any) => PermissionModel.fromJson(permissionData).toDomain());
            return Either.right(permissions);
        } catch (error) {
            return Either.left(this.handleErrors(error));
        }
    }

    async getPermissions(): Promise<Either<DataError, PermissionRDTO[]>> {
        try {
            const { data } = await this.axios.get('permission');
            const permissions = data.map((permissionData: any) => PermissionModel.fromJson(permissionData).toDomain());
            return Either.right(permissions);
        } catch (error) {
            return Either.left(this.handleErrors(error));
        }
    }

    async createRolePermissions(dto: RolePermissionCDTO): Promise<Either<DataError, RolePermissionRDTO[]>> {
        try {
            const serverDto = mapObjectFields(dto, dtoToServer)
            const { data } = await this.axios.post('role-permission/create', serverDto);
            const permissions = data.map((permissionData: any) => RolePermissionModel.fromJson(permissionData).toDomain());
            return Either.right(permissions);
        } catch (error) {
            return Either.left(this.handleErrors(error));
        }
    }
}
