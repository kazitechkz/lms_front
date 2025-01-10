import {BaseRepository} from "@/core/data/BaseRepository.ts";
import type CustomAxios from "@/core/utility/customAxios.ts";
import type {UserInterface} from "@/domain/interfaces/UserInterface.ts";

export class UserRepository extends BaseRepository implements UserInterface {
    constructor({ axios }: { axios: CustomAxios }) {
        if (!axios) {
            throw new Error("Missing required parameter: axios");
        }
        super({ axios });
    };
}
