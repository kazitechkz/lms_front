import type {RoleCDTO, RoleRDTO} from "@/data/dto/RoleDTO.ts";

export class RoleModel {
    public id: number;
    public titleRu: string;
    public titleKk: string;
    public value: string;
    public canRegister: boolean;
    public isAdmin: boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public titleEn: string | null | undefined;

    constructor(data: RoleRDTO) {
        this.id = data.id;
        this.titleRu = data.titleRu;
        this.titleKk = data.titleKk;
        this.value = data.value;
        this.canRegister = data.canRegister;
        this.isAdmin = data.isAdmin;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.titleEn = data.titleEn;
    }

    static fromJson(json: any): RoleModel {
        return new RoleModel({
            id: json.id,
            titleRu: json.title_ru,
            titleKk: json.title_kk,
            value: json.value,
            canRegister: json.can_register,
            isAdmin: json.is_admin,
            createdAt: new Date(json.created_at),
            updatedAt: new Date(json.updated_at),
            titleEn: json.title_en || null,
        });
    }

    public toDomain() {
        return {
            id: this.id,
            titleRu: this.titleRu,
            titleKk: this.titleKk,
            value: this.value,
            canRegister: this.canRegister,
            isAdmin: this.isAdmin,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            titleEn: this.titleEn,
        };
    }

    public toServer(): RoleCDTO {
        return {
            titleRu: this.titleRu,
            titleKk: this.titleKk,
            titleEn: this.titleEn || null,
            canRegister: this.canRegister,
            isAdmin: this.isAdmin,
            value: this.value,
        };
    }
}
