import CustomAxios from "@/core/utility/customAxios.ts";
import {RoleRepository} from "@/data/repository/RoleRepository.ts";
import {GetRolesUseCase} from "@/domain/use-cases/role/GetRolesUseCase.ts";
import {RoleBloc} from "@/presentation/bloc/roleBloc/RoleBloc.ts";
import {useRouter} from "vue-router";
import {useRoleStore} from "@/presentation/bloc/roleBloc/RoleState.ts";

const provAxiosInstance = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : "";

    return new CustomAxios({token: token, ...(user && {userId: user['user-id']})});
}

const provideRolePloc = () => {
    const router = useRouter();
    const store = useRoleStore();
    const axios = provAxiosInstance();
    const roleRepository = new RoleRepository({axios: axios});
    const getRolesUseCase = new GetRolesUseCase({roleRepo: roleRepository});
    return new RoleBloc({getRolesUseCase: getRolesUseCase, router: router, store: store});
}

export const dependencyLocator = {
    provideRolePloc
}