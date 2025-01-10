import {BaseRepository} from "@/core/data/BaseRepository.ts";
import type CustomAxios from "@/core/utility/customAxios.ts";
import type {AuthInterface} from "@/domain/interfaces/AuthInterface.ts";
import type {LoginCDTO} from "@/data/dto/AuthDTO.ts";
import {Either} from "@/core/domain/Either.ts";
import type {DataError} from "@/core/domain/DataError.ts";
import type {LoginResponse} from "@/domain/entities/Auth.ts";
import {LoginModel} from "@/data/models/AuthModel.ts";

export class AuthRepository extends BaseRepository implements AuthInterface {
    constructor({ axios }: { axios: CustomAxios }) {
        if (!axios) {
            throw new Error("Missing required parameter: axios");
        }
        super({ axios });
    };

    async login(payload: LoginCDTO): Promise<Either<DataError, LoginResponse>> {
        try {
            const { data } = await this.axios.post('/auth/login', payload);
            const result = LoginModel.fromJson(data);

            return Either.right(result.toDomain());
        } catch (error) {
            return Either.left(this.handleErrors(error));
        }
    }
}
