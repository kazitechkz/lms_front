import {RoleModel} from "@/data/models/RoleModel.ts";
import {UserTypeModel} from "@/data/models/UserTypeModel.ts";
import type {RoleRDTO} from "@/data/dto/RoleDTO.ts";
import type {UserTypeRDTO} from "@/data/dto/UserTypeDTO.ts";

export class UserModel {
    public id: number;
    public name: string;
    public email: string;
    public phone: string;
    public position: string;
    public roleId: number;
    public userTypeId: number;
    public isActive: boolean;
    public fileId: number | null;
    public createdAt: Date;
    public updatedAt: Date;
    public titleEn: string | null;

    constructor(data: {
        userTypeId: any;
        role: RoleRDTO | null;
        roleId: any;
        isActive: any;
        createdAt: Date;
        phone: any;
        titleEn: any;
        name: any;
        userType: UserTypeRDTO | null;
        id: any;
        position: any;
        email: any;
        fileId: any;
        updatedAt: Date
    }) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.position = data.position;
        this.roleId = data.roleId;
        this.userTypeId = data.userTypeId;
        this.isActive = data.isActive;
        this.fileId = data.fileId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.titleEn = data.titleEn;
    }

    static fromJson(json: any): UserModel {
        return new UserModel({
            role: json.role != null ? RoleModel.fromJson(json.role) : null,
            userType: json.user_type != null ? UserTypeModel.fromJson(json.user_type) : null,
            id: json.id,
            name: json.name,
            email: json.email,
            phone: json.phone,
            position: json.position,
            roleId: json.role_id,
            userTypeId: json.user_type_id,
            isActive: json.is_active,
            fileId: json.file_id,
            createdAt: new Date(json.created_at),
            updatedAt: new Date(json.updated_at),
            titleEn: json.title_en
        });
    }

    public toDomain() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            position: this.position,
            roleId: this.roleId,
            userTypeId: this.userTypeId,
            isActive: this.isActive,
            fileId: this.fileId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            titleEn: this.titleEn,
        };
    }
}