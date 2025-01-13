import {UserModel} from "@/data/models/UserModel.ts";

export interface LoginCDTO {
    email: string;
    password: string;
}

export interface LoginRDTO {
    accessToken: string;
    refreshToken: string;
    type: string;
    user: UserModel
}