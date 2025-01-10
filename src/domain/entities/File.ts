import type { User } from "@/domain/entities/User";

export interface FileEntity {
    id: number;
    filename: string;
    filePath: string;
    fileSize: string;
    contentType: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    uploadedBy: number | null;
    uploadedByUser: User | null;
}