export interface RoleRDTO {
    id: number;
    titleRu: string;
    titleKk: string;
    titleEn?: string | null;
    value: string;
    canRegister: boolean;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface RoleCDTO {
    titleRu: string;
    titleKk: string;
    titleEn?: string | null;
    canRegister: boolean;
    isAdmin: boolean;
    value: string;
}

export const dtoToServer = {
    titleRu: "title_ru",
    titleKk: "title_kk",
    titleEn: "title_en",
    canRegister: "can_register",
    isAdmin: "is_admin",
    value: "value",
};