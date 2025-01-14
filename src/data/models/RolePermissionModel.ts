import type {PermissionRDTO, RolePermissionCDTO, RolePermissionRDTO} from "@/data/dto/RolePermissionDTO.ts";

export class RolePermissionModel {
    public id: number
    public roleId: number
    public permissionId: number

    constructor(data: RolePermissionRDTO) {
        this.id = data.id;
        this.roleId = data.roleId;
        this.permissionId = data.permissionId;
    }

    static fromJson(json: any): RolePermissionModel {
        return new RolePermissionModel({
            id: json.id,
            roleId: json.role_id,
            permissionId: json.permission_id
        });
    }

    public toDomain() {
        return {
            id: this.id,
            roleId: this.roleId,
            permissionId: this.permissionId
        };
    }

    public toServer(): RolePermissionCDTO {
        return {
            roleId: this.roleId,
            permissionId: this.permissionId
        };
    }
}

export class PermissionModel {
    public id: number
    public titleKk: string
    public titleRu: string

    constructor(data: PermissionRDTO) {
        this.id = data.id;
        this.titleKk = data.titleKk;
        this.titleRu = data.titleRu
    }

    static fromJson(json: any): PermissionModel {
        return new PermissionModel({
            id: json.id,
            titleKk: json.title_kk,
            titleRu: json.title_ru
        });
    }

    public toDomain() {
        return {
            id: this.id,
            titleKk: this.titleKk,
            titleRu: this.titleRu
        };
    }
}
