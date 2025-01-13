import type {UserTypeRDTO} from "@/data/dto/UserTypeDTO.ts";

export class UserTypeModel {
    public id: number;
    public titleRu: string;
    public titleKk: string;
    public value: string;
    public createdAt: Date;
    public updatedAt: Date;
    public titleEn: string | null;

    constructor(data: UserTypeRDTO) {
        this.id = data.id;
        this.titleRu = data.titleRu;
        this.titleKk = data.titleKk;
        this.value = data.value;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.titleEn = data.titleEn;
    }

    static fromJson(json: any): UserTypeModel {
        return new UserTypeModel({
            id: json.id,
            titleRu: json.title_ru,
            titleKk: json.title_kk,
            value: json.value,
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
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            titleEn: this.titleEn,
        };
    }
}