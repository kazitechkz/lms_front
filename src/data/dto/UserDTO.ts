import type {RoleRDTO} from "@/data/dto/RoleDTO.ts";
import type {UserTypeRDTO} from "@/data/dto/UserTypeDTO.ts";
import type {FileRDTO} from "@/data/dto/FileRDTO.ts";

export interface UserRDTO {
    id: number;
    name: string;
    email: string;
    phone: string;
    position?: string | null;
    isActive: boolean;
    roleId: number;
    role: RoleRDTO;
    userTypeId: number;
    userType: UserTypeRDTO;
    createdAt: string;
    updatedAt: string;
    fileId: FileRDTO | null;
}