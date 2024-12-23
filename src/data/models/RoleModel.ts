import {RoleEntity} from "@/domain/entities/RoleEntity.ts";

export class RoleModel {
    public data: RoleEntity;

    constructor(data: RoleEntity) {
        this.data = data;
    }

    static fromJson(json: any): RoleModel {
        const entity = new RoleEntity(
            json.id,
            json.title_ru,
            json.title_kk,
            json.value,
            json.can_register,
            json.is_admin,
            new Date(json.created_at),
            new Date(json.updated_at),
            json.title_en
        );

        return new RoleModel(entity);
    }

    public toDomain() {
        return {
            id: this.data.id,
            titleRu: this.data.titleRu,
            titleKk: this.data.titleKk,
            value: this.data.value,
            canRegister: this.data.canRegister,
            isAdmin: this.data.isAdmin,
            createdAt: this.data.createdAt,
            updatedAt: this.data.updatedAt,
            titleEn: this.data.titleEn
        };
    }
}