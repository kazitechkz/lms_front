import type {UserModel} from "@/data/models/UserModel.ts";

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    type: string;
    user: UserModel
}