import type {LoginResponse} from "@/domain/entities/Auth.ts";
import {UserModel} from "@/data/models/UserModel.ts";

export class LoginModel {
    public data: LoginResponse;

    constructor(data: LoginResponse) {
        this.data = data;
    }

    static fromJson(json: any): LoginModel {
        const entity: LoginResponse = {
            accessToken: json.access_token,
            refreshToken: json.refresh_token,
            type: json.type,
            user: UserModel.fromJson(json.user)
        };

        return new LoginModel(entity);
    }

    public toDomain() {
        return {
            accessToken: this.data.accessToken,
            refreshToken: this.data.refreshToken,
            type: this.data.type,
            user: this.data.user
        };
    }
}