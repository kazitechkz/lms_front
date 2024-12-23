import type {Role} from "@/domain/entities/RoleEntity.ts";

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    position?: string | null;
    password_hash: string;
    is_active: boolean;
    role_id?: number | null;
    role?: Role | null;
    user_type_id?: number | null;
    user_type?: UserType | null;
    created_at: string; // или Date
    updated_at: string; // или Date
    uploaded_files: FileModel[];
}