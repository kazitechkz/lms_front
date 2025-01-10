import type {DataError} from "@/core/domain/DataError.ts";
import type {Either} from "@/core/domain/Either.ts";
import type {LoginCDTO} from "@/data/dto/AuthDTO.ts";
import type {LoginResponse} from "@/domain/entities/Auth.ts";

export interface AuthInterface {
    login(payload: LoginCDTO): Promise<Either<DataError, LoginResponse>>;
}
