export interface RolePermissionRDTO {
    id: number
    roleId: number
    permissionId: number
}

export interface RolePermissionCDTO {
    roleId: number
    permissionIds: number[]
}

export const dtoToServer = {
    roleId: "role_id",
    permissionIds: "permission_ids"
};

export interface PermissionRDTO {
    id: number
    titleKk: string
    titleRu: string
}