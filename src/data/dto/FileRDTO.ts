import {UserRDTO} from "@/data/dto/UserDTO.ts";

export interface FileRDTO {
    id: number;
    filename: string;
    filePath: string;
    fileSize: string;
    contentType: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    uploadedBy: number | null;
    uploadedByUser: UserRDTO | null;
}