export interface RoleDto {
    id: number;
    titleRu: string;
    titleKk: string;
    titleEn?: string | null;
    value: string;
    canRegister: boolean;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}
