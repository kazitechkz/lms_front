import {UserModel} from "@/data/models/UserModel.ts";
import type {LoginRDTO} from "@/data/dto/AuthDTO.ts";

export class LoginModel {
    public data: LoginRDTO;

    constructor(data: LoginRDTO) {
        this.data = data;
    }

    static fromJson(json: any): LoginModel {
        const entity: LoginRDTO = {
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