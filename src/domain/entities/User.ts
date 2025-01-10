import type {Role} from "@/domain/entities/Role.ts";
import type {UserType} from "@/domain/entities/UserType.ts";
import type {FileEntity} from "@/domain/entities/File.ts";

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    position?: string | null;
    isActive: boolean;
    roleId: number;
    role: Role;
    userTypeId: number;
    userType: UserType;
    createdAt: string;
    updatedAt: string;
    fileId: FileEntity | null;
}