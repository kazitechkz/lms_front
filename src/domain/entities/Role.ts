export interface Role {
    id: number;
    titleRu: string;
    titleKk: string;
    value: string;
    canRegister: boolean;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    titleEn?: string;
}

