import type {Either} from "@/core/domain/Either.ts";
import type {DataError} from "@/core/domain/DataError.ts";
import type {AuthInterface} from "@/domain/interfaces/AuthInterface.ts";
import type {LoginCDTO} from "@/data/dto/AuthDTO.ts";
import type {LoginResponse} from "@/domain/entities/Auth.ts";

export class LoginUseCase {
    private repository: AuthInterface;
    constructor({authRepo} : {authRepo: AuthInterface}) {
        this.repository = authRepo;
    }

    async login(payload: LoginCDTO): Promise<Either<DataError, LoginResponse>> {
        return await this.repository.login(payload);
    }

}